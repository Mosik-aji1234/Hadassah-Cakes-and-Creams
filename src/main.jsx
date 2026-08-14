import { createRoot } from 'react-dom/client'
import { ChevronRight, MapPin, Menu, Phone, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import './styles.css'

const whatsappNumber = '2348133076584'
const navItems = ['Home', 'Menu', 'About', 'Contact']
const getNavTarget = (item) => (item === 'Menu' ? 'treats' : item.toLowerCase().replace(' ', '-'))

const buildInquiryMessage = (name) =>
  `Hi i'm interested in ordering ${name}. What are the available pricing & options?`

const buildWhatsAppLink = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`


const reviewStorageKey = 'hadassah-cakes-reviews'

const loadReviews = () => {
  if (typeof window === 'undefined') return []

  try {
    const saved = JSON.parse(window.localStorage.getItem(reviewStorageKey) || '[]')
    return Array.isArray(saved) ? saved.slice(0, 3) : []
  } catch {
    return []
  }
}

const treatHighlights = [
  {
    title: 'Classic Celebration',
    category: 'Birthday Cake',
    image: '/images/img 2.jpeg',
    description: 'Soft buttercream finishes for birthdays and sweet milestones.',
  },
  {
    title: 'Signature Bloom',
    category: 'Wedding Cake',
    image: '/images/img 5.jpeg',
    description: 'Elegant centrepieces with a polished, romantic finish.',
  },
  {
    title: 'Joy Box',
    category: 'Celebration Box',
    image: '/images/img 37.jfif',
    description: 'A generous mix of treats made for gifting and sharing.',
  },
  {
    title: 'Layered Delight',
    category: 'Parfait',
    image: '/images/img 25.jpeg',
    description: 'Creamy dessert cups with rich layers and a neat finish.',
  },
  {
    title: 'Golden Bites',
    category: 'Small Chops',
    image: '/images/img 17.jpeg',
    description: 'Crowd-pleasing savoury bites for every kind of gathering.',
  },
  {
    title: 'Fresh Roll Pack',
    category: 'Pastries',
    image: '/images/img 21.jpeg',
    description: 'Fresh-baked pastry goodness with a homely feel.',
  },
  {
    title: 'Snack Tray',
    category: 'Party Pack',
    image: '/images/img 27.jpeg',
    description: 'A curated mix for meetings, gifting, and easy hosting.',
  },
  {
    title: 'Wrapped Surprise',
    category: 'Gift Box',
    image: '/images/img 36.jfif',
    description: 'An assorted tray wrapped up for a polished surprise.',
  },
]

const menuSections = [
  {
    slug: 'cakes',
    title: 'Cakes',
    description: 'Bespoke cakes for birthdays, weddings, and celebration moments.',
    items: ['Wedding cakes', 'Birthday cakes', 'Celebration cakes', 'Anniversary cakes', 'Themed cakes', 'Number cakes'],
    galleryClass: 'lg:grid-cols-3',
    gallery: [
      { title: 'Classic Celebration', category: 'Birthday Cake', image: '/images/img 1.jpeg' },
      { title: 'Birthday Bliss', category: 'Birthday Cake', image: '/images/img 2.jpeg' },
      { title: 'Luxe Layers', category: 'Birthday Cake', image: '/images/img 3.jpeg' },
      { title: 'Signature Bloom', category: 'Wedding Cake', image: '/images/img 5.jpeg' },
      { title: 'Elegant Drip', category: 'Celebration Cake', image: '/images/img 6.jpeg' },
      { title: 'Tall Statement', category: 'Occasion Cake', image: '/images/img 7.jpeg' },
      { title: 'Golden Drizzle', category: 'Custom Cake', image: '/images/img 10.jpeg' },
      { title: 'Floral Finish', category: 'Custom Cake', image: '/images/img 13.jpeg' },
      { title: 'Cream Charm', category: 'Celebration Cake', image: '/images/img 16.jpeg' },
    ],
  },
  {
    slug: 'parfaits',
    title: 'Parfaits & Dessert Cups',
    description: 'Sweet layers for serving, gifting, and effortless dessert moments.',
    items: ['Parfait cups', 'Trifle cups', 'Cake jars', 'Dessert shots', 'Mini mousse cups'],
    galleryClass: 'lg:grid-cols-4',
    gallery: [
      { title: 'Velvet Parfait', category: 'Parfait Cup', image: '/images/img 18.jpeg' },
      { title: 'Berry Layers', category: 'Dessert Cup', image: '/images/img 19.jpeg' },
      { title: 'Cream Cup', category: 'Dessert Cup', image: '/images/img 21.jpeg' },
      { title: 'Sweet Jar', category: 'Parfait Cup', image: '/images/img 25.jpeg' },
    ],
  },
  {
    slug: 'small-chops',
    title: 'Small Chops',
    description: 'Perfect for parties, meetings, and snack cravings.',
    items: ['Sausage rolls', 'Spring rolls', 'Samosas', 'Meat pies', 'Doughnuts', 'Puff puff'],
    galleryClass: 'lg:grid-cols-4',
    gallery: [
      { title: 'Golden Bites', category: 'Small Chops', image: '/images/img 17.jpeg' },
      { title: 'Party Mix', category: 'Savoury Platter', image: '/images/img 22.jpeg' },
      { title: 'Snack Combo', category: 'Small Chops', image: '/images/img 23.jpeg' },
      { title: 'Crunch Tray', category: 'Party Tray', image: '/images/img 24.jpeg' },
    ],
  },
  {
    slug: 'celebration-boxes',
    title: 'Celebration Boxes',
    description: 'Ready-to-gift boxes for birthdays, surprises, and special days.',
    items: ['Celebration boxes', 'Snack boxes', 'Treat boxes', 'Birthday boxes', 'Surprise gift boxes'],
    galleryClass: 'lg:grid-cols-4',
    gallery: [
      { title: 'Joy Box', category: 'Celebration Box', image: '/images/img 27.jpeg' },
      { title: 'Birthday Bundle', category: 'Treat Box', image: '/images/img 32.jpeg' },
      { title: 'Wrapped Surprise', category: 'Gift Box', image: '/images/img 36.jfif' },
      { title: 'Party Hamper', category: 'Celebration Box', image: '/images/img 37.jfif' },
    ],
  },
  {
    slug: 'platters',
    title: 'Platters & Trays',
    description: 'Generous spreads for group hosting and event service.',
    items: ['Small chops platters', 'Party trays', 'Food platters', 'Snack platters', 'Premium combo trays'],
    galleryClass: 'lg:grid-cols-4',
    gallery: [
      { title: 'Premium Platter', category: 'Food Platter', image: '/images/img 28.jpeg' },
      { title: 'Hosting Tray', category: 'Event Tray', image: '/images/img 30.jpeg' },
      { title: 'Feast Tray', category: 'Party Platter', image: '/images/img 38.jfif' },
      { title: 'Gathering Spread', category: 'Premium Tray', image: '/images/img 39.jfif' },
    ],
  },
  {
    slug: 'Extras',
    title: 'Pastries & Extras',
    description: 'Fresh pastry trays and easy add-ons to complete your order.',
    items: ['Sausage rolls', 'Doughnuts', 'Chin-chin', 'Peanuts', 'Event favours'],
    galleryClass: 'lg:grid-cols-4',
    gallery: [
      { title: 'Soft Pastry Layers', category: 'Pastries', image: '/images/img 15.jpeg' },
      { title: 'Sausage Rolls', category: 'Pastries', image: '/images/img 20.jpeg' },
      { title: 'Peanuts', category: 'Pastries', image: '/images/img 26.jpeg' },
      { title: 'Doughs', category: 'Pastries', image: '/images/img 29.jpeg' },
      { title: 'Soft bread', category: 'Pastries', image: '/images/img 31.jpeg' },
      { title: 'Event favours', category: 'Extras', image: '/images/img 33.jpeg' },
      { title: 'Egg roll', category: 'Extras', image: '/images/img 34.jpeg' },
      { title: 'Chin-chin', category: 'Extras', image: '/images/img 35.jpeg' },
    ],
  },
]

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16.02 3a13 13 0 0 0-11.16 19.67L3 29l6.5-1.7A13 13 0 1 0 16.02 3Zm0 23.73a10.7 10.7 0 0 1-5.46-1.5l-.39-.23-3.86 1.01 1.03-3.76-.26-.4a10.72 10.72 0 1 1 8.94 4.88Zm5.88-8.02c-.32-.16-1.9-.94-2.19-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.37.24-.69.08a8.74 8.74 0 0 1-2.58-1.59 9.68 9.68 0 0 1-1.79-2.23c-.19-.32 0-.5.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.27-.64-.54-.55-.73-.56h-.62c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.68s1.15 3.1 1.31 3.31c.16.22 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.47.2 2.02.12.62-.1 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

function InstagramIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M13.8 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V10H8v3h2.6v8h3.2Z" />
    </svg>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTreatsOpen, setIsTreatsOpen] = useState(false)
  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false)
  const [isHeaderSolid, setIsHeaderSolid] = useState(false)
  const [activeNav, setActiveNav] = useState('home')
  const [activeGallerySlug, setActiveGallerySlug] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [reviewName, setReviewName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [reviews, setReviews] = useState(loadReviews)
  const [customOrder, setCustomOrder] = useState({ name: '', eventType: '', eventDate: '', location: '', request: '' })

  const closeMenu = () => setIsMenuOpen(false)
  const closeTreats = () => {
    setIsTreatsOpen(false)
    setActiveGallerySlug(null)
  }
  const openImagePreview = (image, title) => setSelectedImage({ image, title })
  const closeImagePreview = () => setSelectedImage(null)

  const openReview = () => setIsReviewOpen(true)
  const closeReview = () => setIsReviewOpen(false)
  const closeCustomOrder = () => setIsCustomOrderOpen(false)

  const handleReviewSubmit = (event) => {
    event.preventDefault()

    const name = reviewName.trim()
    const comment = reviewText.trim()
    if (!name || !comment) return

    setReviews((current) => [
      { name, comment, submittedAt: new Date().toISOString() },
      ...current,
    ].slice(0, 3))
    setReviewName('')
    setReviewText('')
    closeReview()
  }

  const handleCustomOrderSubmit = (event) => {
    event.preventDefault()

    const { name, eventType, eventDate, location, request } = customOrder
    if (!name.trim() || !eventType.trim() || !eventDate || !location.trim() || !request.trim()) return

    const message = [
      'Hello Hadassah Cakes & Creams, I would like to place a custom order.',
      '',
      `Name: ${name.trim()}`,
      `Event type: ${eventType.trim()}`,
      `Event date: ${eventDate}`,
      `Location: ${location.trim()}`,
      `Special requests: ${request.trim()}`,
    ].join('\n')

    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
    setCustomOrder({ name: '', eventType: '', eventDate: '', location: '', request: '' })
    closeCustomOrder()
  }

  const openSection = (slug) => {
    setActiveGallerySlug(slug)
    requestAnimationFrame(() => {
      document.getElementById(`${slug}-gallery`)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const openTreats = () => {
    setIsTreatsOpen(true)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (!isMenuOpen && !isTreatsOpen && !isReviewOpen && !isCustomOrderOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isCustomOrderOpen) {
          closeCustomOrder()
        } else if (isReviewOpen) {
          closeReview()
        } else if (isTreatsOpen) {
          closeTreats()
        } else if (isMenuOpen) {
          closeMenu()
        }
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen, isTreatsOpen, isReviewOpen, isCustomOrderOpen])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(reviewStorageKey, JSON.stringify(reviews))
  }, [reviews])

  useEffect(() => {
    const updateHeader = () => setIsHeaderSolid(window.scrollY > 48)

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf6] text-[#5b241f]">
      <section className="relative isolate z-40 min-h-screen bg-[url('/images/Background%20img.png')] bg-cover bg-center text-white">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(35,16,14,.84)_0%,rgba(45,22,18,.72)_36%,rgba(45,22,18,.24)_72%,rgba(45,22,18,.4)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_21%,rgba(250,213,163,.16),transparent_26%)]" />

        <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${isHeaderSolid ? 'border-b border-[#ead8ca] bg-[#fffaf6]/98 shadow-[0_8px_24px_rgba(75,37,24,.12)] backdrop-blur-md' : 'bg-transparent'}`}>
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-6">
          <a href="#home" className="flex items-center gap-3" aria-label="Hadassah Cakes and Creams home">
            <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-[#f8d9bd]/60 bg-[#fff9f2]/95 shadow-lg shadow-black/10">
              <img src="/images/logo 2.png" alt="Hadassah Cakes and Creams logo" className="h-full w-full object-cover" />
            </span>
            <span className="leading-none">
              <span className={`block font-display text-xl font-bold tracking-tight transition-colors ${isHeaderSolid ? 'text-[#6b2730]' : 'text-[#fff8ef]'}`}>Hadassah</span>
              <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[.22em] transition-colors ${isHeaderSolid ? 'text-[#bf6a43]' : 'text-[#efc59c]'}`}>Cakes &amp; Creams</span>
            </span>
          </a>

          <nav className={`relative hidden w-[344px] grid-cols-4 rounded-full p-1 text-sm font-semibold text-white transition-all duration-300 md:grid ${isHeaderSolid ? 'bg-[#88707a] shadow-lg shadow-[#5d3841]/20' : 'border border-white/10 bg-black/10 text-white/90 backdrop-blur-sm'}`} aria-label="Main navigation">
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-1 left-1 w-[calc(25%-0.25rem)] rounded-full bg-[#f3bc6d]/20 shadow-inner transition-transform duration-300 ease-out ${activeNav === 'home' ? 'translate-x-0' : activeNav === 'treats' ? 'translate-x-full' : activeNav === 'about' ? 'translate-x-[200%]' : 'translate-x-[300%]'}`}
            />
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${getNavTarget(item)}`}
                onClick={() => setActiveNav(getNavTarget(item))}
                className={`relative z-10 rounded-full py-2.5 text-center transition-colors ${activeNav === getNavTarget(item) ? 'text-[#ffe0a6]' : 'hover:text-[#f6bf7f]'}`}
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href={buildWhatsAppLink('Hi, I would like to order from Hadassah Cakes and Creams. Please share your pricing and available options.')}
            className="hidden items-center gap-2 rounded-full bg-[#d67a4b] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#2c120d]/20 transition hover:-translate-y-0.5 hover:bg-[#e38a59] sm:flex"
          >
            <WhatsAppIcon size={19} />
            Chat with us
          </a>
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-[#8f6f78] text-white shadow-lg shadow-black/20 transition hover:bg-[#9f7f88] md:hidden"
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          </div>
        </header>

        {isMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden" onClick={closeMenu}>
            <aside
              className="absolute right-0 top-0 flex h-full w-[84vw] max-w-[340px] flex-col bg-[#fff7f1] text-[#7a4a3f] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#e8c8bc] px-5 py-4">
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[#e6c6b9] bg-white shadow-sm">
                    <img src="/images/logo 2.png" alt="Hadassah Cakes and Creams logo" className="h-full w-full object-cover" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-[#8a4a55]">Hadassah</span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[.22em] text-[#d07a49]">Cakes &amp; Creams</span>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#d8b4a8] text-[#8a4a55] transition hover:bg-[#fff0e8]"
                  aria-label="Close menu"
                >
                  <X size={21} />
                </button>
              </div>

              <nav className="flex-1 px-5 py-6" aria-label="Mobile navigation">
                <div className="space-y-3">
                  {navItems.map((item, index) => (
                    <a
                      key={item}
                      href={`#${getNavTarget(item)}`}
                      className={`flex items-center gap-3 rounded-full px-4 py-3 text-base font-semibold transition ${activeNav === getNavTarget(item) ? 'bg-[#fff0e7] text-[#c45b3c]' : 'hover:bg-[#fff1e7] hover:text-[#d07a49]'}`}
                      onClick={() => {
                        setActiveNav(getNavTarget(item))
                        closeMenu()
                      }}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#d07a49]" />
                      {item}
                    </a>
                  ))}
                </div>
              </nav>

              <div className="border-t border-[#e8c8bc] px-5 py-5">
                <a
                  href={buildWhatsAppLink('Hi, I would like to order from Hadassah Cakes and Creams. Please share your pricing and available options.')}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#d67a4b] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#2c120d]/20 transition hover:bg-[#e38a59]"
                  onClick={closeMenu}
                >
                  <WhatsAppIcon size={18} />
                  Chat with us
                </a>
              </div>
            </aside>
          </div>
        )}

        <div id="home" className="mx-auto flex min-h-screen w-full max-w-[1440px] items-end px-5 pb-12 pt-20 sm:items-end sm:px-8 sm:pb-16 sm:pt-20 lg:px-12 lg:pb-20 lg:pt-28">
          <div className="max-w-2xl">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.24em] text-[#ffd092] sm:mb-5 sm:text-sm">
              <span className="h-px w-8 bg-[#f5c58f]" />
              Made with heart, served with joy
            </p>
            <h1 className="font-[var(--font-display)] text-[clamp(3.15rem,6.4vw,6.75rem)] font-bold leading-[.88] tracking-[-.045em]">
              <span className="block text-[#fffaf5] drop-shadow-[0_4px_16px_rgba(34,14,10,.22)]">Sweetness,</span>
              <span className="mt-2 block bg-gradient-to-r from-[#ffe7c8] via-[#f0b15e] to-[#fff4df] bg-clip-text italic text-transparent">
                made to delight.
              </span>
            </h1>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
              <a
                href="#treats"
                className="group relative isolate inline-flex items-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(110deg,#cc673a,#e58c4c,#d36c3c)] px-6 py-3.5 font-bold text-white shadow-xl shadow-[#25130c]/25 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(43,18,11,.35)] after:absolute after:inset-y-0 after:left-[-45%] after:w-1/3 after:skew-x-[-18deg] after:bg-white/25 after:transition-transform after:duration-500 group-hover:after:translate-x-[460%]"
              >
                <span className="relative z-10">See our treats</span>
                <ChevronRight size={18} className="relative z-10 transition duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={buildWhatsAppLink("Hi, I would like to order from Hadassah Cakes and Creams. Please share your pricing and available options.")}
                className="inline-flex items-center gap-2 rounded-full border border-[#fff5e9]/70 bg-white/5 px-6 py-3.5 font-bold text-[#fffaf5] backdrop-blur-sm transition hover:bg-white/15"
              >
                <WhatsAppIcon size={19} />
                Place an order
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[5.5rem] right-5 hidden max-w-[260px] text-right text-xs font-semibold leading-5 text-[#fff8f2]/90 sm:block sm:right-8 lg:bottom-[6.5rem] lg:right-12">
          Birthday cakes {'\u00b7'} Weddings {'\u00b7'} Pastries<br />Dessert tables {'\u00b7'} Custom creations
        </div>

        <div className="fixed bottom-5 right-5 z-30 flex gap-3 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-12">
          <a
            href="tel:+2348133076584"
            className="grid h-14 w-14 place-items-center rounded-full bg-[#fff8ef] text-[#b45845] shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
            aria-label="Call Hadassah Cakes and Creams"
          >
            <Phone size={21} fill="currentColor" />
          </a>
          <a
            href={buildWhatsAppLink('Hi, I would like to order from Hadassah Cakes and Creams. Please share your pricing and available options.')}
            className="grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
            aria-label="Message us on WhatsApp"
          >
            <WhatsAppIcon size={27} />
          </a>
        </div>
      </section>

      <section id="treats" className="relative w-full bg-[#fffaf6] py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-5 py-2 text-[#5b241f] sm:px-8 sm:py-4 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.28em] text-[#d27c4c] sm:text-sm">Our favourites</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.03em] text-[#5f201f] sm:text-4xl lg:text-5xl">
              Our <span className="text-[#d67a4b]">Treats</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#7b4b42] sm:text-base">
              A handpicked preview of the full menu, so the page stays elegant while still showing the variety we can make for you.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
            {treatHighlights.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[1.25rem] border border-[#e9cdbc] bg-white shadow-[0_16px_50px_rgba(95,32,31,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(95,32,31,.14)] sm:rounded-[1.6rem]"
              >
                <button
                  type="button"
                  onClick={() => openImagePreview(item.image, item.title)}
                  className="relative block w-full overflow-hidden text-left"
                  aria-label={`View full image for ${item.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#eddad1]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-[#c53b3b] via-[#d96a3a] to-[#d7a24b] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-white shadow-lg shadow-black/15 sm:left-4 sm:top-4 sm:px-3 sm:text-[11px]">
                      {item.category}
                    </span>
                  </div>
                </button>
                <div className="flex h-full flex-col p-3 sm:p-5">
                  <h3 className="font-display text-lg font-bold leading-tight text-[#5b241f] sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#7a4f45] sm:mt-3 sm:text-sm sm:leading-7">{item.description}</p>
                  <a
                    href={buildWhatsAppLink(buildInquiryMessage(item.title))}
                    className="mt-4 inline-flex items-center justify-center rounded-full bg-[#d7a24b] px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#28130f]/20 transition hover:-translate-y-0.5 hover:bg-[#b57a4a] hover:text-white sm:mt-5 sm:px-5 sm:py-3 sm:text-sm"
                  >
                    Enquire now
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={openTreats}
              className="inline-flex items-center gap-2 rounded-full bg-[#5f201f] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#2e110f]/20 transition hover:-translate-y-0.5 hover:bg-[#742a27]"
            >
              See more
              <ChevronRight size={18} />
            </button>
            <p className="text-sm text-[#8b6258]">Open the full menu and explore the categories we make for weddings, birthdays, parties, and gifting.</p>
          </div>
        </div>
      </section>


      <section id="about" className="relative w-full bg-[#f8e9e1] py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-2 text-[#5b241f] sm:px-8 sm:py-4 lg:grid-cols-[1.15fr_.95fr] lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.28em] text-[#d27c4c] sm:text-sm">Our Story</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-[-.03em] text-[#5f201f] sm:text-4xl lg:text-5xl">
              Made with heart, <span className="text-[#d67a4b]">shared with joy.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#7a4f45] sm:text-lg">
              Hadassah Cakes &amp; Creams was built on a simple promise: every cake, treat, and celebration box should feel warm, thoughtful, and unforgettable. From the first sketch to the final ribbon, we care about the little details that make your order feel personal.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#7a4f45] sm:text-lg">
              Under the creative direction of Esther Iyanuoluwa Ajayi, the brand blends beautiful presentation, comforting flavours, and a true love for memorable moments. Whether it is a wedding, birthday, or an everyday sweet craving, we want each order to arrive like a little celebration on its own.
            </p>

            <div className="mt-8 inline-flex items-center gap-4 border-l-2 border-[#d67a4b] bg-white/70 py-2 pl-4 pr-5">
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold text-[#5b241f]">Esther Iyanuoluwa Ajayi</span>
                <span className="mt-1 text-sm font-medium text-[#d27c4c]">Founder, Hadassah Cakes &amp; Creams</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#d67a4b]/15 blur-3xl" />
            <div className="absolute -bottom-8 right-8 h-24 w-24 rounded-full bg-[#f5c58f]/25 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/30 bg-[linear-gradient(135deg,rgba(255,255,255,.72),rgba(255,236,228,.95))] p-4 shadow-[0_22px_55px_rgba(95,32,31,.14)]">
              <div className="overflow-hidden rounded-[1.45rem] border border-white/60 bg-white">
                <img
                  src="/images/Owner.png"
                  alt="Esther Iyanuoluwa Ajayi, founder of Hadassah Cakes and Creams"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative w-full bg-[#fffaf6] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-5 py-2 text-[#5b241f] sm:px-8 sm:py-4 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.28em] text-[#d27c4c] sm:text-sm">Let&apos;s make it sweet</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.03em] text-[#5f201f] sm:text-4xl lg:text-5xl">
              Contact <span className="text-[#d67a4b]">Us</span>
            </h2>
            <p className="mt-4 text-base leading-8 text-[#7a4f45] sm:text-lg">
              For birthdays, weddings, events, and every occasion worth celebrating, we are here to help.
            </p>
            <p className="mt-2 font-display text-base font-bold text-[#b53d74] sm:text-lg">Custom orders are always welcome.</p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-[#ead2c8] bg-white p-6 text-center shadow-[0_18px_45px_rgba(95,32,31,.08)] sm:p-8">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e5f8ec] text-[#25d366]">
                <WhatsAppIcon size={28} />
              </div>
              <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold text-[#5b241f]">Order on WhatsApp</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#7b4b42] sm:text-base">
                Send us a message and we&apos;ll guide you through flavours, pricing, and the best options for your order.
              </p>
              <a
                href={buildWhatsAppLink('Hi, I would like to order from Hadassah Cakes and Creams. Please share your pricing and available options.')}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d7a24b] px-6 py-4 font-bold text-white shadow-lg shadow-[#7e2348]/20 transition hover:-translate-y-0.5 hover:bg-[#a94f42]"
              >
                <WhatsAppIcon size={18} />
                Message Us
              </a>
            </article>

            <article className="rounded-[2rem] border border-[#ead2c8] bg-white p-6 text-center shadow-[0_18px_45px_rgba(95,32,31,.08)] sm:p-8">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#fff0df] text-[#e07a2f]">
                <Phone size={27} />
              </div>
              <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold text-[#5b241f]">Give Us a Call</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#7b4b42] sm:text-base">
                Have a quick question or need help choosing? We&apos;re happy to talk through the details with you.
              </p>
              <a
                href="tel:+2348133076584"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#e8b37c] bg-[#fffaf6] px-6 py-4 font-bold text-[#c65b2d] shadow-[0_10px_25px_rgba(95,32,31,.06)] transition hover:-translate-y-0.5 hover:border-[#d67a4b] hover:bg-[#fff2e7]"
              >
                +234 813 307 6584
              </a>
            </article>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.75rem] border border-[#edd9d1] bg-[#f8e8dc] px-5 py-5 shadow-[0_14px_35px_rgba(95,32,31,.06)] sm:px-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#c04b6c] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
                    <circle cx="12" cy="10" r="2.2" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-[#5b241f]">Location</h4>
                  <p className="mt-2 text-sm leading-7 text-[#7b4b42] sm:text-base">Lagos, Nigeria</p>
                  <p className="mt-1 text-sm leading-7 text-[#7b4b42] sm:text-base">We serve customers across Lagos and nearby areas with delivery and pick-up options where available.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#edd9d1] bg-[#f8e8dc] px-5 py-5 shadow-[0_14px_35px_rgba(95,32,31,.06)] sm:px-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-[#e07a2f] shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v4l3 2" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-[#5b241f]">Events</h4>
                  <p className="mt-2 text-sm leading-7 text-[#7b4b42] sm:text-base">Birthdays &middot; Weddings &middot; Engagements &middot; Corporate events &middot; Parties</p>
                  <p className="mt-1 text-sm leading-7 text-[#7b4b42] sm:text-base">Please place custom orders at least 24 hours ahead so we can prepare everything beautifully.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="review" className="relative w-full overflow-hidden bg-[linear-gradient(120deg,#422118_0%,#74431f_52%,#b97835_100%)] py-12 text-white lg:py-14">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#f3c67e]/15" />
        <div className="absolute -bottom-24 left-[30%] h-48 w-48 rounded-full bg-[#2f150f]/15" />
        <button
          type="button"
          onClick={openReview}
          className="absolute left-0 top-8 z-10 inline-flex items-center gap-2 rounded-r-full bg-[#f8dcb7] px-5 py-3 text-sm font-bold text-[#5d2419] shadow-[0_12px_28px_rgba(37,17,10,.24)] transition hover:bg-[#efb765] hover:text-[#4b1b14] sm:top-10 sm:px-6"
        >
          <Star size={16} fill="currentColor" />
          Leave a review
        </button>

        <div className="relative mx-auto max-w-[1440px] px-6 pt-14 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto_auto] lg:items-start lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-white/20 bg-white/95 shadow-lg shadow-black/10">
                  <img src="/images/logo 2.png" alt="Hadassah Cakes and Creams logo" className="h-full w-full object-cover" />
                </span>
                <div>
                  <p className="font-display text-3xl font-bold tracking-[-.03em] text-[#fff9ed]">Hadassah</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.28em] text-[#f7d199]">Cakes &amp; Creams</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold tracking-[-.02em] text-[#ffe0a8]">Explore</h3>
              <div className="mt-4 space-y-3 text-sm font-semibold text-white/90">
                <a href="#home" className="block transition hover:text-[#ffe0a8]">Home</a>
                <a href="#treats" className="block transition hover:text-[#ffe0a8]">Menu</a>
                <a href="#about" className="block transition hover:text-[#ffe0a8]">About</a>
                <a href="#contact" className="block transition hover:text-[#ffe0a8]">Contact</a>
                <button type="button" onClick={openReview} className="block text-left transition hover:text-[#ffe0a8]">Review</button>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl font-bold tracking-[-.02em] text-[#ffe0a8]">Connect</h3>
              <div className="mt-4 space-y-3 text-sm font-semibold text-white/90">
                <a href={buildWhatsAppLink('Hi, I would like to order from Hadassah Cakes and Creams. Please share your pricing and available options.')} className="flex items-center gap-3 transition hover:text-[#ffe0a8]">
                  <WhatsAppIcon size={18} />
                  WhatsApp
                </a>
                <a href="https://www.instagram.com/hadassahcakesandcreams/" className="flex items-center gap-3 transition hover:text-[#ffe0a8]">
                  <InstagramIcon size={18} />
                  Instagram
                </a>
                <a href="https://www.facebook.com/esther.ajayi27" className="flex items-center gap-3 transition hover:text-[#ffe0a8]">
                  <FacebookIcon size={18} />
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/20 pt-5 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Hadassah Cakes &amp; Creams. All rights reserved.</p>
            <p className="flex items-center gap-2"><MapPin size={16} /> Lagos, Nigeria</p>
          </div>
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1b0b0f]/85 px-4 py-6 backdrop-blur-sm" onClick={closeImagePreview}>
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#fff7f3] p-3 shadow-2xl sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeImagePreview}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#e7c8bd] bg-white text-[#8b4b42] transition hover:bg-[#fff3ee]"
              aria-label="Close image preview"
            >
              <X size={18} />
            </button>
            <div className="overflow-hidden rounded-[1.25rem] bg-[#f3e2d8]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>
            <p className="mt-3 text-center font-display text-xl font-bold text-[#5b241f] sm:text-2xl">{selectedImage.title}</p>
          </div>
        </div>
      )}

      {isReviewOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1b0b0f]/75 px-4 py-6 backdrop-blur-sm" onClick={closeReview}>
          <div
            className="relative w-full max-w-lg rounded-[2rem] border border-white/15 bg-[#fff7f3] p-6 text-[#5b241f] shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeReview}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[#e7c8bd] bg-white text-[#8b4b42] transition hover:bg-[#fff3ee]"
              aria-label="Close review form"
            >
              <X size={18} />
            </button>

            <div className="max-w-md">
              <p className="text-xs font-bold uppercase tracking-[.28em] text-[#d27c4c] sm:text-sm">Leave a review</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.03em] text-[#5f201f] sm:text-4xl">Share your experience</h2>
              <p className="mt-3 text-sm leading-7 text-[#7b4b42]">Tell us your name and what you enjoyed. The three most recent reviews are kept here for visitors to read.</p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleReviewSubmit}>
              <div>
                <label htmlFor="review-name" className="mb-2 block text-sm font-semibold text-[#7b4b42]">Name</label>
                <input
                  id="review-name"
                  value={reviewName}
                  onChange={(event) => setReviewName(event.target.value)}
                  className="w-full rounded-2xl border border-[#e6c8b9] bg-white px-4 py-3 text-[#5b241f] outline-none transition placeholder:text-[#ab8578] focus:border-[#d67a4b]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="review-text" className="mb-2 block text-sm font-semibold text-[#7b4b42]">Review</label>
                <textarea
                  id="review-text"
                  rows={5}
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  className="w-full resize-none rounded-2xl border border-[#e6c8b9] bg-white px-4 py-3 text-[#5b241f] outline-none transition placeholder:text-[#ab8578] focus:border-[#d67a4b]"
                  placeholder="Tell us what you loved..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#8b3f36] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#4f1a18]/20 transition hover:-translate-y-0.5 hover:bg-[#d89b48]"
              >
                Submit review
              </button>
            </form>

            {reviews.length > 0 && (
              <div className="mt-7 border-t border-[#ead3c7] pt-5">
                <p className="text-xs font-bold uppercase tracking-[.22em] text-[#b66e3d]">Latest reviews</p>
                <div className="mt-3 space-y-3">
                  {reviews.slice(0, 3).map((review, index) => (
                    <article key={`${review.name}-${index}`} className="rounded-2xl bg-[#fff0e5] px-4 py-3">
                      <p className="font-semibold text-[#682a25]">{review.name}</p>
                      <p className="mt-1 text-sm leading-6 text-[#7b4b42]">{review.comment}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isCustomOrderOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1b0b0f]/75 px-4 py-6 backdrop-blur-sm" onClick={closeCustomOrder}>
          <div
            className="relative w-full max-w-xl rounded-[2rem] border border-white/20 bg-[#fff8f3] p-6 text-[#5b241f] shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeCustomOrder}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[#e7c8bd] bg-white text-[#8b4b42] transition hover:bg-[#fff0e8]"
              aria-label="Close custom order form"
            >
              <X size={18} />
            </button>

            <div className="max-w-md">
              <p className="text-xs font-bold uppercase tracking-[.26em] text-[#29965a] sm:text-sm">Custom order</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.03em] text-[#5f201f] sm:text-4xl">Let&apos;s make it special</h2>
              <p className="mt-3 text-sm leading-7 text-[#7b4b42]">Share the key details below and we&apos;ll open WhatsApp with your request ready to send.</p>
            </div>

            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleCustomOrderSubmit}>
              <div>
                <label htmlFor="custom-name" className="mb-2 block text-sm font-semibold text-[#7b4b42]">Name</label>
                <input
                  id="custom-name"
                  required
                  value={customOrder.name}
                  onChange={(event) => setCustomOrder((current) => ({ ...current, name: event.target.value }))}
                  className="w-full rounded-2xl border border-[#e6c8b9] bg-white px-4 py-3 text-[#5b241f] outline-none transition placeholder:text-[#ab8578] focus:border-[#29965a]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="event-type" className="mb-2 block text-sm font-semibold text-[#7b4b42]">Event type</label>
                <select
                  id="event-type"
                  required
                  value={customOrder.eventType}
                  onChange={(event) => setCustomOrder((current) => ({ ...current, eventType: event.target.value }))}
                  className="w-full rounded-2xl border border-[#e6c8b9] bg-white px-4 py-3 text-[#5b241f] outline-none transition focus:border-[#29965a]"
                >
                  <option value="">Choose an event</option>
                  <option>Birthday</option>
                  <option>Wedding</option>
                  <option>Engagement</option>
                  <option>Corporate event</option>
                  <option>Party</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="event-date" className="mb-2 block text-sm font-semibold text-[#7b4b42]">Event date</label>
                <input
                  id="event-date"
                  type="date"
                  required
                  value={customOrder.eventDate}
                  onChange={(event) => setCustomOrder((current) => ({ ...current, eventDate: event.target.value }))}
                  className="w-full rounded-2xl border border-[#e6c8b9] bg-white px-4 py-3 text-[#5b241f] outline-none transition focus:border-[#29965a]"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="event-location" className="mb-2 block text-sm font-semibold text-[#7b4b42]">Event location</label>
                <input
                  id="event-location"
                  required
                  value={customOrder.location}
                  onChange={(event) => setCustomOrder((current) => ({ ...current, location: event.target.value }))}
                  className="w-full rounded-2xl border border-[#e6c8b9] bg-white px-4 py-3 text-[#5b241f] outline-none transition placeholder:text-[#ab8578] focus:border-[#29965a]"
                  placeholder="Area, city, or delivery location"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="special-request" className="mb-2 block text-sm font-semibold text-[#7b4b42]">Special requests</label>
                <textarea
                  id="special-request"
                  rows={4}
                  required
                  value={customOrder.request}
                  onChange={(event) => setCustomOrder((current) => ({ ...current, request: event.target.value }))}
                  className="w-full resize-none rounded-2xl border border-[#e6c8b9] bg-white px-4 py-3 text-[#5b241f] outline-none transition placeholder:text-[#ab8578] focus:border-[#29965a]"
                  placeholder="Tell us about your order, preferred style, flavours, number of guests, colours, or any other details."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25a85a] px-6 py-3.5 font-bold text-white shadow-lg shadow-[#23653b]/20 transition hover:-translate-y-0.5 hover:bg-[#187b40] sm:col-span-2"
              >
                <WhatsAppIcon size={19} />
                Send order request on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {isTreatsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f0e0c]/75 px-4 py-6 backdrop-blur-sm" onClick={closeTreats}>
          <div
            className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/15 bg-[#fff7f3] p-5 text-[#4f1f1b] shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeTreats}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-[#e7c8bd] bg-white text-[#8b4b42] transition hover:bg-[#fff3ee]"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[.28em] text-[#d27c4c] sm:text-sm">Full menu</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-.03em] text-[#5f201f] sm:text-4xl">
                What we <span className="text-[#d67a4b]">make</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#7b4b42] sm:text-base">
                Select a category to view only that gallery. The images stay grouped so the menu feels clear on desktop and swipe-friendly on mobile.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {menuSections.map((section) => {
                const isActive = activeGallerySlug === section.slug

                return (
                  <article
                    key={section.slug}
                    className={`rounded-[1.5rem] border bg-white p-5 shadow-[0_14px_35px_rgba(95,32,31,.08)] transition ${isActive ? 'border-[#d7a24b] ring-2 ring-[#d7a24b]/25' : 'border-[#ead2c8]'}`}
                  >
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#5b241f]">{section.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#7b4b42]">{section.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {section.items.map((item) => (
                        <span key={item} className="rounded-full border border-[#e8cfc4] bg-[#fff8f4] px-3 py-1.5 text-xs font-semibold text-[#7b4b42]">
                          {item}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => openSection(section.slug)}
                      className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${isActive ? 'border border-[#d7a24b] bg-[#f4deb0] text-[#5b241f]' : 'border border-[#cfa993] bg-[#fffaf6] text-[#5b241f] hover:border-[#d7a24b] hover:bg-[#f4deb0]'}`}
                    >
                      View
                      <ChevronRight size={16} />
                    </button>
                  </article>
                )
              })}
            </div>

            <div className="mt-10">
              {!activeGallerySlug ? (
                <div className="rounded-[1.75rem] border border-dashed border-[#e4c7b8] bg-white/70 px-6 py-10 text-center text-[#8b6258]">
                  Click View on any category to reveal its gallery.
                </div>
              ) : (
                <div className="space-y-8">
                  {menuSections
                    .filter((section) => section.slug === activeGallerySlug)
                    .map((section) => (
                      <section key={section.slug} id={`${section.slug}-gallery`} className="scroll-mt-6 rounded-[1.75rem] border border-[#ead2c8] bg-[#fffdfb] p-5 sm:p-6">
                        <div className="flex flex-col gap-3 border-b border-[#f0ddd5] pb-5 sm:flex-row sm:items-end sm:justify-between">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-[.24em] text-[#d27c4c]">Gallery</p>
                            <h3 className="mt-2 font-display text-3xl font-bold text-[#5b241f]">{section.title}</h3>
                          </div>
                          <p className="max-w-2xl text-sm leading-6 text-[#7b4b42]">Tap any card below to send an order enquiry for that exact product.</p>
                        </div>

                        <div className={`mt-6 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:gap-5 lg:overflow-visible lg:pb-0 ${section.galleryClass}`}>
                          {section.gallery.map((item) => (
                            <article
                              key={item.title}
                              className="min-w-[78%] snap-start overflow-hidden rounded-[1.2rem] border border-[#ead2c8] bg-white shadow-[0_12px_35px_rgba(95,32,31,.08)] sm:min-w-0 sm:rounded-[1.5rem]"
                            >
                              <button
                                type="button"
                                onClick={() => openImagePreview(item.image, item.title)}
                                className="block w-full overflow-hidden text-left"
                                aria-label={`View full image for ${item.title}`}
                              >
                                <div className="aspect-[4/3] overflow-hidden bg-[#f2e2d9]">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    loading="lazy"
                                  />
                                </div>
                              </button>
                              <div className="p-4 sm:p-5">
                                <span className="inline-flex rounded-full bg-gradient-to-r from-[#c53b3b] via-[#d96a3a] to-[#d7a24b] px-3 py-1 text-[11px] font-bold uppercase tracking-[.16em] text-white">
                                  {item.category}
                                </span>
                                <h4 className="mt-3 font-display text-lg font-bold text-[#5b241f] sm:mt-4 sm:text-xl lg:text-2xl">{item.title}</h4>
                                <a
                                  href={buildWhatsAppLink(buildInquiryMessage(item.title))}
                                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#d7a24b] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#28130f]/20 transition hover:-translate-y-0.5 hover:bg-[#b57a4a] hover:text-white"
                                >
                                  Order Now!
                                </a>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    ))}
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-[1.6rem] border border-[#d9c5b6] bg-[linear-gradient(110deg,#fff7f0_0%,#f7ead9_100%)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="font-display text-2xl font-bold text-[#5b241f]">Need custom orders?</p>
                <p className="mt-1 text-sm leading-6 text-[#7b4b42]">Tell us about your event and we&apos;ll help bring your special request to life.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomOrderOpen(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#25a85a] px-5 py-3 font-bold text-white shadow-lg shadow-[#23653b]/20 transition hover:-translate-y-0.5 hover:bg-[#187b40]"
              >
                <WhatsAppIcon size={19} />
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
