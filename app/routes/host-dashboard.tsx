import type { Route } from "./+types/host-dashboard";
import { useState } from "react";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Host Dashboard | Nestaway" },
    { name: "description", content: "Manage your Nestaway properties and reservations." },
  ];
}

export default function HostDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", desc: "Your hosting summary", icon: "📊" },
    { id: "listings", label: "Properties", desc: "Manage your listings", icon: "🏡" },
    { id: "reservations", label: "Reservations", desc: "Upcoming & past guests", icon: "📅" },
    { id: "earnings", label: "Earnings", desc: "Financial summary", icon: "💰" },
  ];

  return (
    <main className="h-screen overflow-hidden bg-linear-to-b from-fog to-white pt-20 pb-6 flex items-center justify-center">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12 max-h-[85vh]">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col overflow-y-auto pr-2 pb-4 scrollbar-thin">
          <div className="flex-1">
            <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-8">Host Portal</h1>

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
                  <div className="flex-1">
                    <div className={`font-medium ${activeTab === tab.id ? "text-clay" : "text-ink group-hover:text-clay"}`}>
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

            <button className="w-full mt-8 py-4 bg-ink text-white font-medium rounded-2xl hover:bg-bark transition-colors shadow-md">
              + Create new listing
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div className="bg-white rounded-3xl shadow-sm border border-stone/20 p-6 sm:p-8 md:p-10 flex-1 overflow-y-auto scrollbar-thin">
            {activeTab === "overview" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Welcome back, Host</h2>
                <p className="text-ink/60 mb-8">Here's what's happening with your properties today.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                  <div className="bg-stone/5 border border-stone/20 p-5 rounded-2xl">
                    <div className="text-sm text-ink/60 font-medium mb-1">Pending Requests</div>
                    <div className="text-3xl font-serif text-ink">3</div>
                  </div>
                  <div className="bg-stone/5 border border-stone/20 p-5 rounded-2xl">
                    <div className="text-sm text-ink/60 font-medium mb-1">Arriving Today</div>
                    <div className="text-3xl font-serif text-ink">1</div>
                  </div>
                  <div className="bg-stone/5 border border-stone/20 p-5 rounded-2xl">
                    <div className="text-sm text-ink/60 font-medium mb-1">Checking Out</div>
                    <div className="text-3xl font-serif text-ink">2</div>
                  </div>
                </div>

                <h3 className="font-serif text-xl text-ink mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 py-4 border-b border-stone/20">
                    <div className="w-12 h-12 rounded-full bg-clay/10 text-clay flex items-center justify-center font-bold">
                      JD
                    </div>
                    <div>
                      <p className="font-medium text-ink">John Doe requested to book Horizon Villa</p>
                      <p className="text-sm text-ink/50">Oct 12 - Oct 18 • $1,200 total</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <button className="px-4 py-2 bg-clay text-white text-sm font-medium rounded-lg">Accept</button>
                      <button className="px-4 py-2 bg-stone/20 text-ink text-sm font-medium rounded-lg">Decline</button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 py-4 border-b border-stone/20">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                      AK
                    </div>
                    <div>
                      <p className="font-medium text-ink">Anna left a 5-star review for Downtown Loft</p>
                      <p className="text-sm text-ink/50">"Amazing stay, highly recommend!"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "listings" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Properties</h2>
                    <p className="text-ink/60">Manage your active and drafted listings.</p>
                  </div>
                  <button className="px-5 py-2.5 bg-clay text-white text-sm font-medium rounded-xl shadow-sm hover:bg-clay/90 hidden sm:block">
                    Add Property
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Property Card 1 */}
                  <div className="flex flex-col sm:flex-row gap-6 p-5 border border-stone/20 rounded-2xl group hover:border-clay/50 transition-colors">
                    <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop" alt="Property" className="w-full sm:w-48 h-32 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-lg text-ink">Horizon Modern Villa</h3>
                          <p className="text-sm text-ink/50 mt-1">Florence, Italy • Entire home</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-md">Active</span>
                      </div>
                      <div className="flex items-center gap-6 mt-4 text-sm text-ink/70">
                        <span className="font-medium text-ink">$280 / night</span>
                        <span>4.9★ (32 reviews)</span>
                      </div>
                    </div>
                    <div className="sm:pl-4 sm:border-l border-stone/20 flex flex-row sm:flex-col justify-center gap-2">
                      <button className="flex-1 px-4 py-2 text-sm font-medium border border-stone/30 rounded-lg hover:bg-stone/10">Edit</button>
                      <button className="flex-1 px-4 py-2 text-sm font-medium border border-stone/30 rounded-lg hover:bg-stone/10">Calendar</button>
                    </div>
                  </div>

                  {/* Property Card 2 */}
                  <div className="flex flex-col sm:flex-row gap-6 p-5 border border-stone/20 rounded-2xl group hover:border-clay/50 transition-colors">
                    <div className="w-full sm:w-48 h-32 bg-stone/20 rounded-xl shrink-0 flex items-center justify-center text-ink/30 font-medium">No cover image</div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-lg text-ink">Cozy Urban Studio</h3>
                          <p className="text-sm text-ink/50 mt-1">London, UK • Apartment</p>
                        </div>
                        <span className="px-2 py-1 bg-stone/20 text-ink/70 text-xs font-semibold rounded-md">Draft</span>
                      </div>
                      <div className="flex items-center gap-6 mt-4 text-sm text-ink/70">
                        <span>Finish setting up to publish</span>
                      </div>
                    </div>
                    <div className="sm:pl-4 sm:border-l border-stone/20 flex flex-row sm:flex-col justify-center gap-2">
                      <button className="flex-1 px-4 py-2 text-sm font-medium border border-stone/30 rounded-lg hover:bg-stone/10">Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reservations" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Reservations</h2>
                <p className="text-ink/60 mb-8">View and manage all your bookings.</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-stone/30 text-sm text-ink/50">
                        <th className="pb-3 font-medium">Guest</th>
                        <th className="pb-3 font-medium">Property</th>
                        <th className="pb-3 font-medium">Dates</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Payout</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-stone/10 hover:bg-stone/5 transition-colors">
                        <td className="py-4 font-medium text-ink">John Doe</td>
                        <td className="py-4 text-ink/70">Horizon Villa</td>
                        <td className="py-4 text-ink/70">Oct 12 - Oct 18</td>
                        <td className="py-4"><span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-md">Pending</span></td>
                        <td className="py-4 font-medium">$1,200</td>
                      </tr>
                      <tr className="border-b border-stone/10 hover:bg-stone/5 transition-colors">
                        <td className="py-4 font-medium text-ink">Anna K.</td>
                        <td className="py-4 text-ink/70">Downtown Loft</td>
                        <td className="py-4 text-ink/70">Sep 28 - Oct 02</td>
                        <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">Confirmed</span></td>
                        <td className="py-4 font-medium">$850</td>
                      </tr>
                      <tr className="border-b border-stone/10 hover:bg-stone/5 transition-colors">
                        <td className="py-4 font-medium text-ink">Mike Ross</td>
                        <td className="py-4 text-ink/70">Horizon Villa</td>
                        <td className="py-4 text-ink/70">Sep 15 - Sep 20</td>
                        <td className="py-4"><span className="px-2 py-1 bg-stone/20 text-ink/60 text-xs rounded-md">Completed</span></td>
                        <td className="py-4 font-medium">$1,400</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "earnings" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="font-serif text-3xl sm:text-4xl text-ink mb-2">Earnings</h2>
                <p className="text-ink/60 mb-8">Review your financial history and payouts.</p>

                <div className="bg-stone/5 border border-stone/20 p-8 rounded-3xl mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div>
                    <div className="text-ink/60 text-sm font-medium mb-2">Total Earnings (YTD)</div>
                    <div className="text-5xl font-serif text-ink">$24,850</div>
                  </div>
                  <button className="px-6 py-3 bg-white border border-stone/30 font-medium rounded-xl hover:text-clay hover:border-clay transition-all shadow-sm">
                    View Payout History
                  </button>
                </div>

                <h3 className="font-serif text-xl text-ink mb-4">Payout Method</h3>
                <div className="bg-white border border-stone/20 p-5 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-stone/20 rounded flex items-center justify-center font-bold text-ink/40 text-xs">BANK</div>
                    <div>
                      <p className="font-medium text-ink">Chase Checking •••• 1234</p>
                      <p className="text-sm text-ink/50 mt-1">Default routing account</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-clay hover:text-clay/80">Edit</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
