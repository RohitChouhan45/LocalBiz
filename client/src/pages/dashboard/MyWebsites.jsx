import { useState, useEffect } from 'react'
import axios from 'axios'
import { Globe, ExternalLink, Plus, MapPin, Phone, Layout, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MyWebsites() {
  const [websites, setWebsites] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } }
        const { data } = await axios.get('https://localbiz-o59o.onrender.com/api/businesses', config)
        setWebsites(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchWebsites()
  }, [])

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-primary" size={40} /></div>

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Websites</h1>
        <Link to="/dashboard/builder" className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
           <Plus size={20} />
           New Site
        </Link>
      </div>

      {websites.length === 0 ? (
        <div className="py-24 text-center glass rounded-[3rem] border-dashed border-2">
           <p className="text-muted-foreground mb-6">No websites found. Create one to get started!</p>
           <Link to="/dashboard/builder" className="text-primary font-bold hover:underline">Launch your first site now</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
           {websites.map(site => (
             <div key={site.id} className="p-8 rounded-[2.5rem] bg-background border border-border hover:shadow-xl transition-all group">
                <div className="flex items-start justify-between mb-8">
                   <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Layout size={32} />
                   </div>
                   <div className="flex gap-2">
                     <Link to={`/dashboard/products?businessId=${site.id}`} className="px-4 py-2 bg-secondary rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-secondary/80">Manage Items</Link>
                     <a href={`/s/${site.slug}`} target="_blank" className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary transition-colors hover:text-white">
                        <ExternalLink size={20} />
                     </a>
                   </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{site.name}</h3>
                
                <div className="space-y-3 mb-8">
                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe size={16} />
                      <span>localbiz.com/s/{site.slug}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      <span className="truncate">{site.address}</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-8 border-b border-border mb-8">
                   <div className="text-center p-4 bg-secondary/30 rounded-2xl">
                      <p className="text-lg font-bold">{site.products.length}</p>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Products</p>
                   </div>
                   <div className="text-center p-4 bg-secondary/30 rounded-2xl">
                      <p className="text-lg font-bold">0</p>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Views</p>
                   </div>
                </div>

                <button className="w-full py-4 text-center font-bold text-muted-foreground hover:text-foreground transition-colors">
                   Website Settings
                </button>
             </div>
           ))}
        </div>
      )}
    </div>
  )
}
