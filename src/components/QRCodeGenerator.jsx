// components/QRCodeGenerator.jsx
"use client"
import QRCode from "react-qr-code"

const QRCodeGenerator = ({ value, onClose }) => {
  const handlePrint = () => {
    window.print()
  }

  if (!value) return null

  return (
    <div className="qr-popup-overlay" onClick={onClose}>
      <div className="qr-popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="qr-header">
          <h3>Your Unique QR Code</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="qr-code-container">
          <QRCode value={value} size={200} />
          <p className="qr-code-text">Code: {value}</p>
        </div>
        <div className="qr-actions">
          <button className="print-btn" onClick={handlePrint}>🖨️ Print Code</button>
          <button className="close-btn-bottom" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default QRCodeGenerator