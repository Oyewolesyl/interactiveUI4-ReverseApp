"use client"
import { useState, useEffect, useRef } from "react"
import MerchandisePopup from "./MerchandisePopup"

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(1)
  const carouselRef = useRef(null)

  const products = [
    {
      name: "justRecycle T-Shirt 'Oreo'",
      description: "Black and white striped t-shirt with classic design",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitled-design2.png",
    },
    {
      name: "justRecycle T-Shirt 'Plain Mary'",
      description: "Simple white t-shirt with minimalist appeal",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitleddesign(1)2.png",
    },
    {
      name: "justRecycle T-Shirt 'Black Triple'",
      description: "Triple black design t-shirt for bold style",
      price: "£25",
      availability: "Limited Stock",
      image: "/assets/Untitleddesign(6)2.png",
    },
    {
      name: "justRecycle T-Shirt 'Moon Triple Black'",
      description: "Midnight black t-shirt with lunar-inspired design",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitled-design2.png",
    },
    {
      name: "justRecycle T-Shirt 'White Shadow'",
      description: "Pure white t-shirt with subtle shadow effects",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitleddesign(1)2.png",
    },
    {
      name: "justRecycle T-Shirt 'Midnight Black'",
      description: "Deep black t-shirt for nighttime vibes",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitleddesign(6)2.png",
    },
    {
      name: "justRecycle T-Shirt 'Ghost White'",
      description: "Ethereal white t-shirt with clean finish",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitleddesign(1)2.png",
    },
    {
      name: "justRecycle T-Shirt 'Carbon Black'",
      description: "Industrial black t-shirt with carbon texture",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitleddesign(6)2.png",
    },
    {
      name: "justRecycle T-Shirt 'Snow White'",
      description: "Pristine white t-shirt with snow-like purity",
      price: "£25",
      availability: "Limited Stock",
      image: "/assets/Untitled-design2.png",
    },
    {
      name: "justRecycle T-Shirt 'Void Black'",
      description: "Ultimate black t-shirt with void-like depth",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitleddesign(6)2.png",
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3) // Desktop: 3 items
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2) // Tablet: 2 items
      } else {
        setItemsPerPage(1) // Mobile: 1 item
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const maxIndex = totalPages - 1

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1))
  }

  const handleViewClick = (product) => {
    setSelectedItem(product)
    setShowPopup(true)
  }

  const getCurrentProducts = () => {
    const startIndex = currentIndex * itemsPerPage
    return products.slice(startIndex, startIndex + itemsPerPage)
  }

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  return (
    <div className="product-carousel">
      <div className="carousel-header">
      </div>

      <div
        className="carousel-container"
        ref={carouselRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="carousel-track">
          {getCurrentProducts().map((product, index) => (
            <div key={`${currentIndex}-${index}`} className="carousel-item">
              <div
                className="product-image"
                style={{
                  backgroundImage: `url('${product.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="product-overlay">
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p
                      className={`product-availability ${product.availability === "In Stock" ? "in-stock" : "limited-stock"}`}
                    >
                      {product.availability}
                    </p>
                  </div>
                  <div className="product-actions">
                    <span className="product-price">{product.price}</span>
                    <button className="view-button" onClick={() => handleViewClick(product)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <button className="carousel-nav prev" onClick={handlePrev} disabled={currentIndex === 0}>
          ‹
        </button>
        <button className="carousel-nav next" onClick={handleNext} disabled={currentIndex === maxIndex}>
          ›
        </button>

        {/* Pagination Dots */}
        <div className="carousel-pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {showPopup && <MerchandisePopup item={selectedItem} onClose={() => setShowPopup(false)} />}
    </div>
  )
}

export default ProductCarousel
