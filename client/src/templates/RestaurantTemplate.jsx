import { Phone, MapPin, Clock, MessageCircle, Star } from 'lucide-react'

export default function RestaurantTemplate({ business }) {
  const { name, description, phone, address, services, products, themeConfig } = business
  const primaryColor = themeConfig?.primary || '#3b82f6'

  return (
    <div className="min-h-screen bg-white font-serif text-[#1a1a1a]">
      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center text-center px-6 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200" 
             alt="hero" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 uppercase tracking-widest">{name}</h1>
          <p className="text-xl text-white/90 mb-10 italic leading-relaxed">{description}</p>
          <a 
            href={`https://wa.me/${phone.replace(/\D/g, '')}`}
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-white/90 transition-all"
          >
            <MessageCircle size={20} />
            Book a Table
          </a>
        </div>
      </header>

      {/* Menu/Products */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold uppercase tracking-widest mb-4">Our Menu</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {products.length > 0 ? products.map((product, i) => (
            <div key={i} className="flex justify-between items-start border-b border-black/10 pb-6 group">
              <div className="flex-1 pr-4">
                 <h3 className="text-xl font-bold uppercase transition-colors group-hover:text-amber-700">{product.name}</h3>
                 <p className="text-sm text-black/60 mt-2">{product.description}</p>
              </div>
              <span className="text-xl font-bold">₹{product.price}</span>
            </div>
          )) : (
            <div className="col-span-2 text-center text-muted-foreground py-10 border-2 border-dashed rounded-3xl">
              Add your delicious dishes in the dashboard to see them here!
            </div>
          )}
        </div>
      </section>

      {/* Services/Features */}
      <section className="bg-[#f9f9f9] py-24">
         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
               <Clock className="w-10 h-10 mb-4" />
               <h4 className="font-bold uppercase tracking-wider mb-2">Hours</h4>
               <p className="text-black/70">Mon - Sun: 10AM - 11PM</p>
            </div>
            <div className="flex flex-col items-center">
               <MapPin className="w-10 h-10 mb-4" />
               <h4 className="font-bold uppercase tracking-wider mb-2">Location</h4>
               <p className="text-black/70">{address}</p>
            </div>
            <div className="flex flex-col items-center">
               <Phone className="w-10 h-10 mb-4" />
               <h4 className="font-bold uppercase tracking-wider mb-2">Contact</h4>
               <p className="text-black/70">{phone}</p>
            </div>
         </div>
      </section>

      {/* Location/Map */}
      <section className="py-24 bg-white">
         <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-center mb-12">Visit Us</h3>
            <div className="rounded-3xl overflow-hidden h-[450px] border border-black/5 shadow-inner">
               <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 style={{ border: 0 }}
                 src={`https://www.google.com/maps/embed/v1/place?key=YOUR_MAPS_API_KEY&q=${encodeURIComponent(address)}`}
                 allowFullScreen
               ></iframe>
            </div>
         </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a 
        href={`https://wa.me/${phone.replace(/\D/g, '')}?text=Hello! I'd like to place an order from ${name}`}
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={32} />
      </a>

      <footer className="py-12 border-t border-black/5 text-center">
         <p className="text-sm text-black/40 uppercase tracking-widest">© 2026 {name}. Powered by LocalBiz.</p>
      </footer>
    </div>
  )
}
