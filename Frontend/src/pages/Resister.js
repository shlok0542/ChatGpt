import React from "react";
import {NavLink ,useNavigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { BarLoader } from "react-spinners";
const Resister = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [hidden, setHidden] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate=useNavigate();
 

    /* Backend URL */
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  /* handle submit function */
  const handleSubmit = async (e) => {
  e.preventDefault();
  if(password.length<6){
    toast.error("Password must be at least 6 characters long");
    return;
  }
  setLoading(true);
 
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    toast.success("Registration successful!");

    setTimeout(() => {
      navigate("/login");
    }, 1500);

  } catch (err) {
    console.error(err);
    toast.error(err.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
      </div>
   <Toaster/>
   <div className="fixed top-10 md:top-20 left-1/2 -translate-x-1/2 z-50">
  <BarLoader loading={loading} color="#22c55e"/>
</div>
      <div className="relative z-10 w-full max-w-md ">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-4xl font-semibold tracking-tight text-white">
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
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-200">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-500/40 transition"
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
                 value={password}
                onChange={(e) => setPassword(e.target.value)}          />
              <div className="absolute top-[207px] md:top-[200px] right-[40px]" onClick={(e)=>{if(password)setHidden(!hidden)}}>
              {hidden ?   <EyeOff color={password?"#60828a":"#4a4545"} /> : <Eye color={password?"#60828a":"#4a4545"} />}
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
