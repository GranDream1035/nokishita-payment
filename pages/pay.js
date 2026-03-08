import { useState } from 'react';

export default function Pay() {
  const [loading, setLoading] = useState(false);
  const productName = process.env.NEXT_PUBLIC_PRODUCT_NAME || '商品名';
  const productPrice = parseInt(process.env.NEXT_PUBLIC_PRODUCT_PRICE || '1000');

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert('エラーが発生しました。もう一度お試しください。');
      setLoading(false);
    }
  };

  return (
    <div style={outer}>
      <div style={card}>
        <h1 style={title}>ご購入</h1>
        <div style={productBox}>
          <p style={productNameStyle}>{productName}</p>
          <p style={priceStyle}>¥{productPrice.toLocaleString()}</p>
        </div>
        <div style={features}>
          <p>Apple Pay / Google Pay 対応</p>
          <p>クレジットカード対応</p>
          <p>購入後にLINE登録案内</p>
        </div>
        <button onClick={handlePay} disabled={loading} style={loading ? btnDisabled : btn}>
          {loading ? '処理中...' : '決済する'}
        </button>
      </div>
    </div>
  );
}

const outer = { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#f5f5f5', fontFamily:'sans-serif', padding:'20px' };
const card = { backgroundColor:'white', borderRadius:'16px', padding:'40px', textAlign:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', maxWidth:'400px', width:'100%' };
const title = { fontSize:'24px', fontWeight:'bold', color:'#333', marginBottom:'24px' };
const productBox = { backgroundColor:'#f9f9f9', borderRadius:'8px', padding:'20px', marginBottom:'20px' };
const productNameStyle = { fontSize:'18px', fontWeight:'bold', color:'#333', margin:'0 0 8px 0' };
const priceStyle = { fontSize:'32px', fontWeight:'bold', color:'#06C755', margin:'0' };
const features = { fontSize:'13px', color:'#666', lineHeight:'2', textAlign:'left', marginBottom:'24px' };
const btn = { width:'100%', padding:'16px', fontSize:'18px', fontWeight:'bold', backgroundColor:'#06C755', color:'white', border:'none', borderRadius:'12px', cursor:'pointer' };
const btnDisabled = { ...btn, backgroundColor:'#ccc', cursor:'not-allowed' };
