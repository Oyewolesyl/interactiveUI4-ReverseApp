"use client"
import { Link, useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  // Navigate to /manual page on button click
  const handleRecycleClick = () => {
    navigate("/manual")
  }

  const handleViewClick = () => {
    alert("Merchandise details would show here")
  }

  return (
    <div className="mobile-container">
      <header className="header">
        <div className="logo">
          <img src="/assets/Vector.svg" alt="Logo" />
        </div>
        <button className="menu-button">
          {/* Menu icon - replace with your menu icon */}
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

        <div
          className="hero-image"
          style={{
            backgroundImage: `url('/assets/Component1.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "180px",
            position: "relative",
          }}
        >
          <div className="hero-overlay">
            <h2 className="hero-title"></h2>
          </div>
        </div>

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

        <div className="merchandise-section">
          <div className="merch-item">
            <div
              className="merch-image"
              style={{
                backgroundImage: "url('/assets/Untitled-design2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "254px",
              }}
            ></div>
            <div className="merch-details">
              <p>item description</p>
              <button className="view-button" onClick={handleViewClick}>
                view availability
              </button>
            </div>
          </div>

          <div className="merch-item">
            <div
              className="merch-image2"
              style={{
                backgroundImage: "url('/assets/Untitleddesign(1)2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "254px",
              }}
            ></div>
            <div className="merch-details">
              <p>item description</p>
              <button className="view-button" onClick={handleViewClick}>
                view details
              </button>
            </div>
          </div>

          <div className="merch-item">
            <div
              className="merch-image3"
              style={{
                backgroundImage: "url('/assets/Untitleddesign(6)2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "254px",
              }}
            ></div>
            <div className="merch-details">
              <p>item description</p>
              <button className="view-button" onClick={handleViewClick}>
                view details
              </button>
            </div>
          </div>

          <div className="merch-item">
            <div
              className="merch-image4"
              style={{
                backgroundImage: "url('/assets/Untitleddesign2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "254px",
              }}
            ></div>
            <div className="merch-details">
              <p>item description</p>
              <button className="view-button" onClick={handleViewClick}>
                view details
              </button>
            </div>
          </div>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item active">
          <img src="/assets/home-icon-active.svg" width="32" height="32" alt="" />
          <span>Home</span>
        </Link>
        <Link to="/manual" className="nav-item">
          <img src="/assets/recyclenav.svg" width="32" height="32" alt="" />
          <span>Recycle</span>
        </Link>
        <Link to="#" className="nav-item">
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
