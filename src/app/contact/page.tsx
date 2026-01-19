'use client';
import { useState } from 'react';
import Head from 'next/head';

export default function Page() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    pincode: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add your form submission logic here (e.g., API call to backend)
    // For now, simulate success
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: '', phone: '', email: '', pincode: '', address: '' });
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Contact CouponDine | Coupons, Deals & Promo Codes Support</title>
        <meta name="description" content="Contact CouponDine for coupon inquiries, exclusive deals, affiliate partnerships, or support. Get verified promo codes, discounts, and cashback offers across US/UK & India." />
        <meta name="keywords" content="coupon contact, deals support, promo codes help, affiliate partnerships, discount codes, CouponDine contact" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://coupondine.com/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact CouponDine | Latest Coupons & Deals" />
        <meta property="og:description" content="Reach out to CouponDine for exclusive coupons, deals, and affiliate questions. Verified discounts for shopping, SaaS, travel & more." />
        <meta property="og:url" content="https://coupondine.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CouponDine" />
        <meta property="og:image" content="https://coupondine.com/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact CouponDine | Coupons & Deals Support" />
        <meta name="twitter:description" content="Get help with promo codes, exclusive deals, or affiliate partnerships at CouponDine." />
        <meta name="twitter:image" content="https://coupondine.com/logo.png" />
        <meta name="twitter:creator" content="@coupondine" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CouponDine" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact CouponDine",
              "description": "Contact page for CouponDine - coupons and deals website",
              "url": "https://coupondine.com/contact",
              "mainEntity": {
                "@type": "Organization",
                "name": "CouponDine",
                "url": "https://coupondine.com",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-XXXXXXXXX",
                  "email": "support@coupondine.com",
                  "contactType": "Customer Support",
                  "availableLanguage": ["English", "Hindi"]
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "IN",
                  "addressRegion": "Delhi"
                }
              }
            }).replace(/</g, '\\u003c')
          }}
        />
      </Head>
   
      <div className="my-20 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-12">
          {/* Contact Details */}
          <div className="w-full md:w-1/2 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-50 p-8 space-y-6 shadow-lg">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">Contact Us</h1>
              <p className="text-lg text-gray-700 mb-6">Need exclusive coupons, affiliate partnerships, or deal support? Reach out for verified promo codes & cashback!</p>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Get in Touch</h2>
              <ul className="space-y-3">
                <li>
                  <strong className="text-orange-600">📧 Email:</strong>
                  <a href="mailto:support@coupondine.com" className="text-blue-600 hover:underline ml-2">support@coupondine.com</a>
                </li>
                <li>
                  <strong className="text-orange-600">📞 Phone:</strong>
                  <a href="tel:+91XXXXXXXXX" className="text-blue-600 hover:underline ml-2">+91-XXXXXXXXX</a>
                </li>
                <li>
                  <strong className="text-orange-600">📍 Location:</strong> Delhi, India (Serving US/UK/IN deals)
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">Response within 24 hours! 🚀</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2 bg-white shadow-2xl p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Send Message for Coupons & Deals</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                required
                className="border border-gray-300 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={handleChange}
                required
                className="border border-gray-300 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all md:col-span-2"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode (for local deals)"
                value={form.pincode}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
              <textarea
                name="address"
                placeholder="Message: Coupon request, affiliate query, or deal suggestion *"
                value={form.address}
                onChange={handleChange}
                required
                rows={4}
                className="border border-gray-300 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all md:col-span-2 resize-vertical"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-8 rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all font-semibold text-lg shadow-lg md:col-span-2"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Get Exclusive Coupon! 🚀'}
              </button>
              {success && (
                <p className="text-green-600 md:col-span-2 text-center mt-4 font-semibold bg-green-50 p-4 rounded-xl">Message sent! We will reply with deals soon. 🎉</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
