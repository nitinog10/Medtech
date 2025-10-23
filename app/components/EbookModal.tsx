'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X, Download, Loader2 } from 'lucide-react'
import ScreenshotProtection from './ScreenshotProtection'
import ContentObfuscator from './ContentObfuscator'
import AdvancedSecurity from './AdvancedSecurity'
import CanvasProtection from './CanvasProtection'
import AggressiveProtection from './AggressiveProtection'

interface FormData {
  fullName: string
  email: string
  mobileNumber: string
  collegeName: string
  collegeYear: string
  branch: string
  collegeCity: string
  collegeState: string
}

interface EbookModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EbookModal({ isOpen, onClose }: EbookModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showEbook, setShowEbook] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
        setTimeout(() => {
          setShowEbook(true)
        }, 2000)
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      reset()
      setIsSuccess(false)
      setShowEbook(false)
      onClose()
    }
  }

  const handleBackToForm = () => {
    setShowEbook(false)
    setIsSuccess(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {showEbook ? 'Medical Guide eBook' : 'View Medical Guide'}
              </h2>
              <p className="text-sm text-gray-600">
                {showEbook ? 'Comprehensive healthcare information' : 'Fill in your details to access the eBook'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Success Message */}
        {isSuccess && !showEbook && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              Your information has been submitted successfully. Loading the eBook...
            </p>
            <div className="text-sm text-gray-500">
              Please wait while we prepare your content...
            </div>
          </div>
        )}

        {/* eBook Content */}
        {showEbook && (
          <AggressiveProtection enableAggressiveMode={true}>
            <AdvancedSecurity>
              <ScreenshotProtection
                enableWatermark={true}
                enableDevToolsDetection={true}
                enableKeyboardProtection={true}
                enableContextMenuProtection={true}
              >
                <ContentObfuscator
                  enableDynamicObfuscation={true}
                  obfuscationInterval={2000}
                >
                  <CanvasProtection enableCanvasRendering={true}>
                    <div className="p-6 max-h-[80vh] overflow-y-auto ebook-content security-protected aggressive-protection">
                  <div className="mb-4">
                    <button
                      onClick={handleBackToForm}
                      className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Close eBook
                    </button>
                  </div>
                  
                  <div className="prose max-w-none">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                      Complete Medical Guide for Healthcare Professionals
                    </h1>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                      <h2 className="text-xl font-semibold text-blue-800 mb-3">Table of Contents</h2>
                      <ul className="text-blue-700 space-y-2">
                        <li>• Chapter 1: Modern Healthcare Practices</li>
                        <li>• Chapter 2: Emergency Response Procedures</li>
                        <li>• Chapter 3: Preventive Care and Wellness</li>
                        <li>• Chapter 4: Technology in Healthcare</li>
                        <li>• Chapter 5: Patient Safety and Quality Care</li>
                        <li>• Chapter 6: Medical Ethics and Communication</li>
                        <li>• Chapter 7: Healthcare Management</li>
                      </ul>
                    </div>

                    <div className="space-y-8">
                      <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                          Chapter 1: Modern Healthcare Practices
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Modern healthcare has evolved significantly with the integration of technology, evidence-based medicine, 
                          and patient-centered care. This comprehensive chapter covers the latest practices in medical diagnosis, 
                          treatment protocols, and preventive care strategies that are shaping the future of healthcare delivery.
                        </p>
                        
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Components of Modern Healthcare:</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="font-semibold text-green-800 mb-2">Evidence-Based Medicine</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Clinical research integration</li>
                              <li>• Data-driven decision making</li>
                              <li>• Systematic reviews and meta-analyses</li>
                              <li>• Quality improvement initiatives</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-800 mb-2">Patient-Centered Care</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Individualized treatment plans</li>
                              <li>• Shared decision making</li>
                              <li>• Cultural competency</li>
                              <li>• Patient education and engagement</li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                          Chapter 2: Emergency Response Procedures
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          In emergency situations, every second counts. This comprehensive guide provides step-by-step procedures 
                          for handling various medical emergencies, from cardiac events to trauma cases, ensuring optimal patient outcomes.
                        </p>
                      </section>

                      <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                          Chapter 3: Preventive Care and Wellness
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Prevention is the cornerstone of modern healthcare. This section focuses on proactive health management, 
                          lifestyle modifications, and regular health screenings that can prevent many diseases and improve overall quality of life.
                        </p>
                      </section>

                      <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                          Chapter 4: Healthcare Technology Integration
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          The integration of advanced technology in healthcare has revolutionized patient care, diagnosis, and treatment. 
                          This chapter explores cutting-edge technologies and their practical applications in modern medical practice.
                        </p>
                      </section>

                      <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                          Chapter 5: Patient Safety and Quality Care
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Ensuring patient safety is the fundamental responsibility of all healthcare professionals. This chapter outlines 
                          best practices, safety protocols, and quality improvement strategies essential for delivering safe, effective care.
                        </p>
                      </section>

                      <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                          Chapter 6: Medical Ethics and Communication
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Effective communication and ethical practice form the foundation of quality healthcare. This chapter addresses 
                          the principles of medical ethics, patient communication strategies, and professional conduct standards.
                        </p>
                      </section>

                      <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                          Chapter 7: Healthcare Management and Leadership
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          Effective healthcare management is crucial for delivering quality patient care while maintaining operational 
                          efficiency. This final chapter covers leadership principles, team management, and healthcare administration.
                        </p>
                      </section>
                    </div>

                    <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">📚 Conclusion</h3>
                      <p className="text-blue-700 text-sm mb-4">
                        This comprehensive medical guide provides essential knowledge for healthcare professionals at all levels. 
                        The integration of modern practices, technology, and ethical considerations creates a framework for 
                        delivering exceptional patient care in today's evolving healthcare landscape.
                      </p>
                      <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
                        <p className="text-blue-800 text-sm font-medium">
                          <strong>Important Notice:</strong> This guide is for educational purposes only and should not replace 
                          professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare 
                          professionals for medical decisions and treatments.
                        </p>
                      </div>
                    </div>
                  </div>
                    </div>
                  </CanvasProtection>
                </ContentObfuscator>
              </ScreenshotProtection>
            </AdvancedSecurity>
          </AggressiveProtection>
        )}

        {/* Form */}
        {!isSuccess && (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                {...register('fullName', { 
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number *
              </label>
              <input
                type="tel"
                id="mobileNumber"
                {...register('mobileNumber', { 
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[+]?[\d\s\-\(\)]{10,}$/,
                    message: 'Invalid mobile number'
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your mobile number"
                disabled={isSubmitting}
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>
              )}
            </div>

            {/* College Name */}
            <div>
              <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700 mb-2">
                College Name *
              </label>
              <input
                type="text"
                id="collegeName"
                {...register('collegeName', { 
                  required: 'College name is required',
                  minLength: { value: 3, message: 'College name must be at least 3 characters' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your college name"
                disabled={isSubmitting}
              />
              {errors.collegeName && (
                <p className="mt-1 text-sm text-red-600">{errors.collegeName.message}</p>
              )}
            </div>

            {/* College Year */}
            <div>
              <label htmlFor="collegeYear" className="block text-sm font-medium text-gray-700 mb-2">
                College Year *
              </label>
              <select
                id="collegeYear"
                {...register('collegeYear', { required: 'College year is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="">Select your college year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
              {errors.collegeYear && (
                <p className="mt-1 text-sm text-red-600">{errors.collegeYear.message}</p>
              )}
            </div>

            {/* Branch */}
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
                Branch *
              </label>
              <select
                id="branch"
                {...register('branch', { required: 'Branch is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="">Select your branch</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">Chemical Engineering</option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Medicine">Medicine</option>
                <option value="Nursing">Nursing</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Other">Other</option>
              </select>
              {errors.branch && (
                <p className="mt-1 text-sm text-red-600">{errors.branch.message}</p>
              )}
            </div>

            {/* College City */}
            <div>
              <label htmlFor="collegeCity" className="block text-sm font-medium text-gray-700 mb-2">
                College City *
              </label>
              <input
                type="text"
                id="collegeCity"
                {...register('collegeCity', { 
                  required: 'College city is required',
                  minLength: { value: 2, message: 'City name must be at least 2 characters' }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your college city"
                disabled={isSubmitting}
              />
              {errors.collegeCity && (
                <p className="mt-1 text-sm text-red-600">{errors.collegeCity.message}</p>
              )}
            </div>

            {/* College State */}
            <div>
              <label htmlFor="collegeState" className="block text-sm font-medium text-gray-700 mb-2">
                College State *
              </label>
              <select
                id="collegeState"
                {...register('collegeState', { required: 'College state is required' })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="">Select your college state</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Other">Other</option>
              </select>
              {errors.collegeState && (
                <p className="mt-1 text-sm text-red-600">{errors.collegeState.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  View eBook
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to receive educational content and updates from MedTech Hospital.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
