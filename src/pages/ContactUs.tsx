import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { addDocument } from '../firebase/firestore';
import { COMPANY_INFO } from '../utils/constants';
import { validateEmail, validatePhone } from '../utils/helpers';
import SEOHead from '../components/common/SEOHead';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitting(true);
      await addDocument('inquiries', {
        ...data,
        status: 'new'
      });
      
      // Send WhatsApp notification
      const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Subject:* ${data.subject}%0A*Message:* ${data.message}`;
      window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`, '_blank');
      
      toast.success('Thank you for contacting us! We will get back to you soon.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Manufacturing Address',
      content: COMPANY_INFO.manufacturingAddress,
      link: COMPANY_INFO.googleMapsUrl,
      color: 'text-primary-blue'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Head Office',
      content: COMPANY_INFO.headOffice,
      color: 'text-primary-blue'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      content: COMPANY_INFO.phone,
      link: `tel:${COMPANY_INFO.phone}`,
      color: 'text-primary-green'
    },
    {
      icon: FaEnvelope,
      title: 'Email Us',
      content: COMPANY_INFO.email,
      link: `mailto:${COMPANY_INFO.email}`,
      color: 'text-primary-orange'
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      content: COMPANY_INFO.businessHours,
      color: 'text-primary-blue'
    }
  ];

  const socialLinks = [
    { icon: FaFacebook, url: COMPANY_INFO.socialMedia.facebook, color: 'hover:text-blue-600' },
    { icon: FaInstagram, url: COMPANY_INFO.socialMedia.instagram, color: 'hover:text-pink-600' },
    { icon: FaTwitter, url: COMPANY_INFO.socialMedia.twitter, color: 'hover:text-blue-400' },
    { icon: FaYoutube, url: COMPANY_INFO.socialMedia.youtube, color: 'hover:text-red-600' },
  ];

  return (
    <>
      <SEOHead
        title="Contact Us | UCCOPAINTS"
        description="Get in touch with UCCOPAINTS. Contact us for inquiries, quotations, or any questions about our products and services."
        keywords="contact uccopaints, paint inquiry, get quote, customer support"
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-primary-orange to-primary-blue">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative container-custom h-full flex items-center justify-center text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
              <p className="text-xl">We'd love to hear from you. Get in touch with us today!</p>
            </motion.div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="container-custom -mt-16 relative z-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:shadow-xl transition-all"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 ${info.color}`}>
                  <info.icon className="text-3xl" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.link ? (
                  <a href={info.link} className="text-gray-600 hover:text-primary-blue transition-colors">
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form & Map */}
        <div className="container-custom pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="input-field"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'Email is required',
                        validate: (value) => validateEmail(value) || 'Invalid email address'
                      })}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register('phone', {
                        required: 'Phone number is required',
                        validate: (value) => validatePhone(value) || 'Invalid phone number'
                      })}
                      className="input-field"
                      placeholder="9876543210"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register('subject', { required: 'Subject is required' })}
                    className="input-field"
                    placeholder="Product Inquiry"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' }
                    })}
                    className="input-field resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Map & Social */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="card overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.8!2d76.9!3d29.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDI0JzAwLjAiTiA3NsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="384"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="UCCO INDIA Location - Chamrara, Israna, Panipat"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="card p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-6">
                  Stay connected with us on social media for updates, tips, and inspiration.
                </p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 ${social.color} transition-colors`}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
