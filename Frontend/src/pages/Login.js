import React from 'react'
import { NavLink } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import toast ,{Toaster} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [hidden, setHidden]= React.useState(true);
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "email": userEmail,
          "password": userPassword
    })});
       
      if(res.ok){
        toast.success("Login Successful!");
        setTimeout(() => {
          navigate("/ChatPage");
        }, 1000);
      }
  }
  catch (error) {
      console.error("Login error:", error);
  }
}
  return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-zinc-900 flex items-center justify-center px-4">
      {/* Background glow circles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Title */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Welcome back 👋
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Login to continue to your dashboard
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40 p-6 md:p-8">
          {/* Social buttons */}
          <div className="flex gap-3 mb-5">
            <button className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs md:text-sm font-medium text-slate-100 hover:bg-white/10 transition">
              Continue with Google
            </button>
            <button className="flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs md:text-sm font-medium text-slate-100 hover:bg-white/10 transition">
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
              Or sign in with email
            </span>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <Toaster/>
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
                  value={userEmail}
                onChange={(e)=> setUserEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/40 transition"
                  placeholder="you@example.com"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-400">
                  @gmail.com
                </span>
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
                >
                  Forgot?
                </button>
              </div>
              <input
                id="password"
                type={hidden ? "password" : "text"}
                required
                value={userPassword}
                onChange={(e)=> setUserPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 outline-none focus:border-purple-400/70 focus:ring-2 focus:ring-purple-500/40 transition"
              />
              <div className="absolute top-[202px] right-[25px] lg:top-[200px] lg:right-[30px] mt-9 mr-4 cursor-pointer " onClick={()=>setHidden(!hidden)}>
               {hidden ? <Eye color="#838181"/>: <EyeOff color="#838181"/>}
              </div>
            </div>

  
            {/* Submit button */}
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/40 hover:brightness-110 active:scale-[0.99] transition"
            >
              Sign in
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

}

export default Login
