"use client"

import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const ScanPage = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    // Access camera when component mounts
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request access to the back camera
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: { exact: "environment" },
          },
        })
        .then((stream) => {
          // Attach the stream to the video element
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((error) => {
          console.error("Could not access the camera: ", error)
          // Fallback to any available camera if back camera is not available
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
    } else {
      alert("Your browser does not support camera access. Please use manual entry.")
    }

    // Cleanup function to stop camera when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const handleScan = () => {
    // In a real app, you would capture the current frame and process it
    // For this demo, we'll just simulate a successful scan
    alert("Sneaker scanned successfully! Redirecting to results...")

    // Stop the camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
    }

    // Redirect to manual page (in a real app, this would go to results)
    setTimeout(() => {
      window.location.href = "/manual"
    }, 1000)
  }

  return (
    <div className="mobile-container">
      <header className="profile-header">
        <Link to="/manual" className="back-button">
          <img src="/placeholder.svg?height=24&width=24" alt="" />
        </Link>
        <button className="menu-button">
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
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </header>

      <div className="tabs">
        <Link to="/scan" className="tab active">
          Scan
        </Link>
        <Link to="/manual" className="tab">
          Manual
        </Link>
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
          <p>Position your sneaker within the frame</p>
        </div>

        <button id="scan-button" className="scan-button" onClick={handleScan}>
          Scan
        </button>

        <div className="scan-alternative">
          <Link to="/manual" className="alt-link">
            Enter details manually instead
          </Link>
        </div>
      </main>
    </div>
  )
}

export default ScanPage
