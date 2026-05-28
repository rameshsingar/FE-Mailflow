import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UploadCloud, 
  LayoutTemplate, 
  ListOrdered, 
  FileText,
  Send
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/upload', label: 'Upload Emails', icon: UploadCloud },
  { path: '/template', label: 'Template Preview', icon: LayoutTemplate },
  { path: '/queue', label: 'Sending Queue', icon: ListOrdered },
  { path: '/logs', label: 'Logs', icon: FileText },
];

export default function Sidebar({ onClose }) {
  const location = useLocation();

  return (
    <div className="w-[260px] h-full bg-bg-sidebar border-r border-gray-200 flex flex-col pt-6 pb-6 shadow-sm">
      <div className="px-6 flex items-center gap-3 mb-8">
        <div className="bg-primary text-white p-1.5 rounded-lg">
          <Send className="w-5 h-5 -rotate-45" />
        </div>
        <span className="font-semibold text-xl tracking-tight text-gray-900">Mailflow</span>
        <span className="ml-auto text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">v1.0</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-gray-100 text-gray-900" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-gray-700" : "text-gray-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Acme Inc.</span>
            <span className="text-xs text-gray-500">admin@acme.co</span>
          </div>
        </div>
      </div>
    </div>
  );
}
