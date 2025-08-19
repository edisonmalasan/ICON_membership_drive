import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function StudentRegister({ onNavigate, onRegisterComplete }) {
  const [memberData, setMemberData] = useState({
    name: '',
    year: '',
    course: '',
    email: ''
  });
  const [memberCount, setMemberCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadMemberCount();
  }, []);

  const loadMemberCount = async () => {
    try {
      const response = await fetch('/api/student/count');
      const data = await response.json();
      setMemberCount(data.count);
    } catch (error) {
      console.error('Error loading member count:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/student/members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: memberData.name.trim(),
          year: memberData.year,
          course: memberData.course.trim(),
          email: memberData.email.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `Welcome to the organization, ${memberData.name}! You've been successfully registered.`
        });
        
        // Wait a moment then redirect to payment
        setTimeout(() => {
          onRegisterComplete(memberData);
        }, 2000);
        
        loadMemberCount();
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Registration failed'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Network error. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setMemberData({
      ...memberData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => onNavigate('login')}
              className="mr-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex-1 text-center">
              <div className="text-4xl mb-2">🎓</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Join Our Organization!
              </h1>
              <p className="text-gray-600">
                Become part of our amazing college community
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                  Full Name ✨
                </label>
                <input
                  type="text"
                  name="name"
                  value={memberData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-gray-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                  Year Level 📚
                </label>
                <select
                  name="year"
                  value={memberData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-gray-300"
                  required
                >
                  <option value="">Select your year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                  Course/Program 🎯
                </label>
                <input
                  type="text"
                  name="course"
                  value={memberData.course}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-gray-300"
                  placeholder="e.g., Computer Science, Engineering"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                  Email Address 📧
                </label>
                <input
                  type="email"
                  name="email"
                  value={memberData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-gray-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  Join Our Organization! 🚀
                </>
              )}
            </button>
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 animate-fade-in ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          {/* Member Count */}
          <div className="mt-6 text-center p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Users size={20} className="text-purple-600" />
              <span>Total Members: </span>
              <span className="font-bold text-purple-600 text-xl">{memberCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}