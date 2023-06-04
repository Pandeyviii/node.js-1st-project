
async function SignUp(e){
    try{
        e.preventDefault();
    console.log(e.target.email.value);
         const name=e.target.name.value;
         const email=e.target.email.value;
         const password=e.target.password.value;
    
    const SignupDetails={
        name,
        email,
        password
    }
    console.log(SignupDetails);
    const response=await axios.post("http://localhost:3000/user/add-user",SignupDetails);
    // console.log(response.message);
    // console.log(response.status);
    if(response.status===201){
        alert(response.message);
        window.location.href="../Login/login.html"  //change the page on successfull login

    }else{
        throw new Error("failed to login")
    }
    }catch(err){
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    }

}
