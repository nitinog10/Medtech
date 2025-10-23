'use client'

import { useState } from 'react'
import { 
  Heart, 
  Stethoscope, 
  Shield, 
  Users, 
  Clock, 
  Phone, 
  MapPin, 
  Star,
  BookOpen,
  Download,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import EbookModal from './components/EbookModal'
import ScreenshotProtection from './components/ScreenshotProtection'

export default function Home() {
  const [isEbookModalOpen, setIsEbookModalOpen] = useState(false)

  const services = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Emergency Care",
      description: "24/7 emergency medical services with state-of-the-art equipment and experienced staff."
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-blue-500" />,
      title: "General Medicine",
      description: "Comprehensive primary care services for all age groups with personalized treatment plans."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Surgery",
      description: "Advanced surgical procedures using minimally invasive techniques and robotic assistance."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Pediatrics",
      description: "Specialized care for children with child-friendly environment and expert pediatricians."
    },
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: "Cardiology",
      description: "Complete heart care services including diagnostics, treatment, and rehabilitation."
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-500" />,
      title: "Neurology",
      description: "Advanced neurological care with cutting-edge diagnostic and treatment technologies."
    }
  ]

  const stats = [
    { number: "500+", label: "Expert Doctors" },
    { number: "50+", label: "Medical Specialties" },
    { number: "1000+", label: "Beds Available" },
    { number: "99%", label: "Patient Satisfaction" }
  ]

  return (
    <ScreenshotProtection
      enableWatermark={false}
      enableDevToolsDetection={true}
      enableKeyboardProtection={true}
      enableContextMenuProtection={true}
    >
      <div className="min-h-screen bg-white screenshot-protected protected-content no-capture">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">MedTech Hospital</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Advanced Healthcare
                <span className="block text-blue-600">Solutions</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience world-class medical care with cutting-edge technology, 
                expert doctors, and compassionate service. Your health is our priority.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Medical Guide</h3>
                  <p className="text-gray-600 mb-6">
                    Download our comprehensive guide to modern healthcare practices and treatments.
                  </p>
                  <button 
                    onClick={() => setIsEbookModalOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    View eBook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive healthcare services with the latest medical technology 
              and expert medical professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg card-hover">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose MedTech Hospital?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Emergency Care</h3>
                    <p className="text-gray-600">Round-the-clock emergency services with immediate response and expert care.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Technology</h3>
                    <p className="text-gray-600">State-of-the-art medical equipment and cutting-edge treatment methods.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Medical Team</h3>
                    <p className="text-gray-600">Highly qualified doctors and medical professionals with years of experience.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient-Centered Care</h3>
                    <p className="text-gray-600">Personalized treatment plans focused on individual patient needs and comfort.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Patient Testimonials</h3>
                  <blockquote className="text-lg text-gray-700 italic mb-6">
                    "The care I received at MedTech Hospital was exceptional. The doctors were knowledgeable, 
                    the staff was caring, and the facilities were top-notch. I highly recommend this hospital."
                  </blockquote>
                  <div className="text-sm text-gray-600">
                    <div className="font-semibold">Sarah Johnson</div>
                    <div>Patient</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
              <p className="text-xl text-gray-300 mb-8">
                Get in touch with us for appointments, inquiries, or emergency services.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="font-semibold">Emergency Line</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-300">123 Medical Center Drive, Healthcare City, HC 12345</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="font-semibold">Hours</div>
                    <div className="text-gray-300">24/7 Emergency Services</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MedTech Hospital</span>
              </div>
              <p className="text-gray-400">
                Providing exceptional healthcare services with compassion and excellence.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Emergency Care</li>
                <li>General Medicine</li>
                <li>Surgery</li>
                <li>Pediatrics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div>+1 (555) 123-4567</div>
                <div>info@medtechhospital.com</div>
                <div>123 Medical Center Drive</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MedTech Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Ebook Modal */}
      <EbookModal 
        isOpen={isEbookModalOpen} 
        onClose={() => setIsEbookModalOpen(false)} 
      />
      </div>
    </ScreenshotProtection>
  )
}
