import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import {BarLoader,} from "react-spinners";
import ForgotPasswordDialog from "../components/ForgotPassword";


const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidden, setHidden] = React.useState(true);
  const Navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  /* Backend URL */
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  /* handle submit function */
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    toast.success("Login successful!");

    setTimeout(() => {
      Navigate("/chat");
    }, 1500);

  } catch (error) {
    console.error(error);
    toast.error(error.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 flex items-center justify-center px-4">
      {/* Background glow circles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
      </div>
      <Toaster />
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <BarLoader loading={loading} color="#22c55e" />
      </div>
        
      <ForgotPasswordDialog
        isOpen={open}
        onClose={() => setOpen(false)}
      />
        
      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Welcome back 👋
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Login to continue to your <span className="font-medium">AI</span>{" "}
            assistant
          </p>
        </div>
        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40 p-6 md:p-8">
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-200"
              >
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/40 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-slate-200"
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] font-medium text-cyan-300 hover:text-cyan-200"
                  onClick={() => setOpen(true)}
                >
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                type={hidden ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-500/40 transition"
              />
            </div>
            <div
              className="absolute top-[121px] right-[37px]"
              onClick={(e) => {
                if (password) setHidden(!hidden);
              }}
            >
              {hidden ? (
                <EyeOff size={20} color={password ? "#60828a" : "#4a4545"} />
              ) : (
                <Eye size={20} color={password ? "#60828a" : "#4a4545"} />
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/40 hover:brightness-110 active:scale-[0.99] transition"
            >
              login
            </button>
          </form>

          {/* Bottom text */}
          <p className="mt-4 text-center text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <NavLink
              to={"/register"}
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;