import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Login.css';
import Logo from '../assets/Group.png';

const Login = () => {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="app">
           <div className="logo-container">
                    <div className="logo">
                      <img src={Logo} alt="Image"/>
                    </div>
                    <h1 className="logo-text">Maze</h1>
                  </div>
          <div className="container">
            
            
            <main className="main-content2">
              <h1 className='h1'>Social media shared today,<br />tomorrow or by location</h1>
              <p className='p1'>Discover with Maze</p>
              
              <div className="button-group">
                <button className="btn btn-primary" onClick={() => navigate('/signup')}>
                  Create account
                </button>
                <span className="or">or</span>
                <button className="btn btn-secondary" onClick={() => navigate('/signin')}>
                  Login
                </button>
              </div>
            </main>
          </div>
        </div>
    );
};

export default Login;
