"use client";

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setToken, setUser, setError } from '../redux/features/auth/authSlice';
import { RootState } from '../redux/store';
import api from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading: isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const response = await api.post('/auth/login', { email, password });
      // In UserControllers.ts, the login response is:
      // {
      //   success: true,
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   role: user.role,
      //   token
      // }
      const { token, ...user } = response.data;

      dispatch(setToken(token));
      dispatch(setUser(user));

      toast.success(`Welcome back, ${user.name}!`);
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-black">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight mb-2">Welcome Back</h2>
          <p className="text-black/60 font-medium">Please enter your details</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 text-black" htmlFor="email">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={20} />
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-black" htmlFor="password">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-black/40 hover:text-black transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={20} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-12 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-black text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-70 disabled:hover:scale-100"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-black/60 font-medium">
          Don't have an account?{' '}
          <Link href="/signup" className="text-black font-bold hover:underline underline-offset-4 transition-all">
            Join the Circle
          </Link>
        </div>
      </div>
    </div>
  );
}
