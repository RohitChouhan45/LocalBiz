import { Layout, Share2, Smartphone, TrendingUp, Shield, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Instant Website Generator",
    description: "Enter your business details and watch our AI create a professional website for you in seconds."
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "WhatsApp Ordering",
    description: "Customers can send orders directly to your WhatsApp. No complex checkout flows needed."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile First Design",
    description: "Your website looks stunning on every device, ensuring a seamless experience for all customers."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Built-in Analytics",
    description: "Track your visitors, clicks, and orders with simple, intuitive dashboards."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure & Fast",
    description: "Enjoy enterprise-grade security and lightning-fast loading speeds for all your pages."
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Social Integration",
    description: "Connect your Instagram, Facebook, and Google Maps to drive more local traffic."
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to <br /><span className="text-primary">grow locally</span></h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful tools designed specifically for small business owners who want to focus on their craft, not coding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 rounded-3xl bg-background border border-border/60 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
