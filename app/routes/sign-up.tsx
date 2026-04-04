import { Link } from "react-router";

export default function SignUp() {
  return (
    <div className="w-full max-w-sm mx-auto px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="font-serif text-4xl text-ink text-center mb-2">Create an account</h1>
      <p className="text-center text-ink/60 text-sm mb-10">Join Nestaway to discover and book amazing spaces</p>
      
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
         <div className="grid grid-cols-2 gap-4">
           <div>
              <label className="block text-sm font-medium text-ink mb-1.5">First name</label>
              <input type="text" placeholder="John" className="w-full rounded-xl border border-stone/50 px-4 py-3 text-sm outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all" />
           </div>
           <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Last name</label>
              <input type="text" placeholder="Doe" className="w-full rounded-xl border border-stone/50 px-4 py-3 text-sm outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all" />
           </div>
         </div>
         <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Email address</label>
            <input type="email" placeholder="name@example.com" className="w-full rounded-xl border border-stone/50 px-4 py-3 text-sm outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all" />
         </div>
         <div>
            <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
            <input type="password" placeholder="Create a strong password" className="w-full rounded-xl border border-stone/50 px-4 py-3 text-sm outline-none focus:border-clay focus:ring-1 focus:ring-clay transition-all" />
         </div>
         
         <div className="text-xs text-ink/60 mt-1">
            By selecting Create Account, you agree to our <Link to="#" className="underline hover:text-clay">Terms</Link> and <Link to="#" className="underline hover:text-clay">Privacy Policy</Link>.
         </div>
         
         <button type="submit" className="mt-4 w-full rounded-full bg-clay text-white font-medium py-3.5 hover:bg-bark transition-colors shadow-md hover:shadow-lg">
            Create Account
         </button>
      </form>
      
      <p className="text-center text-sm text-ink/60 mt-8">
         Already have an account? <Link to="/auth/sign-in" className="font-medium text-ink hover:underline">Log in</Link>
      </p>
    </div>
  );
}
