import React from 'react';
import '../styles/Login.css';
import Logo from '../assets/Group.png';

const Login = () => {

    return (
        <div className="app">
          <div className="container">
            <header className="header">
              <div className="logo1">
                <span className="logo-icon1"><img src={Logo}></img></span>
                <span className="logo-text1">Maze</span>
              </div>
            </header>
            
            <main className="main-content2">
              <h1 className='h1'>Social media shared today,<br />tomorrow or by location</h1>
              <p className='p1'>Discover with Maze</p>
              
              <div className="button-group">
                <button className="btn btn-primary">Create account</button>
                <span className="or">or</span>
                <button className="btn btn-secondary">Login</button>
              </div>
            </main>
          </div>
        </div>
      );
}
export default Login;