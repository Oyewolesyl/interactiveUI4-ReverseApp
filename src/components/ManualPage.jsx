// Replace your ManualPage.jsx with this:
"use client"
import { useState } from "react"
import { Link } from "react-router-dom"
import QRCodeGenerator from "./QRCodeGenerator"

const ManualPage = () => {
  const [formData, setFormData] = useState({
    brand: "",
    condition: "",
    pairs: "",
    reward: "voucher",
  })

  // ADD THESE NEW STATES
  const [showQR, setShowQR] = useState(false)
  const [uniqueCode, setUniqueCode] = useState("")

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.brand || !formData.condition || !formData.pairs) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const response = await fetch('http://localhost/Reverse-Final-App/backend/api/submit-manual.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        // REPLACE ALERT WITH QR CODE POPUP
        setUniqueCode(result.data.unique_code)
        setShowQR(true)
        
        setFormData({
          brand: "",
          condition: "",
          pairs: "",
          reward: "voucher",
        })
      } else {
        alert(`Error: ${result.error || 'Something went wrong'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Network error. Please try again.')
    }
  }

  return (
    <div className="mobile-container">
      {/* ALL YOUR EXISTING CODE STAYS THE SAME */}
      <header className="header">
        <div className="logo">
          <img src="/assets/Vector.svg?height=24&width=24" alt="Logo" />
        </div>
        <button className="menu-button">
          <img src="/assets/menu_24px.svg" width="32" height="32" alt="Menu" />
        </button>
      </header>

      <div className="tabs">
        <Link to="/scan" className="tab">Scan</Link>
        <Link to="/manual" className="tab active">Manual</Link>
      </div>

      <main className="main-content manual-content">
        <form id="manual-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">Select Brand</h2>
            <div className="select-wrapper">
              <select id="brand" className="form-select" value={formData.brand} onChange={handleChange}>
                <option value="" disabled>Brand</option>
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="puma">Puma</option>
                <option value="reebok">Reebok</option>
                <option value="converse">Converse</option>
                <option value="other">Other</option>
              </select>
              <div className="select-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Select Condition</h2>
            <div className="select-wrapper">
              <select id="condition" className="form-select" value={formData.condition} onChange={handleChange}>
                <option value="" disabled>Condition</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
              <div className="select-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">How many Pairs of Shoes?</h2>
            <input type="number" id="pairs" className="form-input pairs-input" placeholder="e.g 2" value={formData.pairs} onChange={handleChange} />
          </div>

          <div className="form-section">
            <h2 className="section-title-small">Which Reward would you like?</h2>
            <div className="select-wrapper">
              <select id="reward" className="form-select" value={formData.reward} onChange={handleChange}>
                <option value="voucher">Voucher</option>
                <option value="cash">Cash</option>
                <option value="merchandise">Merchandise</option>
                <option value="donation">Donation</option>
              </select>
              <div className="select-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <a href="#" className="proceed-link">Proceed to scan and estimate Rewards</a>
            <button type="submit" className="generate-button">Generate a Unique Code</button>
          </div>
        </form>
      </main>

   
      {showQR && <QRCodeGenerator value={uniqueCode} onClose={() => setShowQR(false)} />}

      
      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <img src="/assets/homeinactive.svg" width="32" height="32" alt="" />
          <span>Home</span>
        </Link>
        <Link to="/manual" className="nav-item active">
          <img src="/assets/justRecycle-logo-altactive.svg" width="32" height="32" alt="" />
          <span>Recycle</span>
        </Link>
        <Link to="/discover" className="nav-item">
          <img src="/assets/explore_24px.svg" width="32" height="32" alt="" />
          <span>Discover</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <img src="/assets/profile.svg" width="32" height="32" alt="" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}

export default ManualPage


