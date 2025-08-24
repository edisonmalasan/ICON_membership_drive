import React from "react";
import { motion } from "motion/react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //get current path
  const currentPath = window.location.pathname;

  const socialMediaLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/sluICON",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  const handleTermsClick = () => {
    navigate(`/terms-policy?returnTo=${currentPath}`);
  };

  const handlePrivacyClick = () => {
    navigate(`/terms-policy?returnTo=${currentPath}`);
  };

  return (
    <footer className="relative bg-neutral-900 border-t border-neutral-100/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ICON Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12">
                <img
                  src="src/assets/landing-page/icon.png"
                  alt="ICON Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">ICON</h3>
                <p className="text-sm text-neutral-400">
                  Integrated Confederacy
                </p>
              </div>
            </div>
            <p className="text-neutral-300 max-w-md">
              Igniting students through technology, creativity, and innovation.
              Join our community and discover your potential in the world of
              computing.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:iconsamcis@slu.edu.ph"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  iconsamcis@slu.edu.ph
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-neutral-300">
                  Saint Louis University
                  <br />
                  Mary Heights Campus
                  <br />
                  Bakakeng 2600 Baguio City, Philippines
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialMediaLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="mt-6">
              <h5 className="text-sm font-medium text-neutral-400 mb-2">
                Quick Links
              </h5>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Register
                </a>
                <a
                  href="#"
                  className="block text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Renewal
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-400 text-center md:text-left">
              © 2025 ICON - Integrated Confederacy. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <button
                onClick={handlePrivacyClick}
                className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={handleTermsClick}
                className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
