import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import ProfilePage from "./components/ProfilePage"
import ManualPage from "./components/ManualPage"
import ScanPage from "./components/ScanPage"
import SignupPage from "./components/SignupPage"
import SigninPage from "./components/SigninPage"
import DiscoverPage from "./components/DiscoverPage"
import ProductOverviewPage from "./components/ProductOverviewPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/manual" element={<ManualPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/products" element={<ProductOverviewPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
