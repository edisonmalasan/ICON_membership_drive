import React, { useState } from 'react';
import { ArrowLeft, Smartphone, Upload, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';

export default function PaymentPage({ onNavigate, memberData, onPaymentComplete }) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentCode, setPaymentCode] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Payment method configurations
  const paymentMethods = {
    maya: {
      name: 'Maya',
      number: '09123456789',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icXIiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iYmxhY2siLz48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iYmxhY2siLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ1cmwoI3FyKSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9ImdyZWVuIj5NQVlBIFFSPC90ZXh0Pjwvc3ZnPg==',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
    },
    gcash: {
      name: 'GCash',
      number: '09876543210',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0icXIyIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiLz48cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9ImJsYWNrIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNxcjIpIi8+PHRleHQgeD0iMTAwIiB5PSIxMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iYmx1ZSI+R0NBU0ggUVI8L3RleHQ+PC9zdmc+',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setReceiptPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedMethod) {
      setMessage({ type: 'error', text: 'Please select a payment method.' });
      return;
    }
    
    if (!paymentCode.trim()) {
      setMessage({ type: 'error', text: 'Please enter the payment reference code.' });
      return;
    }
    
    if (!receiptImage) {
      setMessage({ type: 'error', text: 'Please upload your payment receipt.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('memberId', memberData?.id || 'temp-id');
      formData.append('paymentMethod', selectedMethod);
      formData.append('paymentCode', paymentCode.trim());
      formData.append('receipt', receiptImage);
      formData.append('memberData', JSON.stringify(memberData));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setMessage({
        type: 'success',
        text: `Payment submitted successfully! Your ${paymentMethods[selectedMethod].name} payment is being verified.`
      });

      // Redirect after success
      setTimeout(() => {
        onPaymentComplete({
          method: selectedMethod,
          code: paymentCode,
          status: 'pending'
        });
      }, 3000);

    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Payment submission failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedPayment = paymentMethods[selectedMethod];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => onNavigate('register')}
              className="mr-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex-1 text-center">
              <div className="text-4xl mb-2">💳</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Complete Your Payment
              </h1>
              <p className="text-gray-600">
                {memberData?.name ? `Welcome ${memberData.name}!` : 'Choose your preferred payment method'}
              </p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-purple-600" />
                Select Payment Method
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(paymentMethods).map(([key, method]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedMethod(key)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                      selectedMethod === key
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${method.color}`}>
                        <Smartphone size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{method.name}</h4>
                        <p className="text-sm text-gray-600">{method.number}</p>
                      </div>
                      {selectedMethod === key && (
                        <CheckCircle size={20} className="text-purple-600 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Display */}
            {selectedMethod && (
              <div className={`p-6 rounded-xl ${selectedPayment.bgColor} ${selectedPayment.borderColor} border-2 animate-fade-in`}>
                <div className="text-center">
                  <h4 className={`font-bold text-lg mb-4 ${selectedPayment.textColor}`}>
                    Scan to Pay with {selectedPayment.name}
                  </h4>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="bg-white p-4 rounded-xl shadow-lg">
                      <img 
                        src={selectedPayment.qrCode} 
                        alt={`${selectedPayment.name} QR Code`}
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p className={`text-sm ${selectedPayment.textColor} mb-2`}>
                        Or send to this number:
                      </p>
                      <p className={`text-2xl font-bold ${selectedPayment.textColor} mb-4`}>
                        {selectedPayment.number}
                      </p>
                      <div className={`p-3 rounded-lg bg-white/70 ${selectedPayment.textColor}`}>
                        <p className="text-sm font-medium">Organization Fee</p>
                        <p className="text-xl font-bold">₱500.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Form */}
            {selectedMethod && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                    Payment Reference Code 🔢
                  </label>
                  <input
                    type="text"
                    value={paymentCode}
                    onChange={(e) => setPaymentCode(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-gray-300"
                    placeholder="Enter the reference code from your payment"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm uppercase tracking-wide">
                    Upload Payment Receipt 📄
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="receipt-upload"
                      required
                    />
                    <label htmlFor="receipt-upload" className="cursor-pointer">
                      {receiptPreview ? (
                        <div className="space-y-2">
                          <img 
                            src={receiptPreview} 
                            alt="Receipt preview" 
                            className="mx-auto h-32 w-auto rounded-lg shadow-md"
                          />
                          <p className="text-sm text-gray-600">Click to change image</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload size={32} className="mx-auto text-gray-400" />
                          <p className="text-gray-600">Click to upload your receipt</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      Submit Payment 🚀
                    </>
                  )}
                </button>
              </form>
            )}

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
          </div>

          {/* Footer Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-sm text-gray-600">
              💡 <strong>Note:</strong> Your payment will be verified within 24 hours. 
              You'll receive a confirmation email once approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}