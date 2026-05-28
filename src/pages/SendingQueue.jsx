import { useState, useEffect } from 'react';
import { Play, Square, Activity, Clock, XCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export default function SendingQueue() {
  const [status, setStatus] = useState('Pending'); // Pending, Running, Paused, Completed
  const [processed, setProcessed] = useState(14210);
  const total = 18305;
  const [emailsPerSec, setEmailsPerSec] = useState(0);
  const [failed, setFailed] = useState(312);

  useEffect(() => {
    let interval;
    if (status === 'Running' && processed < total) {
      interval = setInterval(() => {
        const jump = Math.floor(Math.random() * 15) + 15; // 15 to 30 emails per sec
        setProcessed(prev => {
          const next = prev + jump;
          return next > total ? total : next;
        });
        setEmailsPerSec(jump);
      }, 1000);
    } else if (status === 'Paused' || status === 'Pending' || processed >= total) {
      setEmailsPerSec(0);
      if (processed >= total && status === 'Running') {
        setStatus('Completed');
        toast.success("Campaign sending completed!");
      }
    }
    return () => clearInterval(interval);
  }, [status, processed, total]);

  const percentage = Math.floor((processed / total) * 100);
  const remaining = total - processed;

  const handleResume = () => {
    if (processed >= total) return;
    setStatus('Running');
    toast.success("Campaign resumed");
  };

  const handleStop = () => {
    if (status !== 'Running') return;
    setStatus('Paused');
    toast.info("Campaign paused");
  };

  const handleRetry = () => {
    if (failed === 0) {
      toast.info("No failed deliveries to retry");
      return;
    }
    toast.success(`Retrying all ${failed} failed deliveries`);
    setFailed(0);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sending Queue</h1>
          <p className="text-sm text-gray-500 mt-1">Live status of the active sending job</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleResume}
            disabled={status === 'Running' || processed >= total}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all active:scale-95 ${
              status === 'Running' || processed >= total 
                ? 'bg-blue-400 text-white/80 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Play className="w-4 h-4" />
            Resume
          </button>
          <button 
            onClick={handleStop}
            disabled={status !== 'Running'}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium shadow-sm transition-all active:scale-95 ${
              status !== 'Running'
                ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Square className="w-4 h-4" />
            Stop
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Q4 Product Launch Announcement</h2>
            <p className="text-sm text-gray-500 mt-1">Job: 18,305 recipients</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            status === 'Running' ? 'bg-blue-100 text-blue-700' :
            status === 'Completed' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              status === 'Running' ? 'bg-blue-500 animate-pulse' :
              status === 'Completed' ? 'bg-green-500' :
              'bg-gray-400'
            }`}></span>
            {status}
          </span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span className="text-gray-600">{processed.toLocaleString()} / {total.toLocaleString()}</span>
            <span className="text-gray-900">{percentage}%</span>
          </div>
          <div className="w-full bg-blue-100/50 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-linear" style={{ width: `${percentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Emails per second" value={emailsPerSec} icon={Activity} color="blue" />
        <StatCard title="Remaining" value={remaining.toLocaleString()} icon={Clock} color="blue" />
        <StatCard title="Failed" value={failed} icon={XCircle} color="red" />
        <StatCard title="Sent" value={processed.toLocaleString()} icon={CheckCircle2} color="green" />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Failed deliveries</h2>
          <p className="text-sm text-gray-500 mt-1">{failed} messages need attention</p>
        </div>
        <button 
          onClick={handleRetry}
          disabled={failed === 0}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium shadow-sm transition-all active:scale-95 ${
            failed === 0 
              ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          Retry all failed
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colorMap = {
    blue: "text-blue-600",
    red: "text-red-600",
    green: "text-green-600",
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-4 h-4 ${colorMap[color]}`} />
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <div className="text-2xl font-semibold text-gray-900 tracking-tight">
        {value}
      </div>
    </div>
  );
}
