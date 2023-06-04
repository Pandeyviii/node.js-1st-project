async function login(e){
    try{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;

        const loginDetails={
            email,
            password
        }
        console.log(loginDetails);
        const response=await axios.post("http://localhost:3000/user/login",loginDetails);
        console.log(response);
        if(response.status===200){
            alert(response.message);
            window.location.href="../Expense/expense.html"  //change the page on successfull login

        }
    }
    catch(err){
        console.log(err);
    }
}