async function expense(e){
    e.preventDefault();
    try{
        const expense_Details={
            expense_Amount:e.target.expense_amount.value,
            description:e.target.description.value,
            category:e.target.category.value
          }
          console.log("12345",expense_Details);
          const token=localStorage.getItem("token");
          console.log(token);
          
          const response=await axios.post("http://localhost:3000/expense/add-expense",expense_Details,{headers:{"Authorization":token}});
          console.log(response);
    }
    catch(err){
        console.log(err);
    }
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function showPremium(){
    document.getElementById('rzp-button1').style.visibility="hidden";
    document.getElementById('message').innerHTML="you are a premium user";
    // showLeaderBoard();
}
window.addEventListener("DOMContentLoaded", () => {
    const token=localStorage.getItem("token");  
    const decodeToken=parseJwt(token);
    console.log(decodeToken);
    const isPremiumUser=decodeToken.isPremiumUser;
    if(isPremiumUser){
        showPremium();
        showLeaderBoard();
    }      
    axios.get("http://localhost:3000/expense/get-expense",{headers:{"Authorization":token}})
    .then((response) => {
       console.log(response)
       for(var i=0;i<response.length;i++){
           shownewuseronscreen(response[i])
       }
    })
    .catch((error) => {
       console.log(error)
    })
 
})
function showLeaderBoard(){
    // const premium=document.getElementById("leader");
    const inputElement=document.createElement("input")
    inputElement.type="button"
    inputElement.value="Show Leaderboard"
    // premium.appendChild(inputElement);
    inputElement.onclick=async()=>{
        const token=localStorage.getItem('token')
        //const page =1;
        const userLeaderBoardArray=await axios.get(`http://localhost:3000/premium/showLeaderBoard`,{headers:{"Authorization":token}})
        console.log("abCDDD",userLeaderBoardArray);
        const LeaderBoard=document.getElementById("leader");
        LeaderBoard.innerHTML+="<h1>LeaderBoard</h1>"
        userLeaderBoardArray.forEach((user)=>{
        LeaderBoard.innerHTML+=
        `<li>name:-${user.name},total Amount:-${user.Amount}</li>`
        })

}
document.getElementById("message").appendChild(inputElement);
}

function shownewuseronscreen(user){
console.log(user)

const parentnode=document.getElementById('listofusers')
const childnode=   `<li id=${user.id}> ${user.Amount}, ${user.Category}, ${user.Description}
                   <button onclick=deleteExpense('${user.id}')> Delete expense </button>
                   <button onclick=editExpense('${user.Description}','${user.Amount}','${user.id}')> Edit expense </button></li>`
parentnode.innerHTML= parentnode.innerHTML + childnode
}
function editExpense(description,expense_Amount,userid){
document.getElementById('id2').value=description;
document.getElementById('id1').value=expense_Amount;
// document.getElementById('id3').value=category
deleteExpense(userid);

}
function deleteExpense(userid){
    const token=localStorage.getItem("token");   
axios.delete(`http://localhost:3000/expense/delete-expense/${userid}`,{headers:{"Authorization":token}})
.then((response) => {
   removeuserfromscreen(userid)

})
.catch((err) =>{
   console.log(err)
})

}
function removeuserfromscreen(userid){
const parentnode=document.getElementById('listofusers')
const childnodeisdeleted=document.getElementById(userid)
parentnode.removeChild(childnodeisdeleted)
}

document.getElementById("rzp-button1").onclick=async function(e){
const token=localStorage.getItem("token");
const response=await axios.get("http://localhost:3000/purchase/premiummembership",{headers:{"Authorization":token}});
console.log(response);
var options=
{
    "key":response.key_id,
    "order_id":response.order.id,
    // handler use for success payment
    "handler":async function(response){
       const res= await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
            order_id:options.order_id,
            payment_id:response.razorpay_payment_id,
        },{headers:{"Authorization":token}})
        console.log(res)

        alert('You are a premium user Now')
       
        document.getElementById('rzp-button1').style.visibility="hidden";
        document.getElementById('message').innerHTML="you are a premium user";

        localStorage.setItem('token',res.token)
         showLeaderBoard()
    }
}


const rzp1=new Razorpay(options);
rzp1.open();
e.preventDefault();
rzp1.on('payment failed',function(response){
    console.log(response)
    alert('something went wrong')
})
}

function download(){
    const token=localStorage.getItem('token');
    axios.get('http://localhost:3000/user/download', { headers: {"Authorization" : token} })
    .then((response) => {
        console.log(response)
    //     if(response.status === 200){
    //         var a = document.createElement("a");
    //         a.href = response.data.fileURl;
    //         a.download = 'myexpense.csv';
    //         a.click();
    //         showFileURl(response.data.fileURl)
    //     } else {
    //         throw new Error(response.data.message)
               
    //     }

    // })
    // .catch((err) => {
    //     document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    });
}