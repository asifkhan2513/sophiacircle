"use client";

import React, { useState, useEffect } from "react";
import { Lock, ShieldCheck, Eye, EyeOff, KeyRound, X, ArrowRight, Settings, User, MapPin, Calendar, Users } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/features/auth/authSlice";
import { RootState } from "../redux/store";
import api from "../utils/api";

interface ProfileSettingsProps {
    onClose: () => void;
}

export default function ProfileSettings({ onClose }: ProfileSettingsProps) {
    const { user } = useSelector((state: RootState) => state.auth);
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        age: user?.age || "",
        gender: user?.gender || "",
        city: user?.city || "",
        country: user?.country || "",
    });

    const [passwordData, setPasswordData] = useState({
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

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfileData({ ...profileData, [e.target.id]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));

        try {
            const response = await api.post("/auth/update-profile", profileData);
            dispatch(setUser(response.data.user));
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Profile update failed");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            toast.error("New passwords do not match");
            return;
        }

        dispatch(setLoading(true));

        try {
            await api.post("/auth/change-password", {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
                confirmNewPassword: passwordData.confirmNewPassword,
            });

            toast.success("Password updated successfully!");
            setPasswordData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Password update failed");
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
            <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-8 py-6 border-b border-black/5 flex items-center justify-between bg-[#84B179] shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-800 rounded-xl flex items-center justify-center text-white">
                            <Settings size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black tracking-tight">Settings</h2>
                            <p className="text-black text-[10px] font-bold uppercase tracking-wider">Manage your profile & security</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-black/5 rounded-xl transition-colors hover:cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex px-8 border-b border-black/5 shrink-0">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={` px-6 py-4 text-sm font-bold transition-all relative ${activeTab === 'profile' ? 'text-black' : 'text-black/40'} hover:cursor-pointer`}
                    >
                        Profile Details
                        {activeTab === 'profile' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('password')}
                        className={` px-6 py-4 text-sm font-bold transition-all relative ${activeTab === 'password' ? 'text-black' : 'text-black/40'} hover:cursor-pointer`}
                    >
                        Security & Privacy
                        {activeTab === 'password' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-t-full" />}
                    </button>
                </div>

                {/* Body */}
                <div className="flex-grow overflow-y-auto p-8">
                    {activeTab === 'profile' ? (
                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-black/60 ml-1" htmlFor="name">
                                        Full Name
                                    </label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={18} />
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Your Name"
                                            value={profileData.name}
                                            onChange={handleProfileChange}
                                            className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-black/60 ml-1" htmlFor="age">
                                        Age
                                    </label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={18} />
                                        <input
                                            id="age"
                                            type="number"
                                            placeholder="25"
                                            value={profileData.age}
                                            onChange={handleProfileChange}
                                            className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-black/60 ml-1" htmlFor="gender">
                                        Gender
                                    </label>
                                    <div className="relative group">
                                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={18} />
                                        <select
                                            id="gender"
                                            value={profileData.gender}
                                            onChange={handleProfileChange}
                                            className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium appearance-none"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer_not_to_say">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-black/60 ml-1" htmlFor="city">
                                        City
                                    </label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={18} />
                                        <input
                                            id="city"
                                            type="text"
                                            placeholder="Mumbai"
                                            value={profileData.city}
                                            onChange={handleProfileChange}
                                            className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-black/60 ml-1" htmlFor="country">
                                        Country
                                    </label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 group-focus-within:text-black transition-colors" size={18} />
                                        <input
                                            id="country"
                                            type="text"
                                            placeholder="India"
                                            value={profileData.country}
                                            onChange={handleProfileChange}
                                            className="w-full pl-12 pr-4 py-4 bg-black/5 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full text-black py-5 bg-[#84B179] font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl "
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-3 border-white border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Save Changes <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
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
                                        value={passwordData.oldPassword}
                                        onChange={handlePasswordChange}
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
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
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
                                            value={passwordData.confirmNewPassword}
                                            onChange={handlePasswordChange}
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
                                className="w-full py-5 mt-4 bg-[#84B179] text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-3 border-black border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Update Password <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
