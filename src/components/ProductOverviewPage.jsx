"use client"
import { Link } from "react-router-dom"
import { useState } from "react"
import MerchandisePopup from "./MerchandisePopup"

const ProductOverviewPage = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      name: "justRecycle T-Shirt 'Oreo'",
      description: "Classic black and white design t-shirt",
      price: "£25",
      availability: "In Stock",
      image: "/assets/Untitled-design2.png",
      category: "clothing",
    },
    {
      name: "justRecycle Shirt 'Plain Mary'",
      description: "Simple white cotton t-shirt",
      price: "£22",
      availability: "In Stock",
      image: "/assets/Untitleddesign(1)2.png",
      category: "clothing",
    },
    {
      name: "justRecycle T-Shirt 'Black Triple'",
      description: "Black t-shirt with triple logo design",
      price: "£25",
      availability: "Limited Stock",
      image: "/assets/Untitleddesign(6)2.png",
      category: "clothing",
    },
    {
      name: "justRecycle Shirt 'Moon Triple Black'",
      description: "Deep black t-shirt with moon design",
      price: "£28",
      availability: "In Stock",
      image: "/assets/Untitled-design2.png",
      category: "clothing",
    },
    {
      name: "justRecycle Shirt 'White Shadow'",
      description: "Pure white t-shirt with shadow print",
      price: "£26",
      availability: "In Stock",
      image: "/assets/Untitled-design2.png",
      category: "clothing",
    },
    {
      name: "justRecycle Shirt 'Midnight Black'",
      description: "Midnight black premium cotton t-shirt",
      price: "£24",
      availability: "In Stock",
      image: "/assets/Untitled-design2.png",
      category: "clothing",
    },
    {
      name: "justRecycle Shirt 'Ghost White'",
      description: "Ghost white minimalist t-shirt",
      price: "£27",
      availability: "In Stock",
      image: "/assets/Untitleddesign(1)2.png",
      category: "clothing",
    },
    {
      name: "justRecycle Shirt 'Carbon Black'",
      description: "Carbon black vintage-style t-shirt",
      price: "£23",
      availability: "In Stock",
      image: "/assets/Untitleddesign(6)2.png",
      category: "clothing",
    },
    {
      name: "justRecycle Shirt 'Snow White'",
      description: "Snow white organic cotton t-shirt",
      price: "£25",
      availability: "Limited Stock",
      image: "/assets/Untitled-design2.png",
      category: "clothing",
    },
    {
      name: "justRecycle Shirt 'Void Black'",
      description: "Deep void black premium t-shirt",
      price: "£26",
      availability: "In Stock",
      image: "/assets/Untitled-design2.png",
      category: "clothing",
    },
  ]

  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "In Stock" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleViewClick = (product) => {
    setSelectedItem(product)
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
        <div className="product-overview-header">
          <h1>Product Overview</h1>
          <p>Discover our complete range of eco-friendly merchandise</p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div
              className="product-card"
              key={index}
              onClick={() => handleViewClick(product)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="product-image"
                style={{
                  backgroundImage: `url('${product.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="product-overlay">
                  <button
                    className="view-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewClick(product)
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <p
                  className={`product-availability ${product.availability === "In Stock" ? "in-stock" : "limited-stock"}`}
                >
                  {product.availability}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>No products found matching your criteria</p>
          </div>
        )}
      </main>

      {showPopup && <MerchandisePopup item={selectedItem} onClose={() => setShowPopup(false)} />}

      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <img src="/assets/homeinactive.svg" width="32" height="32" alt="Home" />
          <span>Home</span>
        </Link>
        <Link to="/manual" className="nav-item">
          <img src="/assets/recyclenav.svg" width="32" height="32" alt="Recycle" />
          <span>Recycle</span>
        </Link>
        <Link to="/discover" className="nav-item">
          <img src="/assets/explore_24px.svg" width="32" height="32" alt="Discover" />
          <span>Discover</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <img src="/assets/profile.svg" width="32" height="32" alt="Profile" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}

export default ProductOverviewPage
