import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as c}from"./assets/vendor-77e16229.js";const i=document.querySelector(".form"),e=i.querySelector('input[name="delay"]');i.addEventListener("submit",t=>{t.preventDefault();const o=i.querySelector('input[name="state"]:checked'),r=parseInt(e.value),n=o.value;a(r,n).then(s=>{c.success({title:"",message:`✅ Fulfilled promise in ${s}ms`,position:"topRight",icon:"",iconUrl:""})}).catch(s=>{c.error({title:"",message:`❌ Rejected promise in ${s}ms`,position:"topRight",icon:"",iconUrl:""})}),e.value="",i.querySelectorAll('input[name="state"]').forEach(s=>{s.checked=!1}),e.classList.remove("pressed")});e.addEventListener("focus",()=>{e.classList.add("pressed")});e.addEventListener("blur",()=>{e.classList.remove("pressed")});function a(t,o){return new Promise((r,n)=>{setTimeout(()=>{o==="fulfilled"?r(t):n(t)},t)})}
//# sourceMappingURL=commonHelpers2.js.map
