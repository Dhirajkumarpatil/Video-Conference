import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navheader'>
          <h2>Video Call</h2>
        </div>
        <div className='navlist'>
          <p>Join as Guest</p>
          <p>Register</p>
          <div role='button'><p>Login</p></div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div><h1> <span style={{color : "#ff9839"}}>Connect</span>  With Your Loved Ones</h1>
        
        <p>Cover a distance by Video Call</p>
        <div role='button'>
          <Link to={"/auth"}>Get Started</Link>
        </div>
        </div>
        <div>
       <img src="/public/mobile.png" alt="Landing Image" />

        </div>
      </div>
    </div>
  )
}

export default LandingPage