import { useState, useEffect } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


  const loginUser = async(e) => {
    e.preventDefault();
    const response= await axios.post("http://localhost:5000/login",{email,password});
    const data = await response.data
    if (data.user) {
        localStorage.setItem('token', data.user)
        alert('Login successful')
        window.location.href = '/dashboard'
    } else {
        alert('Please check your username and password')
    }

  };




  return (
    <div class="login-form">
    <form onSubmit={loginUser} method="post">
        <h2 class="text-center">Login</h2>       
        <div class="form-group">
            <input type="text" name="email" class="form-control" placeholder="Enter the Email"  value={email}
             onChange={(e) => setEmail(e.target.value)} required="true" />
        </div>
        <div class="form-group">
            <input type="text" name="password" class="form-control" placeholder="Enter the Password"  value={password}
              onChange={(e) => setPassword(e.target.value)} required="true"/>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">Login</button>
        </div>       
    </form>
</div>
  );
};

export default Login;
