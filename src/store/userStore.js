import { create } from "zustand";
import { getUserDataByToken, loginApi } from "../utils/allapi/auth";
import api from "../utils/api";

export const useUserStore = create((set) => ({
	user: null,
	isLoading: false,
	error: null,
	activeTab: "",
	setActiveTab:(val) => set({active: val}),
	setError: (err) => set({ error: err }),
	setLoading: (loading) => set({ isLoading: loading }),
	setUser: (user) => set({ user: user }),
	setLogout: (logout) => {
		set({ user: null });
        localStorage.removeItem("authToken");
	},
}));
