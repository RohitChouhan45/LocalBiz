import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Store, MapPin, Phone, Mail, Globe, Sparkles, Check } from 'lucide-react'
import axios from 'axios'

const steps = ["Basics", "Contact", "Identity"]

export default function BusinessBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Restaurant',
    slug: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    templateId: 'restaurant'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1)
    } else {
      submitForm()
    }
  }

  const submitForm = async () => {
    setLoading(true)
    setError('')
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      await axios.post('https://localbiz-o59o.onrender.com/api/businesses', formData, config)
      navigate('/dashboard/websites')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create business.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors font-medium">
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-extrabold mb-2">Create your <span className="text-primary">Business Site</span></h1>
        <p className="text-muted-foreground">Follow our simple wizard to go live in minutes.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary -z-10"></div>
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-2 bg-background/20 px-4">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                 i <= currentStep ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-secondary text-muted-foreground'
               }`}>
                 {i < currentStep ? <Check size={20} /> : i + 1}
               </div>
               <span className={`text-xs font-bold uppercase tracking-widest ${i <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                 {step}
               </span>
            </div>
          ))}
      </div>

      <div className="glass p-8 md:p-12 rounded-[3rem] border border-border/50 shadow-2xl shadow-primary/5">
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl mb-8 text-sm">
            {error}
          </div>
        )}

        {currentStep === 0 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
             <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-sm font-bold ml-1">Business Name</label>
                 <div className="relative">
                   <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                   <input
                     value={formData.name}
                     onChange={e => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-primary/20"
                     placeholder="The Golden Spatula"
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold ml-1">Category</label>
                 <select 
                   value={formData.category}
                   onChange={e => setFormData({...formData, category: e.target.value})}
                   className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                 >
                   <option>Restaurant</option>
                   <option>Salon & Spa</option>
                   <option>Retail Shop</option>
                   <option>Professional Service</option>
                   <option>Gym & Fitness</option>
                 </select>
               </div>
             </div>
             <div className="space-y-2">
                 <label className="text-sm font-bold ml-1">Website URL Slug</label>
                 <div className="relative">
                   <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">.localbiz.com</span>
                   <input
                     value={formData.slug}
                     onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                     className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-primary/20"
                     placeholder="golden-spatula"
                   />
                 </div>
               </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-300">
             <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-2">
                 <label className="text-sm font-bold ml-1">Phone Number</label>
                 <div className="relative">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                   <input
                     value={formData.phone}
                     onChange={e => setFormData({...formData, phone: e.target.value})}
                     className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-primary/20"
                     placeholder="+91 98765 43210"
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold ml-1">Email Address</label>
                 <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                   <input
                     value={formData.email}
                     onChange={e => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-primary/20"
                     placeholder="contact@business.com"
                   />
                 </div>
               </div>
             </div>
             <div className="space-y-2">
                 <label className="text-sm font-bold ml-1">Full Address</label>
                 <div className="relative">
                   <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                   <textarea
                     rows={3}
                     value={formData.address}
                     onChange={e => setFormData({...formData, address: e.target.value})}
                     className="w-full bg-secondary/50 border border-border rounded-2xl px-12 py-4 outline-none focus:ring-2 focus:ring-primary/20"
                     placeholder="123 Street Name, City, State, ZIP"
                   />
                 </div>
               </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-10 animate-in slide-in-from-right duration-300">
             <div className="space-y-2">
                 <label className="text-sm font-bold ml-1">Business Description</label>
                 <textarea
                   rows={4}
                   value={formData.description}
                   onChange={e => setFormData({...formData, description: e.target.value})}
                   className="w-full bg-secondary/50 border border-border rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/20"
                   placeholder="Tell us about your business. What makes you special?"
                 />
             </div>
             <div>
                <label className="text-sm font-bold ml-1 mb-4 block">Select Template</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'restaurant', name: 'Restaurant' },
                    { id: 'service', name: 'Service' },
                    { id: 'retail', name: 'Shop' },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setFormData({...formData, templateId: t.id})}
                      className={`p-4 rounded-2xl border transition-all text-center ${
                        formData.templateId === t.id ? 'border-primary bg-primary/5 text-primary scale-105' : 'border-border bg-secondary/30'
                      }`}
                    >
                      <span className="font-bold text-sm uppercase tracking-widest">{t.name}</span>
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}

        <div className="mt-12 flex justify-between gap-4">
          <button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(curr => curr - 1)}
            className="px-8 py-4 bg-secondary text-foreground rounded-2xl font-bold disabled:opacity-0 transition-opacity"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={loading}
            className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : (
              <>
                {currentStep === steps.length - 1 ? 'Launch My Site' : 'Continue'}
                <ArrowRight size={20} />
              </>
            )}
            <Sparkles size={20} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
