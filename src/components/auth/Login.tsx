import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Globe2, Brain, Building2, User, HardHat } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Login = () => {
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '' // Empty by default
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'employer' | 'engineer' | 'contractor'>('employer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Special case for the specific email and password
      if (formData.email.toLowerCase() === 'khelsaman@gmail.com' && formData.password === 'K@16121967s') {
        // Use the Authority role credentials for this special case
        await login('Ksaman001@AISECCM.com', 'password123');
      } else {
        // Regular login flow
        await login(formData.email, formData.password);
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: 'employer' | 'engineer' | 'contractor') => {
    setSelectedRole(role);
    // Set the corresponding mock email based on role
    let email = '';
    switch (role) {
      case 'employer':
        email = 'Ksaman001@AISECCM.com';
        break;
      case 'engineer':
        email = 'Isebage001@AISECCM.com';
        break;
      case 'contractor':
        email = 'contractor001@example.com';
        break;
    }
    setFormData(prev => ({
      ...prev,
      email
    }));
    setError(''); // Clear any previous errors
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Column - Branding */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <Brain className="w-10 h-10" />
              <div>
                <h1 className="text-2xl font-bold">KGTPLRC128S</h1>
                <p className="text-sm opacity-80">by K.Saman & I.Sebag Partners</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold">
              AI-Powered
            </h2>
            <h2 className="text-3xl font-bold">
              Variations & Claims
            </h2>
            <h2 className="text-3xl font-bold whitespace-nowrap">
              Project Management System
            </h2>
            <p className="text-lg opacity-80">
              Streamline your Variations & claims process with advanced AI analysis and GTPL RC 128 compliance
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">AI-Driven Analysis</h3>
                <p className="text-sm opacity-70">Advanced insights and predictions for claims</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium">GTPL RC 128 Compliant</h3>
                <p className="text-sm opacity-70">Full adherence to regulatory requirements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="p-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
            </div>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
              <Globe2 className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <button
              type="button"
              onClick={() => handleRoleSelect('employer')}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                selectedRole === 'employer'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <Building2 size={20} />
              <span className="text-sm font-medium">The Authority</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('engineer')}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                selectedRole === 'engineer'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <User size={20} />
              <span className="text-sm font-medium">The Consultant</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('contractor')}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                selectedRole === 'contractor'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <HardHat size={20} />
              <span className="text-sm font-medium">The Contractor</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-12 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Need help? <a href="#" className="text-blue-600 hover:text-blue-700">Contact support</a>
              </p>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              © 2025 KGTPLRC128S by K.Saman & I.Sebag Partners. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;