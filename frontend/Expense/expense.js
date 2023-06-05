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
window.addEventListener("DOMContentLoaded", () => {
    const token=localStorage.getItem("token");        
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