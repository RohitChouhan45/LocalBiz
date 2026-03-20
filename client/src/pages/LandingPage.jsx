import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Testimonials */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
             {[
               { name: "Rahul S.", role: "Cafe Owner", text: "Generated my website in 2 minutes. My customers love the WhatsApp ordering!" },
               { name: "Priya M.", role: "Salon Founder", text: "The templates are so professional. I don't need a designer anymore." },
               { name: "Anita K.", role: "Boutique Shop", text: "Simplest dashboard I've ever used. Analytics helped me see where my traffic comes from." }
             ].map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-secondary/50 border border-border flex-1 min-w-[300px]"
                >
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-foreground italic mb-6">"{t.text}"</p>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      <Features />

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/40">
            {/* Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
              Ready to take your local <br /> business online?
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto relative z-10">
              Join 5,000+ local businesses who are already using LocalBiz Builder to reach more customers.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary rounded-full text-xl font-bold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 relative z-10 shadow-lg">
              Get Started for Free
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      <Pricing />
      <Footer />
    </div>
  )
}
