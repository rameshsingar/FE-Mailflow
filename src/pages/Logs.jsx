import { useState, useEffect } from 'react';
import { Search, Download, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Logs() {
  const [logsData, setLogsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/data/logs.json')
      .then(res => res.json())
      .then(data => {
        setLogsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load logs data");
        setLoading(false);
      });
  }, []);

  const handleRetry = (recipient, index) => {
    toast.success(`Retrying delivery to ${recipient}`);
    
    // Set to retrying
    setLogsData(prev => {
      const newData = [...prev];
      const actualIndex = newData.findIndex(l => l.recipient === recipient);
      if (actualIndex > -1) {
        newData[actualIndex] = { ...newData[actualIndex], status: 'Retrying', canRetry: false, retries: newData[actualIndex].retries + 1 };
      }
      return newData;
    });

    // Simulate success after 2.5s
    setTimeout(() => {
      setLogsData(prev => {
        const newData = [...prev];
        const actualIndex = newData.findIndex(l => l.recipient === recipient);
        if (actualIndex > -1) {
          newData[actualIndex] = { ...newData[actualIndex], status: 'Sent', error: '—' };
        }
        return newData;
      });
      toast.success(`Successfully delivered to ${recipient}`);
    }, 2500);
  };

  const filteredLogs = logsData.filter(log => {
    const matchesFilter = activeFilter === 'All' || log.status === activeFilter;
    const matchesSearch = log.recipient.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return <div className="p-8 max-w-[1400px] mx-auto flex justify-center items-center h-[50vh]"><div className="animate-pulse flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-blue-500"></div>Loading logs...</div></div>;
  }
  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Logs</h1>
          <p className="text-sm text-gray-500 mt-1">Per-recipient delivery history</p>
        </div>
        <button 
          onClick={() => toast.success("Export started! CSV will download shortly.")}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col h-[calc(100vh-180px)]">
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search recipients..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex bg-gray-50/50 border border-gray-200 rounded-lg p-1">
            {['All', 'Sent', 'Failed', 'Pending', 'Retrying'].map((filter, i) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-colors",
                  filter === activeFilter 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200" 
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-semibold">Recipient</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Error</th>
                <th className="px-6 py-4 font-semibold">Sent At</th>
                <th className="px-6 py-4 font-semibold text-center">Retries</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 text-gray-900 font-medium">{log.recipient}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={log.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-500 truncate max-w-xs">{log.error}</td>
                  <td className="px-6 py-4 text-gray-500">{log.sentAt}</td>
                  <td className="px-6 py-4 text-gray-900 text-center">{log.retries}</td>
                  <td className="px-6 py-4 text-right">
                    {log.canRetry && (
                      <button 
                        onClick={() => handleRetry(log.recipient, i)}
                        className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity active:scale-95"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Retry
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Sent: "bg-green-100 text-green-700",
    Failed: "bg-red-100 text-red-700",
    Pending: "bg-gray-100 text-gray-700",
    Retrying: "bg-orange-100 text-orange-700",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium", styles[status])}>
      <span className={cn("w-1.5 h-1.5 rounded-full", 
        status === 'Sent' ? "bg-green-500" :
        status === 'Failed' ? "bg-red-500" :
        status === 'Pending' ? "bg-gray-400" :
        "bg-orange-500"
      )}></span>
      {status}
    </span>
  );
}
