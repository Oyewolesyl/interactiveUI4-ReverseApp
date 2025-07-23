"use client"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import MerchandisePopup from "./MerchandisePopup"

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
        name: "justRecycle T-Shirt",
        description: "Eco-friendly cotton t-shirt made from recycled materials",
        price: "£25",
        availability: "In Stock",
        image: "/assets/Untitled-design2.png"
      },
      {
        name: "justRecycle Hoodie",
        description: "Comfortable hoodie perfect for everyday wear",
        price: "£45",
        availability: "In Stock", 
        image: "/assets/Untitleddesign(1)2.png"
      },
      {
        name: "justRecycle Cap",
        description: "Stylish cap with embroidered logo",
        price: "£15",
        availability: "Limited Stock",
        image: "/assets/Untitleddesign(6)2.png"
      },
      {
        name: "justRecycle Bag",
        description: "Durable tote bag for your daily needs",
        price: "£20",
        availability: "In Stock",
        image: "/assets/Untitleddesign2.png"
      }
    ]
    
    setSelectedItem(merchandiseItems[index])
    setShowPopup(true)
  }


  const carouselImages = [
    "/assets/Component1.png",
    "/assets/Component1.png", 
    "/assets/Component1.png",
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    )
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

        <div className="carousel-container" style={{ width: "100%", height: "180px", overflow: "hidden", position: "relative", borderRadius: "12px" }} ref={carouselRef}>
          <div className="carousel-track" style={{ display: "flex", transition: "transform 0.5s ease-in-out", transform: `translateX(-${currentIndex * 100}%)`, width: `${carouselImages.length * 180}px` }}>
            {carouselImages.map((src, index) => (
              <div key={index} style={{ flex: "0 0 100%", backgroundImage: `url('${src}')`, backgroundSize: "cover", backgroundPosition: "center", height: "180px" }}></div>
            ))}
          </div>
          <button onClick={handlePrev} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", zIndex: 2 }}>‹</button>
          <button onClick={handleNext} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", zIndex: 2 }}>›</button>
          <div style={{ position: "absolute", bottom: "10px", width: "100%", display: "flex", justifyContent: "center", gap: "8px" }}>
            {carouselImages.map((_, index) => (
              <div key={index} onClick={() => setCurrentIndex(index)} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: index === currentIndex ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer" }} />
            ))}
          </div>
        </div>

        <div className="action-section">
          <button className="recycle-button" onClick={handleRecycleClick}>Recycle Now</button>
          <p className="merch-text">
            Get <span className="brand-text">just<span className="green-text">Recycle</span></span> branded merch in exchange for recycling
          </p>
        </div>

     
        <div className="merchandise-section">
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
                  position: "relative"
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

      {/* ADD POPUP */}
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