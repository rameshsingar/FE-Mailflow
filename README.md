# 📧 Mailflow Dashboard

A beautiful, modern, and highly interactive email campaign dashboard UI built with **React**, **Vite**, and **Tailwind CSS v4**.

![Dashboard Preview](https://via.placeholder.com/1200x600/f9fafb/3b82f6?text=Mailflow+Dashboard+UI)

## ✨ Features

- **📊 Comprehensive Dashboard**: Real-time overview with KPI stat cards (Total Uploaded, Sent, Failed, Success Rate) and a beautiful responsive Area Chart showing sending activity.
- **☁️ Drag & Drop Uploads**: A simulated file upload zone for `.csv` and `.xlsx` files with a dynamic progress bar and success states.
- **👀 Template Preview**: A split-pane view to inspect email templates, sender details, and dynamic variables.
- **🚀 Live Sending Queue**: An interactive queue page where you can pause and resume email campaigns. Watch the progress bar fill up and the "Emails per second" update in real-time.
- **📜 Detailed Logs**: A data table showing per-recipient delivery history. Includes search functionality, status filters, and the ability to simulate retrying failed deliveries.
- **🔔 Toast Notifications**: Interactive actions (like exporting CSVs or retrying emails) trigger sleek, satisfying toast notifications across the application.
- **💾 JSON Data Ready**: All mock data is fetched from local JSON files (`/public/data/`), making it incredibly easy for a backend developer to plug in a real REST API in the future.

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rameshsingar/FE-Mailflow.git
   cd FE-Mailflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 🌐 Deploying to Vercel

This project is perfectly configured to be deployed on Vercel with zero extra configuration.

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on **Add New...** > **Project**.
3. Import your `FE-Mailflow` GitHub repository.
4. Click **Deploy**. Vercel will automatically detect the Vite preset and deploy your application within seconds.

---
*Built with ❤️ and focus on UI/UX.*
