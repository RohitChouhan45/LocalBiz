import { ShoppingBag, Star, Clock, MapPin, Phone, MessageCircle, Heart, Search } from 'lucide-react'

export default function StoreTemplate({ business }) {
  const { name, description, phone, address, products } = business

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-slate-900">
      {/* Search Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <span className="text-xl font-black tracking-tight uppercase">{name}</span>
           <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                 <input 
                   placeholder="Search products..." 
                   className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-200"
                 />
              </div>
           </div>
           <div className="flex items-center gap-6">
              <button className="relative">
                 <ShoppingBag size={24} />
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
              </button>
           </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
         <div className="max-w-7xl mx-auto aspect-[21/9] rounded-[2rem] overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200" 
              alt="store banner" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-12">
               <div className="text-white max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-black mb-4">{name}</h1>
                  <p className="text-white/80 text-lg mb-8">{description}</p>
                  <a href="#products" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-100 transition-all">
                    Shop Now <ShoppingBag size={18} />
                  </a>
               </div>
            </div>
         </div>
      </section>

      {/* Featured/Products */}
      <section id="products" className="py-20 px-6 max-w-7xl mx-auto">
         <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black">Featured Products</h2>
            <div className="flex gap-2">
               <button className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-sm font-bold">All Items</button>
               <button className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-500">Popular</button>
            </div>
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.length > 0 ? products.map((item, i) => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-slate-100 mb-4 relative">
                     <img 
                       src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400"} 
                       alt={item.name} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                     />
                     <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                        <Heart size={20} />
                     </button>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <Star size={14} fill="currentColor" />
                     <span className="text-xs text-slate-400 ml-1">(12)</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-xl font-black">₹{item.price}</span>
                     <button 
                       onClick={() => window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=I'd like to buy ${item.name}`)}
                       className="w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-all shadow-lg"
                     >
                        <Plus size={20} />
                     </button>
                  </div>
               </div>
            )) : (
              <div className="col-span-4 py-32 text-center border-2 border-dashed border-slate-200 rounded-[3rem]">
                 <p className="text-slate-400 font-bold italic">No products in stock yet. Come back later!</p>
              </div>
            )}
         </div>
      </section>

      {/* Google Maps Integration Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-black mb-4">Visit Our Shop</h2>
               <p className="text-slate-500 flex items-center justify-center gap-2">
                  <MapPin size={18} /> {address}
               </p>
            </div>
            
            <div className="rounded-[3rem] overflow-hidden h-[400px] border border-slate-200 shadow-2xl shadow-slate-200/50">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 style={{ border: 0 }}
                 src={`https://www.google.com/maps/embed/v1/place?key=YOUR_MAPS_API_KEY&q=${encodeURIComponent(address)}`}
                 allowFullScreen
               ></iframe>
               <div className="absolute inset-0 bg-slate-100 flex items-center justify-center -z-10">
                  <p className="text-slate-400 font-medium">Add Google Maps API Key to activate map.</p>
               </div>
            </div>
         </div>
      </section>

      {/* Footer Shop Details */}
      <footer className="py-20 px-6">
         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
               <span className="text-2xl font-black tracking-tighter uppercase mb-6 block">{name}</span>
               <p className="text-slate-500 max-w-md mb-8">{description}</p>
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><Phone size={18} /></div>
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><MessageCircle size={18} /></div>
               </div>
            </div>
            <div>
               <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">Customer Care</h4>
               <ul className="space-y-4 font-medium text-slate-600">
                  <li>Shipping Policy</li>
                  <li>Returns & Exchanges</li>
                  <li>Privacy Promise</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-slate-400">Shop Info</h4>
               <p className="text-slate-600 mb-2 font-medium flex items-center gap-2"><Clock size={16} /> Mon-Sat: 9AM - 9PM</p>
               <p className="text-slate-600 font-medium flex items-center gap-2"><Phone size={16} /> {phone}</p>
            </div>
         </div>
         <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-100 text-center text-xs text-slate-400">
            © 2026 {name}. Premium Local Commerce powered by LocalBiz.
         </div>
      </footer>

      {/* WhatsApp Cart CTA */}
      <a 
        href={`https://wa.me/${phone.replace(/\D/g, '')}?text=Hello! I'm interested in ordering from your shop.`}
        className="fixed bottom-8 right-8 px-8 py-4 bg-[#25D366] text-white rounded-full flex items-center gap-3 shadow-2xl hover:scale-105 transition-all z-50 font-bold"
      >
        <ShoppingBag size={20} />
        Order on WhatsApp
      </a>
    </div>
  )
}
