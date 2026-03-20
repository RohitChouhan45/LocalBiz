import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader2, AlertCircle } from 'lucide-react'
import RestaurantTemplate from '../templates/RestaurantTemplate'
import ServiceTemplate from '../templates/ServiceTemplate'
import StoreTemplate from '../templates/StoreTemplate'

export default function PublicSite() {
  const { slug } = useParams()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/businesses/site/${slug}`)
        setBusiness(data)
        // Record visit
        axios.post('http://localhost:5000/api/analytics', { businessId: data.id, eventType: 'visit' })
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load website')
      } finally {
        setLoading(false)
      }
    }
    fetchBusiness()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">Building your experience...</p>
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 text-center">
        <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-8">
           <AlertCircle size={40} />
        </div>
        <h1 className="text-4xl font-bold mb-4">Website Not Found</h1>
        <p className="text-muted-foreground max-w-md mb-10 leading-relaxed">
          The website you're looking for doesn't exist or has been moved. Check the URL and try again.
        </p>
        <a href="/" className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">
          Back to LocalBiz
        </a>
      </div>
    )
  }

  // Render template based on templateId or Category
  if (business.templateId === 'restaurant' || business.category === 'Restaurant') {
    return <RestaurantTemplate business={business} />
  }

  if (business.templateId === 'retail' || business.category === 'Retail Shop') {
    return <StoreTemplate business={business} />
  }

  return <ServiceTemplate business={business} />
}
