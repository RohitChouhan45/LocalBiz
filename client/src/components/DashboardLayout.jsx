import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Globe, 
  Package, 
  UserCircle, 
  Settings, 
  LogOut, 
  Rocket,
  Menu,
  X,
  CreditCard
} from 'lucide-react'

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      navigate('/login')
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) return null

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <Globe size={20} />, label: 'My Websites', path: '/dashboard/websites' },
    { icon: <Package size={20} />, label: 'Products & Services', path: '/dashboard/products' },
    { icon: <CreditCard size={20} />, label: 'Subscription', path: '/dashboard/billing' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
  ]

  return (
    <div className="min-h-screen bg-secondary/20 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Rocket size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">LocalBiz</span>
            </Link>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === item.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="p-4 rounded-2xl bg-secondary/50 mb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Current Plan</p>
              <p className="text-sm font-bold flex items-center justify-between">
                Free Plan
                <Link to="/dashboard/billing" className="text-xs text-primary hover:underline">Upgrade</Link>
              </p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut size={20} />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8 lg:px-12 sticky top-0 z-40">
          <button className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user.name?.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-8 lg:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
