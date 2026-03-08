export default function Cancel() {
    return (
          <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#f5f5f5',fontFamily:'sans-serif'}}>
      <div style={{backgroundColor:'white',borderRadius:'16px',padding:'48px',textAlign:'center',boxShadow:'0 4px 20px rgba(0,0,0,0.1)'}}>
        <h1 style={{fontSize:'24px',fontWeight:'bold',color:'#333'}}>キャンセルされました</h1>
        <p style={{color:'#666',marginTop:'16px'}}>決済がキャンセルされました。</p>
        <a href="/" style={{display:'inline-block',marginTop:'24px',backgroundColor:'#06C755',color:'white',padding:'12px 24px',borderRadius:'8px',textDecoration:'none',fontWeight:'bold'}}>戻る</a>
  </div>
  </div>
  );
}
