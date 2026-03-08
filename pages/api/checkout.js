import { getStripe } from '../../lib/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'jpy',
          product_data: { name: process.env.NEXT_PUBLIC_PRODUCT_NAME || '商品' },
          unit_amount: parseInt(process.env.NEXT_PUBLIC_PRODUCT_PRICE || '1000'),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: req.headers.origin + '/success',
      cancel_url: req.headers.origin + '/cancel',
    });
    res.status(200).json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
