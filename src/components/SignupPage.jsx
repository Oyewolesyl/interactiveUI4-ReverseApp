"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    if (!formData.terms) {
      alert("Please accept the terms and conditions")
      return
    }

    // In a real app, you would send this data to a server
    console.log("Sign up form submitted:", {
      email: formData.email,
      password: formData.password,
    })

    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <div className="mobile-container">
      <header className="header">
        <div className="logo">
          <img src="/placeholder.svg?height=24&width=24" alt="Logo" />
        </div>
        <div className="logo">
          <img src="/placeholder.svg?height=24&width=24" alt="Logo" />
        </div>
      </header>

      <main className="main-content auth-content">
        <h1 className="auth-title">Create an account</h1>

        <form className="auth-form" id="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="form-input"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="form-input"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Password"
              className="form-input"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              className="checkbox"
              required
              checked={formData.terms}
              onChange={handleChange}
            />
            <label htmlFor="terms" className="checkbox-label">
              Accept terms and conditions
            </label>
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>

          <p className="auth-link">
            <Link to="/">Proceed to dashboard</Link>
          </p>
        </form>
      </main>
    </div>
  )
}

export default SignupPage
