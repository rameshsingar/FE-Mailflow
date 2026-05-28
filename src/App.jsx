import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UploadEmails from './pages/UploadEmails';
import TemplatePreview from './pages/TemplatePreview';
import SendingQueue from './pages/SendingQueue';
import Logs from './pages/Logs';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="upload" element={<UploadEmails />} />
            <Route path="template" element={<TemplatePreview />} />
            <Route path="queue" element={<SendingQueue />} />
            <Route path="logs" element={<Logs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
