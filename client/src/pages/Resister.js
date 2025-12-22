import React from "react";
import {NavLink ,useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Resister = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate=useNavigate();
 
  const handleSubmit = (e) => {
        e.preventDefault();
        try{
         axios.post("/api/v1/auth/register",{username,email,phone,password});
         toast.success('Registered Successfully!');
          navigate('/login');
        }
        catch(err){
          console.log("Registration error:", err);
          if(err.response && err.response.data && err.response.data.message)
          {
            setError(err.response.data.message);
          }
          else if (err.message){
            setError(err.message);
          }
          setTimeout(() => {
            setError("");
          }, 5000);
        }
  }


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Create Account ✨
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Join us and start your journey!
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40 p-6 md:p-8">
          <form
            className="space-y-4"
            onSubmit={handleSubmit
            }
          >
           <Toaster/>
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-500/40 transition"
                placeholder="John Doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/40 transition"
                placeholder="you@example.com"
                 value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Phone Number
              </label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40 transition"
                placeholder="+91 9876543210"
                 value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-pink-400/70 focus:ring-2 focus:ring-pink-500/40 transition"
                placeholder="●●●●●●●●"
                 value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
           
            {/* Terms */}
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                className="h-3.5 w-3.5 rounded border border-white/25 bg-transparent text-cyan-400 focus:ring-0"
              />
              I agree to the{" "}
              <span className="text-cyan-300 hover:text-cyan-200">
                Terms & Conditions
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 via-sky-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/40 hover:brightness-110 active:scale-[0.99] transition"
            >
              Create Account
            </button>
          </form>

          {/* Bottom Text */}
          <p className="mt-4 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <NavLink
              to={"/login"}
              className="font-medium text-cyan-300 hover:text-cyan-200"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resister;
