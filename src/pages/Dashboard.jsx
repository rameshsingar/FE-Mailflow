import { useState, useEffect } from 'react';
import { 
  Download, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Activity 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/dashboard.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load dashboard data");
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="p-8 max-w-7xl mx-auto flex justify-center items-center h-[50vh]"><div className="animate-pulse flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-blue-500"></div>Loading data...</div></div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time overview of your email campaigns</p>
        </div>
        <button 
          onClick={() => toast.success("Export started! Your CSV will download shortly.")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Stat Cards */}
        <StatCard title="Total Uploaded" value={data.stats.totalUploaded} icon={Mail} color="blue" />
        <StatCard title="Sent" value={data.stats.sent} trend={data.stats.sentTrend} icon={CheckCircle2} color="green" />
        <StatCard title="Failed" value={data.stats.failed} trend={data.stats.failedTrend} icon={XCircle} color="red" />
        <StatCard title="Pending" value={data.stats.pending} icon={Clock} color="orange" />
        <StatCard title="Success Rate" value={data.stats.successRate} icon={TrendingUp} color="blue" />
        <StatCard title="Emails / sec" value={data.stats.emailsPerSec} icon={Activity} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-900">Sending Activity</h2>
            <p className="text-xs text-gray-500 mt-0.5">Last 16 hours</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Area type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSent)" />
                <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-900">Queue Progress</h2>
            <p className="text-xs text-gray-500 mt-0.5">Active campaigns</p>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-8">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Overall progress</span>
                <span className="font-semibold text-gray-900">{data.queueProgress.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${data.queueProgress.percentage}%` }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Processed</div>
                <div className="text-xl font-semibold text-gray-900">{data.queueProgress.processed}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Remaining</div>
                <div className="text-xl font-semibold text-gray-900">{data.queueProgress.remaining}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Recent Uploads</h2>
          <p className="text-xs text-gray-500 mt-0.5">Your latest recipient lists</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-semibold">File</th>
                <th className="px-6 py-4 font-semibold">Recipients</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Uploaded</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.recentUploads.map((upload, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-medium">{upload.file}</td>
                  <td className="px-6 py-4 text-gray-600">{upload.recipients}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={upload.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-500">{upload.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, color }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
    orange: "text-orange-600 bg-orange-50",
    purple: "text-purple-600 bg-purple-50",
  };

  const trendColor = trend?.startsWith('+') ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={cn("p-1.5 rounded-lg", colorMap[color])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</span>
        {trend && (
          <span className={cn("text-xs font-medium", trendColor)}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-green-100 text-green-700",
    Sending: "bg-blue-100 text-blue-700",
    Ready: "bg-blue-50 text-blue-600",
    Failed: "bg-red-100 text-red-700",
  };

  const icons = {
    Completed: CheckCircle2,
    Sending: Activity,
    Ready: Clock,
    Failed: XCircle,
  };

  const Icon = icons[status];

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", styles[status])}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {status}
    </span>
  );
}
