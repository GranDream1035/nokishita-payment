import { useEffect, useState } from 'react';

export default function Success() {
  const [count, setCount] = useState(4);
  const lineUrl = process.env.NEXT_PUBLIC_LINE_ADD_URL || 'https://line.me/R/ti/p/@176pyiit';

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(timer);
          window.location.href = lineUrl;
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lineUrl]);

  return (
    <div style={outer}>
      <div style={card}>
        <div style={checkIcon}>✅</div>
        <h1 style={title}>決済完了！</h1>
        <p style={sub}>ありがとうございました</p>
        <div style={lineBox}>
          <p style={lineTitle}>📱 LINEへ自動移動しています...</p>
          <div style={countBox}>
            <span style={countNum}>{count}</span>
            <span style={countLabel}>秒後にLINEが開きます</span>
          </div>
          <div style={divider} />
          <a href={lineUrl} style={lineBtn}>今すぐLINE友達追加 →</a>
          <p style={hint}>※ LINE友達追加後にレシートが届きます</p>
        </div>
      </div>
    </div>
  );
}

const outer = { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#f0f7f0', fontFamily:'sans-serif', padding:'20px' };
const card = { backgroundColor:'white', borderRadius:'16px', padding:'36px', textAlign:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', maxWidth:'400px', width:'100%' };
const checkIcon = { fontSize:'48px', marginBottom:'12px' };
const title = { fontSize:'24px', fontWeight:'bold', color:'#333', marginBottom:'6px' };
const sub = { color:'#666', marginBottom:'24px', fontSize:'15px' };
const lineBox = { backgroundColor:'#f0fff4', border:'2px solid #06C755', borderRadius:'12px', padding:'20px' };
const lineTitle = { fontSize:'15px', fontWeight:'bold', color:'#333', margin:'0 0 12px 0' };
const countBox = { display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'16px' };
const countNum = { fontSize:'40px', fontWeight:'bold', color:'#06C755', lineHeight:'1' };
const countLabel = { fontSize:'14px', color:'#555' };
const divider = { height:'1px', backgroundColor:'#d4edda', margin:'12px 0' };
const lineBtn = { display:'block', backgroundColor:'#06C755', color:'white', padding:'14px', borderRadius:'8px', textDecoration:'none', fontWeight:'bold', fontSize:'16px', marginBottom:'10px' };
const hint = { fontSize:'12px', color:'#888', margin:'0' };
