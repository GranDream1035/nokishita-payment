export default function Success() {
  const lineUrl = process.env.NEXT_PUBLIC_LINE_ADD_URL || 'https://line.me/R/ti/p/@176pyiit';
    return (
        <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'#f5f5f5',fontFamily:'sans-serif',padding:'20px'}}>
              <div style={{backgroundColor:'white',borderRadius:'16px',padding:'40px',textAlign:'center',boxShadow:'0 4px 20px rgba(0,0,0,0.1)',maxWidth:'400px',width:'100%'}}>
                      <h1 style={{fontSize:'24px',fontWeight:'bold',color:'#333',marginBottom:'8px'}}>決済完了！</h1>
                              <p style={{color:'#666',marginBottom:'32px'}}>ありがとうございました。</p>
                                     <div style={{backgroundColor:'#f0fff4',border:'2px solid #06C755',borderRadius:'12px',padding:'20px'}}>
                                                <p style={{fontSize:'16px',fontWeight:'bold',color:'#333',margin:'0 0 8px 0'}}>LINEでお得な情報を受け取る</p>
                                                          <p style={{fontSize:'13px',color:'#666',margin:'0 0 16px 0'}}>新商品・再入荷のお知らせをLINEでお届けします</p>
                                                                    <a href={lineUrl} style={{display:'block',backgroundColor:'#06C755',color:'white',padding:'14px',borderRadius:'8px',textDecoration:'none',fontWeight:'bold',fontSize:'16px'}}>LINE友達追加</a>
                                                                            </div>
                                                                                  </div>
                                                                                      </div>
                                                                                        );
                                                                                        }
