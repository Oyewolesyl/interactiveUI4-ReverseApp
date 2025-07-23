// components/MerchandisePopup.jsx
"use client"

const MerchandisePopup = ({ item, onClose }) => {
  if (!item) return null

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3>Merch Details</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="popup-body">
          <div className="popup-image" style={{ backgroundImage: `url('${item.image}')` }}></div>
          <div className="popup-details">
            <h4>{item.name}</h4>
            <p className="popup-description">{item.description}</p>
            <p className="popup-price">Price: {item.price}</p>
            <p className="popup-availability">Availability: {item.availability}</p>
          </div>
        </div>
        <div className="popup-actions">
          <button className="popup-btn secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default MerchandisePopup