import { Lock, Mail, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function TemplatePreview() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Email Template Preview</h1>
          <p className="text-sm text-gray-500 mt-1">Read-only preview of the active campaign template</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm opacity-70 cursor-not-allowed">
          <Lock className="w-4 h-4" />
          Read only
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Column - Details */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Template</h3>
            <p className="text-sm font-medium text-gray-900">Q4 Product Launch Announcement</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subject</h3>
              <p className="text-sm font-medium text-gray-900">Introducing our biggest release of the year 🚀</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">From Name</h3>
              <p className="text-sm font-medium text-gray-900">Acme Inc.</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">From Email</h3>
              <p className="text-sm font-medium text-gray-900">hello@acme.co</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Reply To</h3>
              <p className="text-sm font-medium text-gray-900">support@acme.co</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800 text-sm shadow-sm">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p>
              Variables like <code className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded font-mono text-xs">{"{{first_name}}"}</code> will be replaced per recipient.
            </p>
          </div>
        </div>

        {/* Right Column - Email Preview */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
          {/* Email Header */}
          <div className="border-b border-gray-100 p-4 md:p-6 flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 line-clamp-1">Introducing our biggest release of the year 🚀</h2>
              <p className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-none">Acme Inc. &lt;hello@acme.co&gt;</p>
            </div>
          </div>
          
          {/* Email Body */}
          <div className="p-6 md:p-12 flex-1 bg-white overflow-y-auto">
            <div className="max-w-xl mx-auto space-y-6 text-gray-800 leading-relaxed">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Hi {"{{first_name}}"},</h1>
              
              <p>
                We've been working on something special, and today we're thrilled to share it with you. Our new release brings faster workflows, deeper integrations, and a redesigned dashboard.
              </p>
              
              <p>
                Tap the button below to take it for a spin — no setup required.
              </p>
              
              <div className="pt-4 pb-2">
                <button 
                  onClick={() => toast("Button clicked", { description: "Link would open in a new tab." })}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
                >
                  Explore what's new
                </button>
              </div>
              
              <p className="text-gray-500 pt-6 border-t border-gray-100">
                — The Acme Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
