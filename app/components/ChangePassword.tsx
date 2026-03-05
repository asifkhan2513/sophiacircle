"use client";
import React, { useState, useEffect } from "react";
import { Lock, ShieldCheck, Eye, EyeOff, KeyRound, X, ArrowRight, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";
import api from "../utils/api";

interface ChangePasswordProps {
    onClose: () => void;
}

export default function ChangePassword({ onClose }: ChangePasswordProps) {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { loading: isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (formData.oldPassword === formData.newPassword) {
            toast.error("New password cannot be the same as old password");
            return;
        }

        dispatch(setLoading(true));

        try {
            await api.post("/auth/change-password", {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmNewPassword: formData.confirmNewPassword,
            });

            toast.success("Password updated successfully!");
            onClose();
        } catch (error: any) {
            const message = error.response?.data?.message || "Password update failed";
            toast.error(message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="px-8 py-6 border-b border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                            <Settings size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight">Security Settings</h2>
                            <p className="text-black/40 text-[10px] font-bold uppercase tracking-wider">Change your password</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black/5 rounded-xl transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-black/60 ml-1" htmlFor="oldPassword">
                            Current Password
                        </label>
                        <div className="relative group">
                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={18} />
                            <input
                                id="oldPassword"
                                type={showOldPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-12 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                            >
                                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-black/60 ml-1" htmlFor="newPassword">
                                New Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={18} />
                                <input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-12 pr-12 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-black/60 ml-1" htmlFor="confirmNewPassword">
                                Confirm New Password
                            </label>
                            <div className="relative group">
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={18} />
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
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 mt-4 bg-black text-white font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Update Password <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
