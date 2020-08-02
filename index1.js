let c=6;
new Promise((resolve,reject)=>{
if(c==1){
resolve("success")
}else{
    reject("Reject")
}
}).then(res=>console.log(res)).catch(err=>console.log("reject",err));
document.body.addEventListener("mouseover",(event)=>{
    document.querySelector('h2').innerText=`${event.clientX}  ${event.clientY}`;
})