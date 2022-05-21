import React, { useState, useRef } from 'react'
import "./login.scss";
function Register() {
    return (
        <div className='login'>
            <div className='top'>
                <div className="wrapper2">
                    <img
                        className='logo'
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png'
                        alt=''
                    />
                </div>
            </div>
            <div className='container'>
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" />
                    <input type="password" placeholder="password" />
                    <button className="loginButton">Sign In</button>
                    <span>
                        New to Netflix <b>Sign up now.</b>
                    </span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot.<b>Learn more</b>.
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Register