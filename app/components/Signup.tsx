"use client";

import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, Globe, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { siteConfig } from '../config';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        city: '',
        country: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.email === 'user@gmail.com') {
            toast.error('This email is reserved');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setIsLoading(true);

        // Simulate registration
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            if (users.some((u: any) => u.email === formData.email)) {
                toast.error('Email already registered');
                setIsLoading(false);
                return;
            }

            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                city: formData.city,
                country: formData.country,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            toast.success('Account created successfully! Please login.');
            router.push('/login');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-black/5">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 shadow-xl">
                        <img src={siteConfig.logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-4xl font-black tracking-tight mb-2 text-center">Join Sophia Circle</h2>
                    <p className="text-black/60 font-medium text-center">Start your philosophical journey today</p>
                </div>

                <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1 text-black" htmlFor="name">Full Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1 text-black" htmlFor="email">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1 text-black" htmlFor="city">City</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                id="city"
                                type="text"
                                placeholder="Ex: Athens"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1 text-black" htmlFor="country">Country</label>
                        <div className="relative group">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                id="country"
                                type="text"
                                placeholder="Ex: Greece"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1 text-black" htmlFor="password">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
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

                    <div className="space-y-2">
                        <label className="text-sm font-bold ml-1 text-black" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="relative group">
                            <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-12 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-black text-white font-bold rounded-[1.5rem] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {isLoading ? (
                                <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account <ArrowRight size={22} />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-10 text-center text-black/60 font-medium">
                    Already have an account?{' '}
                    <Link href="/login" className="text-black font-bold hover:underline underline-offset-4 transition-all">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
