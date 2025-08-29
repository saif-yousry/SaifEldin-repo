// src/components/signUp.js
import React, { useState } from 'react'
import './signup.css'
import { supabase } from '../supabaseClient'

function SignUp({ handleLogin, setView }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      // login مباشر بعد التسجيل
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) {
        setError(loginError.message)
      } else {
        handleLogin(loginData.user)
      }
    }
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Already have an account? <span className="link" onClick={() => setView('login')}>Login</span>
      </p>
    </div>
  )
}

export default SignUp
