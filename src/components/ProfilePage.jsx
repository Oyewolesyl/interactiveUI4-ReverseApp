"use client"
import { Link } from "react-router-dom"

const ProfilePage = () => {
  const handleEditProfile = () => {
    alert("Edit profile functionality would open here")
  }

  const handleSettings = () => {
    alert("Settings would open here")
  }

  const handleRewardHistory = () => {
    alert("Reward history would show here")
  }

  const handleActiveRecycles = (e) => {
    e.preventDefault()
    alert("Active recycles would show here")
  }

  const handleRecycleHistory = (e) => {
    e.preventDefault()
    alert("Recycle history would show here")
  }

  return (
    <div className="mobile-container">
      <header className="profile-header">
        <Link to="/" className="back-button">
          <img src="/placeholder.svg?height=24&width=24" alt="" />
        </Link>
        <div className="logo">
          <img src="/placeholder.svg?height=24&width=24" alt="Logo" />
        </div>
      </header>

      <main className="main-content profile-content">
        <div className="profile-header-section">
          <div className="profile-avatar"></div>
          <h1 className="profile-name">Malik</h1>
          <p className="profile-email">email@address.com</p>

          <div className="profile-actions">
            <button className="profile-button" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button className="profile-button settings-button" onClick={handleSettings}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </button>
          </div>
        </div>

        <div className="rewards-card">
          <div className="rewards-user">
            <div className="rewards-avatar"></div>
            <div className="rewards-user-info">
              <p className="rewards-user-name">Malik</p>
              <p className="rewards-user-email">email@address.com</p>
            </div>
          </div>

          <div className="rewards-info">
            <div>
              <p className="rewards-label">Total rewards:</p>
              <p className="rewards-amount">£40</p>
            </div>
            <div className="rewards-badge">£40</div>
          </div>

          <button className="rewards-history-button" onClick={handleRewardHistory}>
            Show reward history
          </button>
        </div>

        <div className="profile-links">
          <a href="#" className="profile-link" onClick={handleActiveRecycles}>
            <span>Active Recycles</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>

          <a href="#" className="profile-link" onClick={handleRecycleHistory}>
            <span>Recycle History</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </main>

    <nav className="bottom-nav">
        <Link to="/" className="nav-item">
          <img src="/assets/homeinactive.svg" width="32" height="32" alt="" />
          <span>Home</span>
        </Link>
        <Link to="/manual" className="nav-item active">
          <img src="/assets/justRecycle-logo-altactive.svg" width="32" height="32" alt="" />
          <span>Recycle</span>
        </Link>
        <Link to="#" className="nav-item">
          <img src="/assets/explore_24px.svg" width="32" height="32" alt="" />
          <span>Discover</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <img src="/assets/profile-active.svg" width="32" height="32" alt="" />
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  )
}

export default ProfilePage
