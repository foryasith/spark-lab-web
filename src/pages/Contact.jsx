import { useState } from 'react'
import {
  Camera,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  PackageCheck,
  Phone,
  Send,
  ThumbsUp,
  Users,
} from 'lucide-react'
import business from '../config/business'
import useSeo from '../hooks/useSeo'
import { createContactUrl, createWhatsAppUrl } from '../utils/whatsapp'
import './Contact.css'

const initialFormData = {
  name: '',
  email: '',
  whatsappNumber: '',
  subject: '',
  message: '',
}

const defaultWhatsAppMessage =
  'Hello Spark Lab, I would like to know more about your products and services.'

function Contact() {
  useSeo({
    title: 'Contact & Project Support | Spark Lab',
    description:
      'Get in touch with Spark Lab for component availability, custom project assistance, and WhatsApp order support.',
  })
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  const contactOptions = [
    {
      title: 'WhatsApp',
      detail: business.phoneDisplay,
      href: createWhatsAppUrl(defaultWhatsAppMessage),
      Icon: MessageCircle,
    },
    {
      title: 'Phone / WhatsApp',
      detail: business.phoneDisplay,
      href: `tel:${business.phoneInternational}`,
      Icon: Phone,
    },
    {
      title: 'Facebook',
      detail: business.socials.facebook ? 'Visit our page' : 'Link coming soon',
      href: business.socials.facebook,
      Icon: ThumbsUp,
    },
    {
      title: 'Instagram',
      detail: business.socials.instagram ? 'Follow Spark Lab' : 'Link coming soon',
      href: business.socials.instagram,
      Icon: Camera,
    },
    {
      title: 'TikTok',
      detail: business.socials.tiktok ? 'Follow Spark Lab' : 'Link coming soon',
      href: business.socials.tiktok,
      Icon: Music2,
    },
    {
      title: 'Email',
      detail: business.email || 'Address coming soon',
      href: business.email ? `mailto:${business.email}` : '',
      Icon: Mail,
    },
  ]

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))

    if (errors[name]) {
      setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = {}
    if (!formData.name.trim()) validationErrors.name = 'Please enter your name.'
    if (!formData.subject.trim()) validationErrors.subject = 'Please enter a subject.'
    if (!formData.message.trim()) validationErrors.message = 'Please enter your message.'

    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    window.open(createContactUrl(formData), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="contact-page">
      <section className="contact-hero tech-grid section">
        <div className="container">
          <span>Contact Spark Lab</span>
          <h1>Let&apos;s Build Something.</h1>
          <p>
            Questions about components, projects or availability? Get in touch
            with Spark Lab.
          </p>
          <a
            className="btn btn-secondary"
            href={createWhatsAppUrl(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle aria-hidden="true" size={19} />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <section className="contact-options section" aria-labelledby="contact-options-title">
        <div className="container">
          <header className="contact-section-heading">
            <span>Choose a Channel</span>
            <h2 id="contact-options-title">Contact Options</h2>
            <p>WhatsApp is currently the quickest way to reach Spark Lab.</p>
          </header>
          <div className="contact-option-grid">
            {contactOptions.map(({ title, detail, href, Icon }) => {
              const content = (
                <>
                  <span className="contact-option-icon">
                    <Icon aria-hidden="true" size={22} strokeWidth={1.7} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{detail}</small>
                  </span>
                </>
              )

              return href ? (
                <a
                  className="contact-option-card"
                  href={href}
                  key={title}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {content}
                </a>
              ) : (
                <div className="contact-option-card is-placeholder" key={title}>
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="contact-form-section section" aria-labelledby="contact-form-title">
        <div className="container contact-form-layout">
          <div className="contact-form-copy">
            <span>Send an Inquiry</span>
            <h2 id="contact-form-title">Tell Us What You Need</h2>
            <p>
              Complete the form and review the prepared message in WhatsApp before
              choosing whether to send it.
            </p>
            <ul>
              <li><PackageCheck aria-hidden="true" size={19} /> Islandwide Delivery</li>
              <li><Globe2 aria-hidden="true" size={19} /> Online Orders</li>
              <li><Users aria-hidden="true" size={19} /> Student &amp; Maker Support</li>
              <li><MapPin aria-hidden="true" size={19} /> {business.location}</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-grid">
              <div className="contact-form-field">
                <label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && <small id="contact-name-error">{errors.name}</small>}
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-whatsapp">WhatsApp Number</label>
                <input
                  id="contact-whatsapp"
                  name="whatsappNumber"
                  type="tel"
                  autoComplete="tel"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span></label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                />
                {errors.subject && <small id="contact-subject-error">{errors.subject}</small>}
              </div>

              <div className="contact-form-field contact-form-field-wide">
                <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && <small id="contact-message-error">{errors.message}</small>}
              </div>
            </div>

            <button className="btn btn-secondary contact-submit" type="submit">
              <Send aria-hidden="true" size={18} />
              Send via WhatsApp
            </button>
            <p className="contact-privacy-note">
              This website does not store or submit your form data to a server.
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact
