import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Rocket } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">LocalBiz <span className="text-primary italic">Builder</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#templates" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Templates</a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Login</Link>
          <Link to="/signup" className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95">
            Get Started Free
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Features</a>
          <a href="#templates" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Templates</a>
          <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Pricing</a>
          <hr className="border-border" />
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Login</Link>
          <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3 bg-primary text-white rounded-xl text-center font-semibold">
            Get Started Free
          </Link>
        </div>
      )}
    </nav>
  )
}
