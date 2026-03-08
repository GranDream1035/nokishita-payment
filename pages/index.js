export default function Home() {
  const productName = process.env.NEXT_PUBLIC_PRODUCT_NAME || '商品名';
  const productPrice = parseInt(process.env.NEXT_PUBLIC_PRODUCT_PRICE || '1000');
  const payUrl = 'https://nokishita-payment.vercel.app/pay';
  const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=' + encodeURIComponent(payUrl);

  return (
    <div style={outer}>
      <div style={card}>
        <h1 style={title}>のきしたマルシェ</h1>
        <div style={productBox}>
          <p style={productNameStyle}>{productName}</p>
          <p style={priceStyle}>¥{productPrice.toLocaleString()}</p>
        </div>
        <p style={instruction}>📱 スマートフォンでスキャンしてお支払い</p>
        <img src={qrUrl} alt="支払いQRコード" style={qrImage} />
        <div style={features}>
          <p>✅ Apple Pay / Google Pay 対応</p>
          <p>✅ クレジットカード対応</p>
          <p>✅ 購入後にLINE登録案内</p>
        </div>
      </div>
    </div>
  );
}

const outer = { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#f0f7f0', fontFamily:'sans-serif', padding:'20px' };
const card = { backgroundColor:'white', borderRadius:'16px', padding:'32px', textAlign:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', maxWidth:'420px', width:'100%' };
const title = { fontSize:'22px', fontWeight:'bold', color:'#333', marginBottom:'16px' };
const productBox = { backgroundColor:'#f9f9f9', borderRadius:'8px', padding:'16px', marginBottom:'16px' };
const productNameStyle = { fontSize:'16px', fontWeight:'bold', color:'#333', margin:'0 0 8px 0' };
const priceStyle = { fontSize:'28px', fontWeight:'bold', color:'#06C755', margin:'0' };
const instruction = { fontSize:'15px', color:'#444', marginBottom:'12px', fontWeight:'bold' };
const qrImage = { width:'240px', height:'240px', marginBottom:'16px', border:'3px solid #06C755', borderRadius:'12px', padding:'6px' };
const features = { fontSize:'13px', color:'#555', lineHeight:'2.2', textAlign:'left' };
