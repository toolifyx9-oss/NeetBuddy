import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  title: 'NEETBuddy | NTA Exam Engine & NEET Prep Studio',
  description: 'Enterprise-grade NEET preparation platform with active test engine, Trackprep-inspired Improvement Book, AI Doubt Solver, and dynamic telemetry.',
  icons: {
    icon: '/images/logo-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0D1117] text-[#F0F6FC] antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

