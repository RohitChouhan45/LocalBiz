import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardLayout from './components/DashboardLayout'
import DashboardOverview from './pages/dashboard/Overview'
import BusinessBuilder from './pages/dashboard/BusinessBuilder'
import MyWebsites from './pages/dashboard/MyWebsites'
import ProductManagement from './pages/dashboard/Products'
import Billing from './pages/dashboard/Billing'
import PublicSite from './pages/PublicSite'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard Protected Routes */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardOverview /></DashboardLayout>} />
        <Route path="/dashboard/builder" element={<DashboardLayout><BusinessBuilder /></DashboardLayout>} />
        <Route path="/dashboard/websites" element={<DashboardLayout><MyWebsites /></DashboardLayout>} />
        <Route path="/dashboard/products" element={<DashboardLayout><ProductManagement /></DashboardLayout>} />
        <Route path="/dashboard/billing" element={<DashboardLayout><Billing /></DashboardLayout>} />
        
        {/* Public Sites - Catch All Slug */}
        <Route path="/s/:slug" element={<PublicSite />} />
      </Routes>
    </div>
  )
}

export default App
