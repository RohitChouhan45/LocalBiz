import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "1 Professional Website",
      "Standard Templates",
      "WhatsApp Integration",
      "LocalBiz Subdomain",
      "Basic Analytics"
    ],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Pro",
    price: "499",
    description: "Best for growing shops",
    features: [
      "Everything in Free",
      "Custom Domain Support",
      "Advanced Templates",
      "Premium Components",
      "Standard Analytics",
      "Email Support"
    ],
    cta: "Go Pro",
    popular: true
  },
  {
    name: "Premium",
    price: "999",
    description: "Full power for pro shops",
    features: [
      "Everything in Pro",
      "Razorpay Integration",
      "Advanced Analytics",
      "Priority Support",
      "Removes LocalBiz Badge",
      "SEO Optimization Tool"
    ],
    cta: "Get Premium",
    popular: false
  }
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent <span className="text-primary">pricing</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that fits your business stage. No hidden fees.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-[2rem] border transition-all duration-300 ${
                plan.popular 
                  ? 'bg-background border-primary shadow-2xl shadow-primary/10 scale-105 z-10' 
                  : 'bg-background border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold">₹{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/signup" 
                className={`w-full py-4 rounded-2xl font-bold text-center transition-all block ${
                  plan.popular 
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20' 
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
