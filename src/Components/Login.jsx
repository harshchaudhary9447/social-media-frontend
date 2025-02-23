import React from 'react';
import '../styles/Login.css';


const Login = () => {

    return (
        <div className="app">
          <div className="container">
            <header className="header">
              <div className="logo">
                <span className="logo-icon">M</span>
                <span className="logo-text">Maze</span>
              </div>
            </header>
            
            <main className="main-content">
              <h1>Social media shared today,<br />tomorrow or by location</h1>
              <p>Discover with Maze</p>
              
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