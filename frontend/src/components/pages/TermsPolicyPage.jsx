import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function TermsPolicyPage() {
  const [showAcceptButton, setShowAcceptButton] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // get url from query params the default is signup route
  const returnUrl = searchParams.get("returnTo") || "/signup";

  const handleGoBack = () => {
    navigate(returnUrl);
  };

  const handleAccept = () => {
    // nav back to the last page the user opened
    navigate(returnUrl);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // show acept button when user is near the bottom
      if (scrollPosition >= documentHeight - 100) {
        setShowAcceptButton(true);
      } else {
        setShowAcceptButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-gray-700 hover:text-gray-900"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Terms of Service & Privacy Policy
              </h1>
              <p className="text-sm text-gray-500">ICON Membership</p>
            </div>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* about */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg h=12 w-12">
                <img src="/landing-page/icon.png" alt="" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">About ICON</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Welcome to ICON (Integrated Confederacy of Organizations), an
              official student organization within the CIS Department. ICON was
              created with the mission of uniting students, helping members
              excel in their field, and providing fun and interactive activities
              that support both personal and academic growth. By joining ICON,
              you are becoming part of a supportive community that values
              cooperation, engagement, and excellence.
            </p>
          </div>

          {/* membership */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Membership</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Membership in ICON is completely voluntary. By registering, you
              acknowledge that you are joining out of your own free will and
              personal choice, without force or requirement. As an official
              member, you also accept the responsibility of following the
              organization's rules, policies, and guidelines, which are designed
              to ensure safety, inclusivity, and fairness for everyone.
            </p>
          </div>

          {/* information we collect */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Information We Collect
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              During registration, you will be asked to provide the following
              information:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">Full Name</span>
                  <span className="text-gray-700">
                    {" "}
                    – to properly identify and record you in our membership
                    database.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Course and Year Level
                  </span>
                  <span className="text-gray-700">
                    {" "}
                    – to better understand your academic background and to
                    design programs suited to our members' needs.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Email Address
                  </span>
                  <span className="text-gray-700">
                    {" "}
                    – for communication regarding updates, announcements, and
                    organizational matters.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Registration or Renewal Fee
                  </span>
                  <span className="text-gray-700">
                    {" "}
                    – as your contribution to sustain ICON's projects, events,
                    and initiatives.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* purpose of datacollection */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-teal-100 rounded-lg">
                <svg
                  className="h-6 w-6 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Purpose of Data Collection
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              We collect this information for the following purposes:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  To officially record and confirm your membership in ICON.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  To ensure the safety and security of organizational activities
                  by verifying legitimate members.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  To contact you with important announcements, opportunities,
                  and matters that directly concern you.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  To strengthen ICON's activities, workshops, and programs
                  through a better understanding of our membership base.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  To build a community of CIS students who can support and
                  uplift each other academically, socially, and professionally.
                </span>
              </div>
            </div>
          </div>

          {/* privacy commitment */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Privacy Commitment
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Your privacy and safety are very important to us. All information
              collected will be stored securely and will be used strictly for
              official organizational purposes. Access is limited only to
              authorized ICON officers. We will never sell, rent, or disclose
              your personal data to unauthorized third parties.
            </p>
          </div>

          {/*data privacy act */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <svg
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Compliance with the Data Privacy Act of 2012
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              ICON respects your rights under Republic Act No. 10173, also known
              as the Data Privacy Act of 2012. By submitting your information,
              you acknowledge that:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  Your personal data shall be collected, stored, and processed
                  only for the legitimate purposes stated above.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  Your data shall be kept with strict confidentiality and
                  safeguarded using reasonable organizational, physical, and
                  technical measures.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  You have the right to access, correct, or withdraw your
                  personal information, in line with the provisions of the Data
                  Privacy Act.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">
                  ICON shall abide by the principles of transparency, legitimate
                  purpose, and proportionality in handling your data.
                </span>
              </div>
            </div>
          </div>

          {/* consent section */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Consent</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              By completing your registration, you confirm that all information
              you provide is accurate and true, that you willingly join ICON as
              your personal choice, and that you consent to the collection and
              use of your information in accordance with this Terms of Service &
              Privacy Policy and the Data Privacy Act of 2012.
            </p>
          </div>

          {/* commitment */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Commitment</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              ICON is committed to ensuring that your membership is not only
              meaningful and beneficial, but also safe and compliant with the
              laws that protect your rights as an individual.
            </p>
          </div>

          {/* ccept button */}
          <AnimatePresence>
            {showAcceptButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900">
                      Ready to Join ICON?
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    By clicking "Accept", you confirm that you
                    have read and understood all the Terms of Service & Privacy Policy above.
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    You will be redirected back to{" "}
                    {returnUrl === "/"
                      ? "the login page"
                      : returnUrl === "/signup"
                      ? "the signup page"
                      : "the previous page"}
                    .
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={handleAccept}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer"
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
