import { Check, CreditCard, ShieldCheck } from 'lucide-react'

const plans = [
  { name: 'Free', price: '0', description: 'Basic online presence', current: true },
  { name: 'Pro', price: '499', description: 'Custom domain & advanced tools', current: false },
  { name: 'Premium', price: '999', description: 'Full SaaS power & payments', current: false },
]

export default function Billing() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
         <h1 className="text-3xl font-bold tracking-tight">Subscription & Billing</h1>
         <p className="text-muted-foreground mt-1">Manage your plan and payment methods.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         {plans.map(plan => (
           <div key={plan.name} className={`p-8 rounded-[2.5rem] border transition-all ${plan.current ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' : 'bg-background border-border'}`}>
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                 </div>
                 {plan.current && <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest">Active</span>}
              </div>
              <div className="mb-8">
                 <span className="text-4xl font-black">₹{plan.price}</span>
                 <span className="text-muted-foreground ml-1">/mo</span>
              </div>
              <ul className="space-y-4 mb-10">
                 {["Instant Website", "WhatsApp Orders", "Mobile Responsive"].map(f => (
                   <li key={f} className="flex items-center gap-3 text-sm">
                      <Check size={18} className="text-primary" />
                      {f}
                   </li>
                 ))}
              </ul>
              <button 
                disabled={plan.current}
                className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.current ? 'bg-secondary text-muted-foreground cursor-default' : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'}`}
              >
                {plan.current ? 'Current Plan' : 'Upgrade Plan'}
              </button>
           </div>
         ))}
      </div>

      <div className="p-8 rounded-[2rem] border border-border bg-background">
         <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground">
               <CreditCard size={24} />
            </div>
            <div>
               <h3 className="text-lg font-bold">Payment Methods</h3>
               <p className="text-sm text-muted-foreground">Manage how you pay for your subscriptions.</p>
            </div>
         </div>
         <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl text-center">
            <ShieldCheck size={48} className="text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground mb-6">No payment methods added yet.</p>
            <button className="px-8 py-3 bg-secondary rounded-xl font-bold hover:bg-secondary/80 transition-all">Add Card</button>
         </div>
      </div>
    </div>
  )
}
