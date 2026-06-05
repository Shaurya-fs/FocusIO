import { useState } from "react";
export default LoginPage;

export function LoginPage(){
    const [username,SetUsername]=useState("");
    const[password,SetPassword]=useState("");
    return(
        <div className="LoginCredentials" >

            <h1>Fokus</h1>
            <input
             type="text" 
             placeholder="username" 
             onChange={(e)=>SetUsername(e.target.value)}/>

            <input 
             type="text"
             placeholder="password"
             onChange={(e)=>SetPassword(e.target.value)}/>

            <button>Login</button>
        </div>
    
    );

}