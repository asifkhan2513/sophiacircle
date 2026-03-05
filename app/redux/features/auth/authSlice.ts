import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  token:
    typeof window !== "undefined" && localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("token", action.payload);
        } else {
          localStorage.removeItem("token");
        }
      }
    },
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("user");
        }
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setLoading, setToken, setUser, setError, logout } =
  authSlice.actions;
export default authSlice.reducer;
