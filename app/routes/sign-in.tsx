import { Link } from "react-router";

export default function SignIn() {
   return (
      <div className="w-full max-w-sm mx-auto px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <h1 className="font-serif text-4xl text-ink text-center mb-2">Welcome back</h1>
         <p className="text-center text-ink/60 text-sm mb-10">Sign in to your Nestaway account to continue</p>

         <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
               <label className="block text-sm font-medium text-ink mb-1.5">Email address</label>
               <input type="email" placeholder="name@example.com" className="w-full rounded-xl border border-stone/50 px-4 py-3 text-sm outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all" />
            </div>
            <div>
               <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
               <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-stone/50 px-4 py-3 text-sm outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all" />
            </div>

            <div className="flex justify-between items-center text-sm pt-2">
               <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-stone/50 text-clay focus:ring-clay cursor-pointer" />
                  <span className="text-ink/80 cursor-pointer">Remember me</span>
               </label>
               <Link to="#" className="font-medium text-clay hover:underline">Forgot password?</Link>
            </div>

            <button type="submit" className="mt-4 w-full rounded-full bg-clay text-white font-medium py-3.5 hover:bg-bark transition-colors shadow-md hover:shadow-lg">
               Sign In
            </button>
         </form>

         <div className="mt-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-stone/50"></div>
            <span className="text-xs text-ink/40 uppercase tracking-widest font-medium">Or</span>
            <div className="h-[1px] flex-1 bg-stone/50"></div>
         </div>

         <div className="mt-6 flex flex-col gap-3">
            <button type="button" className="flex items-center justify-center gap-3 w-full rounded-full border border-stone/50 bg-white py-3 text-sm font-medium text-ink hover:bg-stone/20 transition-colors">
               <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
               Continue with Google
            </button>
         </div>

         <p className="text-center text-sm text-ink/60 mt-8">
            Don't have an account? <Link to="/auth/sign-up" className="font-medium text-ink hover:underline">Sign up</Link>
         </p>
      </div>
   );
}
