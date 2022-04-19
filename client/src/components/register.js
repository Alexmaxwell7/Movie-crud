import { useState, useEffect } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


    const handleSubmit=async(e)=>{
    e.preventDefault();
   const response= await axios.post("http://localhost:5000/register",{name,email,password});
   if (response.data.status=="ok"){
    navigate("/login", { replace: true });
   }
  };




  return (
    <div class="login-form">
    <form onSubmit={handleSubmit} method="post">
        <h2 class="text-center">Register</h2>       
        <div class="form-group">
            <input type="text" name="name" class="form-control" placeholder="Enter the name"  value={name}
              onChange={(e) => setName(e.target.value)} required="true" />
        </div>
        <div class="form-group">
            <input type="text" name="email" class="form-control" placeholder="Enter the Email"  value={email}
             onChange={(e) => setEmail(e.target.value)} required="true" />
        </div>
        <div class="form-group">
            <input type="text" name="password" class="form-control" placeholder="Enter the Password"  value={password}
              onChange={(e) => setPassword(e.target.value)} required="true" />
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Register</button>
        </div>       
    </form>
</div>
  );
};

export default Register;
