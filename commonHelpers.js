import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as T,i as f}from"./assets/vendor-77e16229.js";const o=document.getElementById("datetime-picker"),e=document.querySelector("[data-start]"),[i,d,u,c]=document.querySelectorAll(".value");let r;T(o,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0];const a=new Date;e.disabled=r<a,e.disabled&&f.error({title:"Error",message:"Please choose a date in the future"})}});let h=null;function m(){const t=new Date(r).getTime(),a=new Date().getTime(),n=t-a;if(n<=0){clearInterval(h),[i,d,u,c].forEach(s=>s.textContent="00"),e.disabled=!1,o.disabled=!1;return}const[w,D,b,g]=[Math.floor(n/(1e3*60*60*24)),Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),Math.floor(n%(1e3*60*60)/(1e3*60)),Math.floor(n%(1e3*60)/1e3)];[i,d,u,c].forEach((s,E)=>{const l=[w,D,b,g][E];s.textContent=l<10?"0"+l:l})}e.addEventListener("click",()=>{e.disabled=!0,o.disabled=!0;const t=new Date(r).getTime(),a=new Date().getTime();if(t<=a){f.error({title:"Error",message:"Please choose a date in the future"}),e.disabled=!1,o.disabled=!1;return}m(),h=setInterval(m,1e3)});
//# sourceMappingURL=commonHelpers.js.map