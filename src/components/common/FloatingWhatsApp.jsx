import { MessageCircle } from 'lucide-react'
import analytics from '../../utils/analytics'
import { createWhatsAppUrl } from '../../utils/whatsapp'
import './FloatingWhatsApp.css'

const floatingContactMessage =
  'Hello Spark Lab, I would like to know more about your products and services.'

function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={createWhatsAppUrl(floatingContactMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Spark Lab on WhatsApp"
      onClick={() => analytics.trackContactWhatsApp('floating_widget')}
    >
      <MessageCircle aria-hidden="true" size={21} strokeWidth={1.9} />
      <span>Chat with us</span>
    </a>
  )
}

export default FloatingWhatsApp
