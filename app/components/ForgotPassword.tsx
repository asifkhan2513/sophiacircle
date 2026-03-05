"use client";

import React, { useState } from "react";
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff, KeyRound, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { siteConfig } from "../config";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";
import api from "../utils/api";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { loading: isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email) {
            toast.error("Please enter your email");
            return;
        }

        dispatch(setLoading(true));
        try {
            await api.post("/auth/forget-password", { email: formData.email });
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to send OTP";
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!formData.otp) {
            toast.error("Please enter the OTP");
            return;
        }

        dispatch(setLoading(true));

        try {
            await api.post("/auth/reset-password", {
                email: formData.email,
                otp: formData.otp,
                newPassword: formData.newPassword,
                confirmNewPassword: formData.confirmNewPassword,
            });

            toast.success("Password reset successfully! Please login.");
            router.push("/login");
        } catch (error: any) {
            const message = error.response?.data?.message || "Password reset failed";
            dispatch(setError(message));
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-black/5">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden mb-6 shadow-xl">
                        <Image
                            src={siteConfig.logo}
                            alt="Logo"
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width={100}
                            height={100}
                        />
                    </div>
                    <h2 className="text-4xl font-black tracking-tight mb-2 text-center">
                        {step === 1 ? "Forgot Password" : "Reset Password"}
                    </h2>
                    <p className="text-black/60 font-medium text-center">
                        {step === 1
                            ? "No worries, we'll send you reset instructions"
                            : `We've sent a code to ${formData.email}`}
                    </p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1 text-black" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors"
                                    size={20}
                                />
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-black text-white font-bold rounded-[1.5rem] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Send Reset Link <ArrowRight size={22} />
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold ml-1 text-black" htmlFor="otp">
                                Verification Code (OTP)
                            </label>
                            <div className="relative group">
                                <KeyRound
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors"
                                    size={20}
                                />
                                <input
                                    id="otp"
                                    type="text"
                                    placeholder="Enter 6-digit code"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    required
                                    maxLength={6}
                                    className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium tracking-[0.5em] text-center"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold ml-1 text-black" htmlFor="newPassword">
                                New Password
                            </label>
                            <div className="relative group">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors"
                                    size={20}
                                />
                                <input
                                    id="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.newPassword}
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
                            <label className="text-sm font-bold ml-1 text-black" htmlFor="confirmNewPassword">
                                Confirm New Password
                            </label>
                            <div className="relative group">
                                <ShieldCheck
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors"
                                    size={20}
                                />
                                <input
                                    id="confirmNewPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.confirmNewPassword}
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

                        <div className="md:col-span-2 flex flex-col gap-4 mt-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-black text-white font-bold rounded-[1.5rem] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                            >
                                {isLoading ? (
                                    <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Reset Password <ArrowRight size={22} />
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-black/60 font-bold flex items-center justify-center gap-2 hover:text-black transition-all"
                            >
                                <ArrowLeft size={18} /> Use a different email
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-10 text-center text-black/60 font-medium">
                    Remembered your password?{" "}
                    <Link
                        href="/login"
                        className="text-black font-bold hover:underline underline-offset-4 transition-all"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
