import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { Plus, Package, Trash2, Loader2, IndianRupee } from 'lucide-react'

export default function ProductManagement() {
  const [searchParams] = useSearchParams()
  const businessId = searchParams.get('businessId')
  const [businesses, setBusinesses] = useState([])
  const [selectedId, setSelectedId] = useState(businessId || '')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [showAdd, setShowAdd] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', image: '' })

  const user = JSON.parse(localStorage.getItem('user'))
  const config = { headers: { Authorization: `Bearer ${user.token}` } }

  useEffect(() => {
    const fetchStuff = async () => {
      const { data } = await axios.get('https://localbiz-o59o.onrender.com/api/businesses', config)
      setBusinesses(data)
      if (data.length > 0 && !selectedId) setSelectedId(data[0].id)
    }
    fetchStuff()
  }, [])

  useEffect(() => {
    if (selectedId) {
       const b = businesses.find(x => x.id === selectedId)
       if (b) setProducts(b.products)
    }
  }, [selectedId, businesses])

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('https://localbiz-o59o.onrender.com/api/products', { ...newItem, businessId: selectedId }, config)
      setProducts([...products, data])
      setShowAdd(false)
      setNewItem({ name: '', description: '', price: '', image: '' })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return
    try {
      await axios.delete(`https://localbiz-o59o.onrender.com/api/products/${id}`, config)
      setProducts(products.filter(p => p.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-3xl font-bold tracking-tight">Products & Services</h1>
           <p className="text-muted-foreground mt-1">Manage what you offer to your customers.</p>
        </div>
        
        <div className="flex gap-4">
           <select 
             value={selectedId} 
             onChange={e => setSelectedId(e.target.value)}
             className="bg-background border border-border rounded-xl px-4 py-2 text-sm font-bold"
           >
              {businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
           </select>
           <button 
             onClick={() => setShowAdd(true)}
             className="bg-primary text-white p-3 rounded-xl hover:scale-105 transition-transform"
           >
             <Plus size={24} />
           </button>
        </div>
      </div>

      {showAdd && (
         <div className="glass p-8 rounded-[2.5rem] border animate-in zoom-in-95 duration-200">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">Add New Item</h2>
              <button onClick={() => setShowAdd(false)} className="text-muted-foreground hover:text-foreground font-bold">Cancel</button>
           </div>
           <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-6">
              <input 
                required
                className="bg-secondary/50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Product Name"
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
              />
              <div className="relative">
                <IndianRupee size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  required
                  type="number"
                  className="w-full bg-secondary/50 border-none rounded-2xl pl-10 pr-4 py-4 outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={e => setNewItem({...newItem, price: e.target.value})}
                />
              </div>
              <textarea 
                className="md:col-span-2 bg-secondary/50 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Description"
                rows={3}
                value={newItem.description}
                onChange={e => setNewItem({...newItem, description: e.target.value})}
              />
              <button 
                type="submit"
                disabled={loading}
                className="md:col-span-2 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Save Product'}
              </button>
           </form>
         </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {products.map(product => (
           <div key={product.id} className="bg-background border border-border p-6 rounded-[2rem] hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                 <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground">
                    <Package size={24} />
                 </div>
                 <button 
                   onClick={() => handleDelete(product.id)}
                   className="p-2 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 rounded-lg"
                 >
                    <Trash2 size={20} />
                 </button>
              </div>
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
              <p className="text-xl font-black text-primary">₹{product.price}</p>
           </div>
         ))}
      </div>
    </div>
  )
}
