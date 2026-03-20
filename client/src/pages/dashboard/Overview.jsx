import { useState, useEffect } from 'react'
import { Plus, Globe, Package, TrendingUp, ArrowUpRight, MousePointer2, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

const StatCard = ({ icon, label, value, color }) => (
  <div className="p-6 rounded-3xl bg-background shadow-sm border border-border/50 group hover:shadow-md transition-all">
    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-sm text-muted-foreground font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
)

export default function DashboardOverview() {
  const [websites, setWebsites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now
    setTimeout(() => {
      setWebsites([])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Ready to grow your local presence today?</p>
        </div>
        <Link to="/dashboard/builder" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Plus size={20} />
          Create New Website
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Globe size={24} className="text-blue-500" />} 
          label="Total Websites" 
          value="0" 
          color="bg-blue-500/10"
        />
        <StatCard 
          icon={<MousePointer2 size={24} className="text-purple-500" />} 
          label="Total Visits" 
          value="0" 
          color="bg-purple-500/10"
        />
        <StatCard 
          icon={<Package size={24} className="text-orange-500" />} 
          label="Products/Services" 
          value="0" 
          color="bg-orange-500/10"
        />
        <StatCard 
          icon={<TrendingUp size={24} className="text-green-500" />} 
          label="Revenue (₹)" 
          value="0" 
          color="bg-green-500/10"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-[2rem] bg-background border border-border shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
            <Globe className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No websites yet</h3>
          <p className="text-muted-foreground max-w-sm mb-8">
            Start by creating your first business website using our professional templates.
          </p>
          <Link to="/dashboard/builder" className="px-8 py-3 bg-primary text-white rounded-xl font-bold">
            Launch Your First Site
          </Link>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-[2rem] bg-primary text-white shadow-xl shadow-primary/20 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-20">
               <ArrowUpRight size={100} />
             </div>
             <h3 className="text-xl font-bold mb-4 relative z-10">Go Pro</h3>
             <p className="text-white/80 mb-8 relative z-10">Unlock custom domains, advanced analytics, and premium templates.</p>
             <Link to="/dashboard/billing" className="bg-white text-primary px-6 py-3 rounded-xl font-bold inline-block hover:scale-105 transition-transform relative z-10">
               Upgrade Now
             </Link>
          </div>

          <div className="p-8 rounded-[2rem] bg-background border border-border">
            <h3 className="font-bold mb-6">Recent Activity</h3>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <UserPlus size={18} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-bold">Welcome to LocalBiz!</p>
                  <p className="text-xs text-muted-foreground">Account created successfully</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
