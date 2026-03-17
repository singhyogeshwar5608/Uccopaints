import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { addDocument } from '../../firebase/firestore';
import { COMPANY_INFO } from '../../utils/constants';
import { validateEmail, validatePhone } from '../../utils/helpers';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      setSubmitting(true);
      await addDocument('inquiries', {
        ...data,
        subject: 'General Inquiry',
        status: 'new'
      });
      
      // Send WhatsApp notification
      const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Message:* ${data.message}`;
      window.open(`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`, '_blank');
      
      toast.success('Thank you! We will contact you soon.');
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
      color: 'text-primary-blue'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      content: COMPANY_INFO.phone,
      color: 'text-primary-green'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: COMPANY_INFO.email,
      color: 'text-primary-orange'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      content: COMPANY_INFO.businessHours,
      color: 'text-primary-blue'
    }
  ];

  return (
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
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
                  validate: (value) => validatePhone(value) || 'Invalid phone number (10 digits required)'
                })}
                className="input-field"
                placeholder="9876543210"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                rows={5}
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

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 flex items-start space-x-4"
            >
              <div className={`flex-shrink-0 ${info.color}`}>
                <info.icon className="text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">{info.title}</h3>
                <p className="text-gray-600">{info.content}</p>
              </div>
            </motion.div>
          ))}

          {/* Map */}
          <div className="card overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.8!2d76.9!3d29.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDI0JzAwLjAiTiA3NsKwNTQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="256"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="UCCO INDIA Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
