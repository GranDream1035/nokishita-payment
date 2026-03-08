import { getStripe } from '../../lib/stripe';
import { sendLineMessage } from '../../lib/line';

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const stripe = getStripe();
  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const lineUserId = session.metadata && session.metadata.line_user_id;
    const amount = session.amount_total;
    const name = process.env.NEXT_PUBLIC_PRODUCT_NAME || '商品';
    if (lineUserId) {
      try {
        await sendLineMessage(lineUserId, 'ご購入ありがとうございます！' + name + '：¥' + amount);
      } catch (e) {
        console.error('LINE error:', e);
      }
    }
  }
  res.status(200).json({ received: true });
}
