import { Link, useLocation } from "react-router-dom"

import Logo from "../assets/Vector.svg"
import MenuIcon from "../assets/menu_24px.svg"
import HomeIconActive from "../assets/home-icon-active.svg"
import HomeIconInactive from "../assets/homeinactive.svg"
import RecycleIconActive from "../assets/justRecycle-logo-altactive(1).svg"
import RecycleIconInactive from "../assets/recyclenav.svg"
import ExploreIcon from "../assets/explore_24px.svg"
import ProfileIconActive from "../assets/profile-active.svg"
import ProfileIconInactive from "../assets/profile.svg"

const Layout = ({ children, showHeader = true, showNav = true, logoOnly = false }) => {
  const location = useLocation()
  const path = location.pathname

  return (
    <div className="mobile-container">
      {showHeader && (
        <header className="header">
          <div className="logo">
            <img src={Logo} alt="Logo" onError={handleImgError} />
          </div>
          {!logoOnly && (
            <button className="menu-button">
              <img
                src={MenuIcon}
                width="32"
                height="32"
                alt="Menu"
                onError={handleImgError}
              />
            </button>
          )}
        </header>
      )}

      <main className="main-content">{children}</main>

      {showNav && (
        <nav className="bottom-nav">
          <Link to="/" className={`nav-item ${path === "/" ? "active" : ""}`}>
            <img
              src={path === "/" ? HomeIconActive : HomeIconInactive}
              width="32"
              height="32"
              alt="Home"
              onError={handleImgError}
            />
            <span>Home</span>
          </Link>
          <Link to="/manual" className={`nav-item ${path === "/manual" ? "active" : ""}`}>
            <img
              src={path === "/manual" ? RecycleIconActive : RecycleIconInactive}
              width="32"
              height="32"
              alt="Recycle"
              onError={handleImgError}
            />
            <span>Recycle</span>
          </Link>
          <Link to="#" className="nav-item">
            <img
              src={ExploreIcon}
              width="32"
              height="32"
              alt="Discover"
              onError={handleImgError}
            />
            <span>Discover</span>
          </Link>
          <Link to="/profile" className={`nav-item ${path === "/profile" ? "active" : ""}`}>
            <img
              src={path === "/profile" ? ProfileIconActive : ProfileIconInactive}
              width="32"
              height="32"
              alt="Profile"
              onError={handleImgError}
            />
            <span>Profile</span>
          </Link>
        </nav>
      )}
    </div>
  )
}

export default Layout
