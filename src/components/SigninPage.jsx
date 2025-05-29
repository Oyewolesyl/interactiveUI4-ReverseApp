"use client"

import { useState } from "react"

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
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

    if (!formData.terms) {
      alert("Please accept the terms and conditions")
      return
    }

    // In a real app, you would send this data to a server
    console.log("Sign in form submitted:", {
      email: formData.email,
      nickname: formData.nickname,
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
        <h1 className="auth-title">Already have a Nike account?</h1>

        <form className="auth-form" id="signin-form" onSubmit={handleSubmit}>
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
            <label htmlFor="nickname">Now choose a Nickname</label>
            <input
              type="text"
              id="nickname"
              placeholder="Nickname"
              className="form-input"
              required
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-button">
            Next
          </button>

          <div className="checkbox-group mt-4">
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
        </form>
      </main>
    </div>
  )
}

export default SigninPage
