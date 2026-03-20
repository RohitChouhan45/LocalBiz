import { Phone, MapPin, Calendar, CheckCircle, MessageCircle } from 'lucide-react'

export default function ServiceTemplate({ business }) {
  const { name, description, phone, address, services, products, category } = business

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
           <span className="text-2xl font-black tracking-tight text-blue-600">{name}</span>
           <a 
             href={`https://wa.me/${phone.replace(/\D/g, '')}`}
             className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
           >
             Book Appointment
           </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold mb-6">
               <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
               Available Now
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
               Your trusted local <br /> <span className="text-blue-600">{category}</span> partner.
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
               {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all text-center">
                Explore Services
              </a>
              <a href={`tel:${phone}`} className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center">
                Call Us Direct
              </a>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2959210?auto=format&fit=crop&w=800" 
                  alt="service hero" 
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                      <CheckCircle size={24} />
                   </div>
                   <div>
                      <p className="font-bold text-lg">99% Satisfaction</p>
                      <p className="text-sm text-slate-500">Based on 500+ locals</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section id="services" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Our Services</h2>
               <p className="text-slate-500 text-lg">Professional solutions tailored to your needs.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {services.length > 0 ? services.map((service, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <Calendar className="w-6 h-6 text-blue-600" />
                     </div>
                     <h3 className="text-xl font-extrabold mb-3">{service.name}</h3>
                     <p className="text-slate-600 mb-6 line-clamp-2">{service.description}</p>
                     <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                        <span className="font-bold text-blue-600">{service.duration}</span>
                        <span className="text-xl font-black">₹{service.price}</span>
                     </div>
                  </div>
               )) : (
                <div className="col-span-3 text-center py-20 border-2 border-dashed rounded-[3rem] text-slate-400">
                  Services will appear here after you add them in your dashboard.
                </div>
               )}
            </div>
         </div>
      </section>

      {/* Business Location Map */}
      <section className="py-24 bg-blue-50/30">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                  <MapPin size={24} />
               </div>
               <div>
                  <h2 className="text-3xl font-extrabold">Find us on the map</h2>
                  <p className="text-slate-500">{address}</p>
               </div>
            </div>
            <div className="rounded-[3rem] overflow-hidden h-[500px] border-8 border-white shadow-2xl">
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

      {/* Footer Info */}
      <footer className="py-24 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div>
               <h4 className="text-xl font-bold mb-6">{name}</h4>
               <p className="text-slate-500">{address}</p>
            </div>
            <div>
               <h4 className="font-bold mb-4 uppercase tracking-widest text-sm text-slate-400">Quick Contact</h4>
               <p className="text-lg font-bold">{phone}</p>
               <p className="text-lg font-bold">{email}</p>
            </div>
            <div>
               <h4 className="font-bold mb-4 uppercase tracking-widest text-sm text-slate-400">Working Hours</h4>
               <p className="font-medium">Everyday: 9 AM - 8 PM</p>
            </div>
         </div>
      </footer>

      <a 
        href={`https://wa.me/${phone.replace(/\D/g, '')}`}
        className="fixed bottom-8 right-8 px-8 py-4 bg-[#25D366] text-white rounded-full flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform z-50 font-bold"
      >
        <MessageCircle size={24} />
        Chat with us
      </a>
    </div>
  )
}
