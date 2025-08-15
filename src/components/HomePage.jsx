"use client"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import MerchandisePopup from "./MerchandisePopup"
import ProductCarousel from "./ProductCarousel"

const HomePage = () => {
  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleRecycleClick = () => {
    navigate("/manual")
  }

  const handleViewClick = (index) => {
    const merchandiseItems = [
      {
        name: "justRecycle T-Shirt 'Oreo'",
        description: "Classic black and white striped t-shirt made from recycled materials",
        price: "£25",
        availability: "In Stock",
        image: "/assets/Untitled-design2.png",
      },
      {
        name: "justRecycle T-Shirt 'Plain Mary'",
        description: "Simple white t-shirt with minimalist design",
        price: "£25",
        availability: "In Stock",
        image: "/assets/Untitleddesign(1)2.png",
      },
      {
        name: "justRecycle T-Shirt 'Black Triple'",
        description: "Bold black t-shirt with triple logo design",
        price: "£25",
        availability: "Limited Stock",
        image: "/assets/Untitleddesign(6)2.png",
      },
      {
        name: "justRecycle T-Shirt 'Moon Triple Black'",
        description: "Dark moon-themed t-shirt with triple black design",
        price: "£25",
        availability: "In Stock",
        image: "/assets/Untitleddesign2.png",
      },
    ]

    setSelectedItem(merchandiseItems[index])
    setShowPopup(true)
  }

  return (
    <div className="mobile-container">
      <header className="header">
        <div className="logo">
          <img src="/assets/Vector.svg" alt="Logo" />
        </div>
        <button className="menu-button">
          <img src="/assets/menu_24px.svg" width="32" height="32" alt="Menu" />
        </button>
      </header>

      <main className="main-content">
        <div className="video-container">
          <video controls className="feature-video">
            <source src="/assets/videoad.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <ProductCarousel />

        <div className="action-section">
          <button className="recycle-button" onClick={handleRecycleClick}>
            Recycle Now
          </button>
          <p className="merch-text">
            Get{" "}
            <span className="brand-text">
              just<span className="green-text">Recycle</span>
            </span>{" "}
            branded merch in exchange for recycling
          </p>
        </div>

        <div className="quick-access-section">
          <h2>Quick Access</h2>
          <div className="quick-access-grid">
            <Link to="/products" className="quick-access-item">
              <div className="quick-access-icon">🛍️</div>
              <span>All Products</span>
            </Link>
            <Link to="/discover" className="quick-access-item">
              <div className="quick-access-icon">📍</div>
              <span>Find Locations</span>
            </Link>
          </div>
        </div>

        <div className="merchandise-section">
          <div className="section-header">
            <h2>Popular Items</h2>
            <Link to="/products" className="see-all-link">
              See All
            </Link>
          </div>
          {[
            "/assets/Untitled-design2.png",
            "/assets/Untitleddesign(1)2.png",
            "/assets/Untitleddesign(6)2.png",
            "/assets/Untitleddesign2.png",
          ].map((img, index) => (
            <div className="merch-item" key={index}>
              <div
                className={`merch-image${index + 1}`}
                style={{
                  backgroundImage: `url('${img}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "254px",
                  position: "relative",
                }}
              >
                <div className="merch-overlay">
                  <p className="merch-description">Branded T-Shirt</p>
                  <button className="view-button" onClick={() => handleViewClick(index)}>
                    view details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showPopup && <MerchandisePopup item={selectedItem} onClose={() => setShowPopup(false)} />}

      <nav className="bottom-nav">
        <Link to="/" className="nav-item active">
          <img src="/assets/home-icon-active.svg" width="32" height="32" alt="" />
          <span>Home</span>
        </Link>
        <Link to="/manual" className="nav-item">
          <img src="/assets/recyclenav.svg" width="32" height="32" alt="" />
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

export default HomePage
