import { sendLineMessage } from '../../lib/line';
import { getStripe } from '../../lib/stripe';

export default async function handler(req, res) {
  // LINE webhook verification (GET request for URL verification)
  if (req.method === 'GET') {
    return res.status(200).send('OK');
  }

  if (req.method !== 'POST') return res.status(405).end();

  const { events } = req.body || {};
  if (!events || !Array.isArray(events)) {
    return res.status(200).json({ status: 'ok' });
  }

  for (const event of events) {
    // Handle follow event (user adds the LINE official account as friend)
    if (event.type === 'follow') {
      const lineUserId = event.source && event.source.userId;
      if (!lineUserId) continue;

      try {
        const stripe = getStripe();
        // Look for a completed payment within the last 30 minutes
        const thirtyMinsAgo = Math.floor(Date.now() / 1000) - 30 * 60;
        const sessions = await stripe.checkout.sessions.list({
          limit: 5,
        });

        // Find the most recent completed session within 30 minutes
        const recentSession = sessions.data.find(
          s => s.status === 'complete' && s.created >= thirtyMinsAgo
        );

        if (recentSession) {
          const amount = recentSession.amount_total;
          const productName = process.env.NEXT_PUBLIC_PRODUCT_NAME || '商品';
          const dateObj = new Date(recentSession.created * 1000);
          const date = dateObj.toLocaleDateString('ja-JP', {
            timeZone: 'Asia/Tokyo',
            year: 'numeric', month: '2-digit', day: '2-digit',
          });
          const time = dateObj.toLocaleTimeString('ja-JP', {
            timeZone: 'Asia/Tokyo',
            hour: '2-digit', minute: '2-digit',
          });

          const receiptMsg =
            '🧾 ご購入レシート\n' +
            '━━━━━━━━━━━━\n' +
            '📍 のきしたマルシェ\n' +
            '━━━━━━━━━━━━\n' +
            '商品：' + productName + '\n' +
            '金額：¥' + amount.toLocaleString() + '\n' +
            '日付：' + date + ' ' + time + '\n' +
            '━━━━━━━━━━━━\n' +
            'ご購入ありがとうございました！\n' +
            'また黒壁スクエアへお越しください😊';

          await sendLineMessage(lineUserId, receiptMsg);
        } else {
          // No recent payment — send welcome message
          await sendLineMessage(
            lineUserId,
            '友達追加ありがとうございます！\nのきしたマルシェの新商品・再入荷情報をお届けします🌿\nよろしくお願いします😊'
          );
        }
      } catch (e) {
        console.error('LINE webhook error:', e.message);
      }
    }
  }

  res.status(200).json({ status: 'ok' });
}
