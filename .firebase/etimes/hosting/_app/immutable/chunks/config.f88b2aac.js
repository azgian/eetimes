import{w as a}from"./singletons.6989a244.js";const y=a(),w=a(!1),b=a([]),A=()=>{var e;(e=document.getElementById("btnTimer"))==null||e.click()},S=e=>e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","),U=e=>{navigator.clipboard.writeText(e)},h=e=>{const n=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;return!(!e||e.match(n)==null)},T=e=>{const n=document.getElementById(e);n&&n.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})},B=[{name:"USDT",logo:"coin_usdt"},{name:"USDT",logo:"coin_usdt"},{name:"USDT",logo:"coin_usdt"},{name:"KRW",logo:"coin_krw"},{name:"KRW",logo:"coin_krw"},{name:"KRW",logo:"coin_krw"}],r=4,c=6,l=7,i=8,m=9,d=10,u=[{lv:1,name:"비회원",ref:null},{lv:2,name:"회원",ref:null},{lv:r,name:"IB",ref:null},{lv:c,name:"CO",ref:null},{lv:l,name:"CO",ref:null},{lv:i,name:"SYS",ref:null},{lv:m,name:"SYS",ref:null},{lv:d,name:"SYS",ref:null}],p=[{lv:1,name:"surface"},{lv:2,name:"primary"},{lv:4,name:"warning"},{lv:6,name:"surface"},{lv:7,name:"secondary"},{lv:8,name:"secondary"},{lv:9,name:"secondary"},{lv:10,name:"secondary"}],v=e=>{const n=u.find(t=>t.lv===e);return n==null?void 0:n.name},I=e=>{const n=p.find(s=>s.lv===e);return'<span class="badge variant-filled-'+(n==null?void 0:n.name)+'">'+v(e)+"</span>"},o=async()=>{const t=await(await fetch("https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD")).json();return Math.floor(t[0].basePrice*1+50)},f=async()=>{const t=await(await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT")).json(),s=await o();return t.price*s*1.0355},L=async e=>{if(e==="USDT")return o();if(e==="BNB")return f();const n="https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-"+e;return(await(await fetch(n)).json())[0].tradePrice};export{b as a,S as b,L as c,h as d,B as e,T as f,U as g,w as i,I as l,y as m,A as r,l as s};