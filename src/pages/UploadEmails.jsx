import { useState, useRef } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle, ShieldAlert, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function UploadEmails() {
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    if (uploadStatus === 'idle') {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Simulate upload starting
    setUploadStatus('uploading');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setUploadStatus('complete');
          toast.success("File uploaded and processed successfully!");
          setTimeout(() => {
            setUploadStatus('idle');
            setProgress(0);
          }, 3000);
          return 100;
        }
        return p + Math.floor(Math.random() * 20 + 10);
      });
    }, 400);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Upload Emails</h1>
        <p className="text-sm text-gray-500 mt-1">Drag and drop a recipient list to get started</p>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".csv, .xlsx, .xls" 
      />

      <div 
        onClick={handleDivClick}
        className={`border-2 border-dashed rounded-2xl bg-white p-8 md:p-16 flex flex-col items-center justify-center text-center transition-all cursor-pointer group active:scale-[0.99] ${
          uploadStatus === 'idle' 
            ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50' 
            : uploadStatus === 'uploading'
            ? 'border-blue-400 bg-blue-50/20'
            : 'border-green-400 bg-green-50/20'
        }`}
      >
        {uploadStatus === 'idle' && (
          <>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Drop your file here</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-sm">
              Supports .xlsx and .csv with columns: to, cc, bcc
            </p>
            <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-all pointer-events-none">
              Select file
            </button>
          </>
        )}
        
        {uploadStatus === 'uploading' && (
          <div className="flex flex-col items-center w-full max-w-md">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Uploading and validating...</h2>
            <p className="text-gray-500 text-sm mb-6">Checking emails against bounce lists</p>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
              <div className="bg-blue-500 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="text-sm font-medium text-blue-600">{progress}%</span>
          </div>
        )}

        {uploadStatus === 'complete' && (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Complete!</h2>
            <p className="text-gray-500 text-sm">3,240 recipients validated and ready.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={FileSpreadsheet}
          title="XLSX & CSV"
          description="Multi-sheet workbooks supported"
        />
        <FeatureCard 
          icon={CheckCircle}
          title="Auto-validation"
          description="Bad emails flagged instantly"
        />
        <FeatureCard 
          icon={ShieldAlert}
          title="Safe parsing"
          description="Preview before sending"
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-2 bg-gray-50 rounded-lg text-gray-500 border border-gray-100">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
