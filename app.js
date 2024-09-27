const Base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
 
const dropdown= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const msg = document.querySelector(".msg");

let i=0;
for(let select of dropdown){
    for(curCode in countryList )
        {
            let newOp = document.createElement("option");
           newOp.innerText=curCode ;
           newOp.value=curCode;
           if(select.name === "from" && curCode==="USD"){
             newOp.selected="selected";
           }
           if(select.name === "to" && curCode==="INR"){
            newOp.selected="selected";
          }
           select.append(newOp);
        }
        select.addEventListener("change",(evt)=>{
            changeFlag(evt.target)
        });
        
}
const updatemsg =async()=>{
    let amount = document.querySelector("#amount");
    let amtVal = amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value= "1";
    }
    // console.log(fromCur.value);
    // console.log(toCur.value);
    const url = `${Base_url}/${fromCur.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCur.value.toLowerCase()][toCur.value.toLowerCase()];
    //console.log(rate); 
    let result =amtVal* rate;
    msg.innerText=`${amtVal} ${fromCur.value} = ${parseFloat(result)} ${toCur.value}`; 
}

const changeFlag=(ele)=>{
   let curCode=ele.value;
   let countryCode = countryList[curCode];
   //console.log(countryCode);
   let flag =`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = ele.parentElement.querySelector("img");
   img.src =flag;
}
 
btn.addEventListener("click", (evt)=>{
    evt.preventDefault() // prevents default behaviour of pages like refresh
    updatemsg();
});

window.addEventListener("load",()=>{
    updatemsg();
    
})