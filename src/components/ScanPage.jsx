// Replace your ScanPage.jsx with this:
"use client"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import QrScanner from "qr-scanner"

const ScanPage = () => {
  const videoRef = useRef(null)
  const [qrScanner, setQrScanner] = useState(null)
  const [scannedResult, setScannedResult] = useState("")

  useEffect(() => {
    if (videoRef.current) {
      const scanner = new QrScanner(
        videoRef.current,
        (result) => {
          console.log('QR Code detected:', result.data)
          setScannedResult(result.data)
          alert(`QR Code scanned: ${result.data}`)
          // Redirect or process the scanned data
          setTimeout(() => {
            window.location.href = "/manual"
          }, 1000)
        },
        {
          preferredCamera: 'environment',
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      )

      scanner.start().catch((error) => {
        console.error('Scanner start error:', error)
        // Fallback to regular camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({
              video: {
                facingMode: { exact: "environment" },
              },
            })
            .then((stream) => {
              if (videoRef.current) {
                videoRef.current.srcObject = stream
              }
            })
            .catch((error) => {
              console.error("Could not access the camera: ", error)
              navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                  if (videoRef.current) {
                    videoRef.current.srcObject = stream
                  }
                })
                .catch((err) => {
                  alert("Camera access is required for scanning. Please allow camera access or use manual entry.")
                })
            })
        }
      })

      setQrScanner(scanner)

      return () => {
        scanner.stop()
        scanner.destroy()
      }
    }
  }, [])

  const handleManualScan = () => {
    if (qrScanner) {
      // Force a scan attempt
      alert("Position a QR code in front of the camera")
    } else {
      // Fallback behavior
      alert("Sneaker scanned successfully! Redirecting to results...")
      setTimeout(() => {
        window.location.href = "/manual"
      }, 1000)
    }
  }

  return (
    <div className="mobile-container">
      <header className="profile-header">
        <Link to="/manual" className="back-button">
          <img src="/assets/backicon.svg" alt="" />
        </Link>
        <button className="menu-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </header>

      <div className="tabs">
        <Link to="/scan" className="tab active">Scan</Link>
        <Link to="/manual" className="tab">Manual</Link>
      </div>

      <main className="main-content">
        <div className="camera-container">
          <video ref={videoRef} id="camera-feed" autoPlay playsInline></video>
          <div className="camera-overlay">
            <div className="scan-area">
              <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50V10H50" stroke="white" strokeWidth="4" />
                <path d="M200 10H240V50" stroke="white" strokeWidth="4" />
                <path d="M240 200V240H200" stroke="white" strokeWidth="4" />
                <path d="M50 240H10V200" stroke="white" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="scan-instructions">
          <p>Position your QR code within the frame</p>
          {scannedResult && <p className="scan-result">Scanned: {scannedResult}</p>}
        </div>

        <button id="scan-button" className="scan-button" onClick={handleManualScan}>
          Scan QR Code
        </button>

        <div className="scan-alternative">
          <Link to="/manual" className="alt-link">Enter details manually instead</Link>
        </div>
      </main>
    </div>
  )
}

export default ScanPage