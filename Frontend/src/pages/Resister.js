import React from "react";
import {NavLink ,useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from "lucide-react";

const Resister = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [hidden, setHidden]= React.useState(true);
  const navigate= useNavigate();
  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "name": username,
          "email": email,
          "password": password
         })});
      toast.success("Registration Successful!");
      navigate("/login");
      console.log(res);
}
catch (error) {
      toast.error("Registration Failed. Please try again.");
      console.error("Registration error:", error);
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
                Name
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
                Email
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

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Password
              </label>
              <input
                type={hidden ? "password" : "text"}
                required
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-pink-400/70 focus:ring-2 focus:ring-pink-500/40 transition"
                placeholder="●●●●●●●●"
                 value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute top-[222px] right-[25px] lg:top-[215px] lg:right-[30px] mt-9 mr-4 cursor-pointer " onClick={()=>setHidden(!hidden)}>
               {hidden ? <Eye color="#838181"/>: <EyeOff color="#838181"/>}
              </div>
            </div>
           
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
