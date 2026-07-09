import { Map, Compass, TrendingUp, Users, ArrowUpRight, Sparkles } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Tour from "@/models/Tour";
import Activity from "@/models/Activity";

async function getStats() {
  try {
    await connectToDatabase();
    const tourCount = await Tour.countDocuments();
    const activityCount = await Activity.countDocuments();
    
    return {
      tours: tourCount,
      activities: activityCount,
      error: null
    };
  } catch (error) {
    console.error("Database connection error:", error);
    return {
      tours: 0,
      activities: 0,
      error: "Failed to connect to database"
    };
  }
}

export default async function Dashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* Hero greeting card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[hsl(222,47%,11%)] via-[hsl(217,91%,18%)] to-[hsl(222,47%,11%)] p-8 md:p-10 text-white shadow-lg">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-[hsl(217,91%,56%)] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-[hsl(280,80%,60%)] opacity-15 rounded-full blur-3xl"></div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold uppercase tracking-wider mb-4">
              <Sparkles size={12} /> Dashboard
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Welcome back, Admin
            </h1>
            <p className="text-white/70 max-w-md">
              Here is a quick overview of your tours, activities, and content performance today.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/tours/new" className="btn btn-primary !bg-white !text-[hsl(217,91%,42%)] !shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)]">
              New Tour <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {stats.error && (
        <div className="bg-[var(--danger-bg)] text-[var(--danger)] px-4 py-3 rounded-xl border border-[hsla(0,84%,60%,0.2)] flex items-center gap-2 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-[var(--danger)] animate-pulse"></span>
          Database Connection Error: Please check your MongoDB credentials and IP whitelist. ({stats.error})
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          label="Total Tours"
          value={stats.tours}
          delta="+12%"
          deltaLabel="from last month"
          icon={Map}
          color="hsl(217, 91%, 56%)"
        />
        <StatCard
          label="Total Activities"
          value={stats.activities}
          delta="+5%"
          deltaLabel="from last month"
          icon={Compass}
          color="hsl(280, 80%, 60%)"
        />
        <StatCard
          label="Total Inquiries"
          value={1204}
          delta="+18%"
          deltaLabel="this week"
          icon={Users}
          color="hsl(160, 84%, 39%)"
        />
        <StatCard
          label="Avg. Rating"
          value="4.8"
          delta="+0.2"
          deltaLabel="vs last quarter"
          icon={TrendingUp}
          color="hsl(38, 92%, 50%)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel lg:col-span-2 min-h-[380px]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="mb-1">Recent Bookings</h2>
              <p className="text-[13px] text-[var(--text-secondary)]">Latest inquiries and bookings across all tours.</p>
            </div>
            <button className="text-[13px] font-semibold text-[var(--accent)] hover:underline">View all</button>
          </div>
          <div className="flex items-center justify-center h-[260px] text-[var(--text-muted)] text-sm bg-[var(--bg-subtle)] rounded-xl border border-dashed border-[var(--panel-border-strong)]">
            Booking data integration pending...
          </div>
        </div>
        <div className="glass-panel min-h-[380px]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="mb-1">Popular Destinations</h2>
              <p className="text-[13px] text-[var(--text-secondary)]">Top viewed places this month.</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-[260px] text-[var(--text-muted)] text-sm bg-[var(--bg-subtle)] rounded-xl border border-dashed border-[var(--panel-border-strong)]">
            Analytics pending...
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label, value, delta, deltaLabel, icon: Icon, color,
}: { label: string; value: string | number; delta: string; deltaLabel: string; icon: any; color: string }) {
  return (
    <div className="glass-panel relative overflow-hidden group">
      <div
        className="absolute -right-6 -top-6 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
        style={{ background: color }}
      />
      <div className="relative flex justify-between items-start mb-5">
        <div>
          <p className="text-[12px] uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">{label}</p>
          <h3 className="text-[2rem] font-bold tracking-tight text-[var(--text-primary)] leading-none">{value}</h3>
        </div>
        <div
          className="h-11 w-11 rounded-xl grid place-items-center shadow-sm"
          style={{ background: `${color}15`, color }}
        >
          <Icon size={20} strokeWidth={2.2} />
        </div>
      </div>
      <div className="relative flex items-center gap-1.5 text-[12px] font-medium">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[var(--success)] bg-[var(--success-bg)]">
          <TrendingUp size={12} /> {delta}
        </span>
        <span className="text-[var(--text-muted)]">{deltaLabel}</span>
      </div>
    </div>
  );
}
