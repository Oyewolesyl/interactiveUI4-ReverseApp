"use client"
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"

const DiscoverPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet')
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    }
  }, [])

  const shops = [
    { id: 1, name: "Reverse Vilvoorde Central", lat: 50.9307, lng: 4.4286, address: "Grote Markt 15, 1800 Vilvoorde, Belgium" },
    { id: 2, name: "Reverse Machelen", lat: 50.9089, lng: 4.4444, address: "Dorpsstraat 23, 1830 Machelen, Belgium" },
    { id: 3, name: "Reverse Grimbergen", lat: 50.9344, lng: 4.3722, address: "Kerkplein 8, 1850 Grimbergen, Belgium" },
    { id: 4, name: "Reverse Zaventem", lat: 50.8847, lng: 4.4719, address: "Stationsplein 12, 1930 Zaventem, Belgium" },
    { id: 5, name: "Reverse Meise", lat: 50.9394, lng: 4.3306, address: "Nieuwstraat 45, 1860 Meise, Belgium" },
  ]

  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

      <main className="main-content discover-content">
        <div className="discover-header">
          <h1>Discover Shops</h1>
          <p>Find Reverse locations near you</p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search for stores or areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="map-container">
          <MapContainer center={[50.9307, 4.4286]} zoom={12} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredShops.map((shop) => (
              <Marker key={shop.id} position={[shop.lat, shop.lng]}>
                <Popup>
                  <div>
                    <h3>{shop.name}</h3>
                    <p>{shop.address}</p>
                    <button className="directions-btn">Get Directions</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="shops-list">
          <h2>All Locations ({filteredShops.length})</h2>
          {filteredShops.map((shop) => (
            <div key={shop.id} className="shop-item">
              <div className="shop-info">
                <h3>{shop.name}</h3>
                <p>{shop.address}</p>
              </div>
              <button className="shop-btn">Visit</button>
            </div>
          ))}

          {filteredShops.length === 0 && (
            <p className="no-results">No stores found matching "{searchTerm}"</p>
          )}
        </div>
      </main>

      <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <img src="/assets/homeinactive.svg" width="32" height="32" alt="Home" />
          <span>Home</span>
        </Link>
        <Link to="/manual" className="nav-item">
          <img src="/assets/recyclenav.svg" width="32" height="32" alt="Recycle" />
          <span>Recycle</span>
        </Link>
        <Link to="/discover" className="nav-item active">
          <img src="/assets/explore_24pxACTIVE.svg" width="32" height="32" alt="Discover" />
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

export default DiscoverPage
