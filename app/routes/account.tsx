import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/account";

export function meta({ }: Route.MetaArgs) {
   return [
      { title: "Account | Nestaway" },
      { name: "description", content: "Manage your account settings and preferences." },
   ];
}

export default function Account() {
   const [activeTab, setActiveTab] = useState("personal");

   const tabs = [
      { id: "personal", label: "Personal info", desc: "Manage your personal details", icon: "👤" },
      { id: "security", label: "Login & security", desc: "Password and account protection", icon: "🔒" },
      { id: "payments", label: "Payments & payouts", desc: "Payment methods and transactions", icon: "💳" },
      { id: "notifications", label: "Notifications", desc: "Communication preferences", icon: "🔔" },
   ];

   const handleLogout = () => {
      // Add logout logic here
      console.log("Logging out...");
   };

   return (
      <main className="min-h-screen bg-gradient-to-b from-fog to-white pb-24 pt-24 md:pt-32">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
               {/* Sidebar Navigation */}
               <aside className="w-full lg:w-80 shrink-0">
                  <div className="sticky top-32">
                     <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-8">Account</h1>

                     <nav className="space-y-2">
                        {tabs.map((tab) => (
                           <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-200 ${activeTab === tab.id
                                 ? "bg-white shadow-md border border-stone/20"
                                 : "hover:bg-white/60 hover:shadow-sm border border-transparent"
                                 }`}
                           >
                              {/* <span className="text-2xl">{tab.icon}</span> */}
                              <div className="flex-1">
                                 <div className={`font-medium ${activeTab === tab.id ? "text-clay" : "text-ink group-hover:text-clay"
                                    }`}>
                                    {tab.label}
                                 </div>
                                 <div className="text-sm text-ink/50 group-hover:text-ink/70 mt-0.5">
                                    {tab.desc}
                                 </div>
                              </div>
                              {activeTab === tab.id && (
                                 <div className="w-1.5 h-8 bg-clay rounded-full"></div>
                              )}
                           </button>
                        ))}
                     </nav>
                  </div>
               </aside>

               {/* Main Content Area */}
               <div className="flex-1 min-w-0">
                  <div className="bg-white rounded-3xl shadow-sm border border-stone/20 p-6 sm:p-8 md:p-10">
                     {activeTab === "personal" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                           <div className="mb-8">
                              <div className="flex items-center gap-2 text-sm text-ink/60 mb-4">
                                 <span className="hover:text-clay cursor-pointer transition-colors">Account</span>
                                 <span>›</span>
                                 <span className="text-clay font-medium">Personal info</span>
                              </div>
                              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Personal info</h2>
                              <p className="text-ink/60">Manage your basic information and contact details</p>
                           </div>

                           <div className="space-y-6">
                              {[
                                 { label: "Legal name", value: "John Doe", subtitle: "As shown on your ID" },
                                 { label: "Email address", value: "john.doe@example.com", subtitle: "Used for account notifications" },
                                 { label: "Phone number", value: "+1 (555) 123-4567", subtitle: "Verified" },
                                 { label: "Address", value: "Not provided", subtitle: "For billing and verification" },
                              ].map((field, idx) => (
                                 <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-b border-stone/20 last:border-0">
                                    <div>
                                       <h3 className="font-medium text-ink">{field.label}</h3>
                                       <p className="text-sm text-ink/50 mt-1">{field.subtitle}</p>
                                       <p className="text-ink mt-2">{field.value}</p>
                                    </div>
                                    <button className="text-sm font-medium text-clay hover:text-clay/80 transition-colors sm:self-start">
                                       {field.value === "Not provided" ? "Add" : "Edit"}
                                    </button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {activeTab === "security" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                           <div className="mb-8">
                              <div className="flex items-center gap-2 text-sm text-ink/60 mb-4">
                                 <span className="hover:text-clay cursor-pointer transition-colors">Account</span>
                                 <span>›</span>
                                 <span className="text-clay font-medium">Login & security</span>
                              </div>
                              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Login & security</h2>
                              <p className="text-ink/60">Protect your account with security features</p>
                           </div>

                           <div className="space-y-8">
                              <div>
                                 <h3 className="font-serif text-xl text-ink mb-4">Login credentials</h3>
                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t border-stone/20">
                                    <div>
                                       <h4 className="font-medium text-ink">Password</h4>
                                       <p className="text-sm text-ink/50 mt-1">Last updated 6 months ago</p>
                                    </div>
                                    <button className="text-sm font-medium text-clay hover:text-clay/80 transition-colors">
                                       Change password
                                    </button>
                                 </div>
                              </div>

                              <div>
                                 <h3 className="font-serif text-xl text-ink mb-4">Two-factor authentication</h3>
                                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t border-stone/20">
                                    <div>
                                       <h4 className="font-medium text-ink">Status</h4>
                                       <p className="text-sm text-amber-600 mt-1">Not enabled</p>
                                       <p className="text-sm text-ink/50 mt-2 max-w-md">
                                          Add an extra layer of security to protect your account
                                       </p>
                                    </div>
                                    <button className="text-sm font-medium bg-clay text-white px-4 py-2 rounded-lg hover:bg-clay/90 transition-colors">
                                       Enable 2FA
                                    </button>
                                 </div>
                              </div>

                              <div>
                                 <h3 className="font-serif text-xl text-ink mb-4">Active sessions</h3>
                                 <div className="space-y-4 border-t border-stone/20 pt-5">
                                    <div className="flex items-start justify-between gap-4">
                                       <div className="flex items-start gap-4">
                                          <div className="w-10 h-10 bg-stone/10 rounded-xl flex items-center justify-center text-xl">
                                             💻
                                          </div>
                                          <div>
                                             <h4 className="font-medium text-ink">Chrome on Windows</h4>
                                             <p className="text-sm text-green-600 mt-1">Active now</p>
                                             <p className="text-xs text-ink/50 mt-1">New York, USA • Today at 2:30 PM</p>
                                          </div>
                                       </div>
                                       <button className="text-sm text-rust hover:text-rust/80 transition-colors">
                                          Revoke
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === "payments" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                           <div className="mb-8">
                              <div className="flex items-center gap-2 text-sm text-ink/60 mb-4">
                                 <span className="hover:text-clay cursor-pointer transition-colors">Account</span>
                                 <span>›</span>
                                 <span className="text-clay font-medium">Payments & payouts</span>
                              </div>
                              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Payments & payouts</h2>
                              <p className="text-ink/60">Manage your payment methods and transaction history</p>
                           </div>

                           <div className="space-y-8">
                              <div>
                                 <h3 className="font-serif text-xl text-ink mb-4">Payment methods</h3>
                                 <div className="bg-stone/5 rounded-2xl p-5 border border-stone/20">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                       <div className="flex items-center gap-4">
                                          <div className="w-14 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                             VISA
                                          </div>
                                          <div>
                                             <p className="font-medium text-ink">•••• 4242</p>
                                             <p className="text-sm text-ink/50">Expires 12/28</p>
                                          </div>
                                          <span className="bg-clay/10 text-clay text-xs font-semibold px-2 py-1 rounded">
                                             Default
                                          </span>
                                       </div>
                                       <div className="flex gap-3">
                                          <button className="text-sm text-clay hover:text-clay/80 transition-colors">
                                             Edit
                                          </button>
                                          <button className="text-sm text-rust hover:text-rust/80 transition-colors">
                                             Remove
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                                 <button className="mt-4 text-sm font-medium text-clay hover:text-clay/80 transition-colors inline-flex items-center gap-2">
                                    + Add payment method
                                 </button>
                              </div>

                              <div>
                                 <h3 className="font-serif text-xl text-ink mb-4">Credits & coupons</h3>
                                 <div className="bg-stone/5 rounded-2xl p-8 text-center border border-stone/20 border-dashed">
                                    <p className="font-medium text-ink">No credits available</p>
                                    <p className="text-sm text-ink/50 mt-1">Gift cards and promo codes will appear here</p>
                                    <button className="mt-4 text-sm text-clay hover:text-clay/80 transition-colors">
                                       Redeem a code
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {activeTab === "notifications" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                           <div className="mb-8">
                              <div className="flex items-center gap-2 text-sm text-ink/60 mb-4">
                                 <span className="hover:text-clay cursor-pointer transition-colors">Account</span>
                                 <span>›</span>
                                 <span className="text-clay font-medium">Notifications</span>
                              </div>
                              <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Notifications</h2>
                              <p className="text-ink/60">Choose how you want to be notified</p>
                           </div>

                           <div className="space-y-6">
                              {[
                                 {
                                    title: "Messages",
                                    description: "Get notified about messages from hosts and guests",
                                    email: true,
                                    sms: true
                                 },
                                 {
                                    title: "Booking updates",
                                    description: "Stay updated on booking confirmations and changes",
                                    email: true,
                                    sms: false
                                 },
                                 {
                                    title: "Promotions & tips",
                                    description: "Receive offers, updates, and community news",
                                    email: true,
                                    sms: false
                                 },
                              ].map((setting, idx) => (
                                 <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-b border-stone/20 last:border-0">
                                    <div className="flex-1">
                                       <h3 className="font-medium text-ink">{setting.title}</h3>
                                       <p className="text-sm text-ink/50 mt-1">{setting.description}</p>
                                    </div>
                                    <div className="flex gap-6">
                                       <label className="flex items-center gap-2 cursor-pointer group">
                                          <input
                                             type="checkbox"
                                             defaultChecked={setting.email}
                                             className="w-5 h-5 rounded border-stone/30 text-clay accent-clay focus:ring-clay focus:ring-offset-0 cursor-pointer"
                                          />
                                          <span className="text-sm text-ink/70 group-hover:text-clay transition-colors">Email</span>
                                       </label>
                                       <label className="flex items-center gap-2 cursor-pointer group">
                                          <input
                                             type="checkbox"
                                             defaultChecked={setting.sms}
                                             className="w-5 h-5 rounded border-stone/30 text-clay accent-clay focus:ring-clay focus:ring-offset-0 cursor-pointer"
                                          />
                                          <span className="text-sm text-ink/70 group-hover:text-clay transition-colors">SMS</span>
                                       </label>
                                    </div>
                                 </div>
                              ))}
                           </div>

                           <div className="mt-8 pt-6 border-t border-stone/20">
                              <button className="w-full sm:w-auto px-6 py-3 bg-clay text-white rounded-xl hover:bg-clay/90 transition-colors font-medium">
                                 Save preferences
                              </button>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}