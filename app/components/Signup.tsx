"use client";
import Google from "@/public/assests/googleicon.svg"
import React, { useState } from "react";
import {
    Mail,
    Lock,
    User,
    ArrowRight,
    ShieldCheck,
    Eye,
    EyeOff,
    KeyRound,
    ArrowLeft,
    Handshake,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { siteConfig } from "../config";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setUser, setToken } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";
import api from "../utils/api";
import { GoogleLogin } from '@react-oauth/google';

export default function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",
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
            await api.post("/auth/sendotp", { email: formData.email });
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (error: any) {
            const message = error.response?.data?.message || "Failed to send OTP";
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!formData.otp) {
            toast.error("Please enter the OTP");
            return;
        }

        dispatch(setLoading(true));

        try {
            await api.post("/auth/signup", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                otp: formData.otp,
            });

            toast.success("Account created successfully! Please login.");
            router.push("/login");
        } catch (error: any) {
            const message = error.response?.data?.message || "Registration failed";
            dispatch(setError(message));
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        dispatch(setLoading(true));
        try {
            const res = await api.post("/auth/google", {
                idToken: credentialResponse.credential,
            });
            const { token, user } = res.data;
            dispatch(setToken(token));
            dispatch(setUser(user));
            toast.success("Google signup successful!");
            router.refresh();
            router.push("/dashboard");
        } catch (error: any) {
            const message = error.response?.data?.message || "Google signup failed";
            dispatch(setError(message));
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white p-8 md:p-8 rounded-[3rem] shadow-2xl border border-black/5">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-full overflow-hidden  shadow-xl animate-spin">
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
                        {step === 1 ? "Join Sophia Circle" : "Verify Your Account"}
                    </h2>
                    <p className="text-black/60 font-medium text-center">
                        {step === 1
                            ? "Start your philosophical journey today"
                            : `We've sent a code to ${formData.email}`}
                    </p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-bold ml-1 text-black"
                                htmlFor="email"
                            >
                                Email Address <span className="text-red-800 pl-1">*</span>
                            </label>
                            <div className="relative group">
                                <Mail
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black group-focus-within:text-black transition-colors"
                                    size={20}
                                />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="yourmail@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-black/5 border-2 border-black/20 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-[#004445] text-white rounded-3xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-2xl disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Send Verification Code <ArrowRight size={22} />
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <form
                        onSubmit={handleSignup}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="space-y-2 md:col-span-2">
                            <label
                                className="text-sm font-bold ml-1 text-black"
                                htmlFor="name"
                            >
                                Full Name
                            </label>
                            <div className="relative group">
                                <User
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors"
                                    size={20}
                                />
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

                        <div className="space-y-2 md:col-span-2">
                            <label
                                className="text-sm font-bold ml-1 text-black"
                                htmlFor="otp"
                            >
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
                            <label
                                className="text-sm font-bold ml-1 text-black"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative group">
                                <Lock
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors"
                                    size={20}
                                />
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
                            <label
                                className="text-sm font-bold ml-1 text-black"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <ShieldCheck
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors"
                                    size={20}
                                />
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
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
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
                                        Finish Signup <ArrowRight size={22} />
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="text-black/60 font-bold flex items-center justify-center gap-2 hover:text-black transition-all"
                            >
                                <ArrowLeft size={18} /> Use different email
                            </button>
                        </div>

                    </form>
                )}

                <div className="flex items-center justify-center mt-6 mb-4">
                    <div className="h-px bg-black/10 w-full"></div>
                    <span className="px-4 text-sm text-black/40 font-bold whitespace-nowrap">OR</span>
                    <div className="h-px bg-black/10 w-full"></div>
                </div>

                <div className="flex justify-center mt-2 overflow-hidden rounded-3xl">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            toast.error('Google Sign-In Failed');
                        }}
                        theme="filled_black"
                        size="large"
                        shape="pill"
                        text="signup_with"
                        width="300"
                    />
                </div>

                <div className="mt-8 text-center text-black/60 font-medium">
                    Already have an account?{" "}
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
