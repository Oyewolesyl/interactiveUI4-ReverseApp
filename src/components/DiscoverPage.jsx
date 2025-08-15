"use client"
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"

const DiscoverPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet")
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })
    }
  }, [])

  // --- Nike store links in Belgium (Google Maps search URLs)
  // Clicking Visit will open one of these at random in a new tab
  const nikeStoreLinks = [
    "https://www.google.com/maps/search/?api=1&query=Nike+Store+Brussels",
    "https://www.google.com/maps/search/?api=1&query=Nike+Store+Antwerp",
    "https://www.google.com/maps/search/?api=1&query=Nike+Store+Ghent",
    "https://www.google.com/maps/search/?api=1&query=Nike+Store+Leuven",
    "https://www.google.com/maps/search/?api=1&query=Nike+Store+Bruges",
    "https://www.google.com/maps/search/?api=1&query=Nike+Store+Liege",
    "https://www.google.com/maps/search/?api=1&query=Nike+Store+Mechelen",
    "https://www.google.com/maps/search/?api=1&query=Nike+Store+Kortrijk",
  ]

  const getRandomNikeLink = () => {
    const idx = Math.floor(Math.random() * nikeStoreLinks.length)
    return nikeStoreLinks[idx]
  }
  // --- end nike links

  const shops = [
    { 
      id: 1,
      name: "Reverse Vilvoorde Central",
      lat: 50.9307,
      lng: 4.4286,
      address: "Grote Markt 15, 1800 Vilvoorde, Belgium",
      phone: "+32 2 251 1234",
      hours: "9:00 - 18:00",
    },
    {
      id: 2,
      name: "Reverse Machelen",
      lat: 50.9089,
      lng: 4.4444,
      address: "Dorpsstraat 23, 1830 Machelen, Belgium",
      phone: "+32 2 251 2345",
      hours: "9:00 - 18:00",
    },
    {
      id: 3,
      name: "Reverse Grimbergen",
      lat: 50.9344,
      lng: 4.3722,
      address: "Kerkplein 8, 1850 Grimbergen, Belgium",
      phone: "+32 2 251 3456",
      hours: "9:00 - 18:00",
    },
    {
      id: 4,
      name: "Reverse Zaventem",
      lat: 50.8847,
      lng: 4.4719,
      address: "Stationsplein 12, 1930 Zaventem, Belgium",
      phone: "+32 2 251 4567",
      hours: "9:00 - 18:00",
    },
    {
      id: 5,
      name: "Reverse Meise",
      lat: 50.9394,
      lng: 4.3306,
      address: "Nieuwstraat 45, 1860 Meise, Belgium",
      phone: "+32 2 251 5678",
      hours: "9:00 - 18:00",
    },
    {
      id: 6,
      name: "Reverse Brussels Central",
      lat: 50.8503,
      lng: 4.3517,
      address: "Rue Neuve 123, 1000 Brussels, Belgium",
      phone: "+32 2 251 6789",
      hours: "9:00 - 19:00",
    },
    {
      id: 7,
      name: "Reverse Leuven",
      lat: 50.8798,
      lng: 4.7005,
      address: "Bondgenotenlaan 67, 3000 Leuven, Belgium",
      phone: "+32 16 251 7890",
      hours: "9:00 - 18:00",
    },
    {
      id: 8,
      name: "Reverse Antwerp",
      lat: 51.2194,
      lng: 4.4025,
      address: "Meir 89, 2000 Antwerp, Belgium",
      phone: "+32 3 251 8901",
      hours: "9:00 - 19:00",
    },
    {
      id: 9,
      name: "Reverse Ghent",
      lat: 51.0543,
      lng: 3.7174,
      address: "Veldstraat 34, 9000 Ghent, Belgium",
      phone: "+32 9 251 9012",
      hours: "9:00 - 18:00",
    },
    {
      id: 10,
      name: "Reverse Bruges",
      lat: 51.2093,
      lng: 3.2247,
      address: "Steenstraat 56, 8000 Bruges, Belgium",
      phone: "+32 50 251 0123",
      hours: "9:00 - 18:00",
    },
  ]

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.address.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <MapContainer center={[50.9307, 4.4286]} zoom={10} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
            {filteredShops.map((shop) => (
              <Marker key={shop.id} position={[shop.lat, shop.lng]}>
                <Popup className="custom-popup">
                  <div className="popup-content">
                    <h3 className="popup-title">{shop.name}</h3>
                    <div className="popup-details">
                      <div className="popup-address">
                        <span className="popup-icon">📍</span>
                        <span>{shop.address}</span>
                      </div>
                      <div className="popup-phone">
                        <span className="popup-icon">📞</span>
                        <span>{shop.phone}</span>
                      </div>
                      <div className="popup-hours">
                        <span className="popup-icon">🕒</span>
                        <span>{shop.hours}</span>
                      </div>
                    </div>
                    <div className="popup-actions">
                      <button
                        className="directions-btn"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                              shop.address
                            )}`,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                      >
                        Get Directions
                      </button>
                      <button
                        className="call-btn"
                        onClick={() => {
                          // telephone link for mobile devices
                          window.location.href = `tel:${shop.phone.replace(/\s+/g, "")}`
                        }}
                      >
                        Call Store
                      </button>
                    </div>
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
                <p className="shop-address">{shop.address}</p>
                <p className="shop-hours">Hours: {shop.hours}</p>
              </div>
              <div className="shop-actions">
                <button
                  className="shop-btn primary"
                  onClick={() => window.open(getRandomNikeLink(), "_blank", "noopener,noreferrer")}
                >
                  Visit
                </button>
              </div>
            </div>
          ))}

          {filteredShops.length === 0 && <p className="no-results">No stores found matching "{searchTerm}"</p>}
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
