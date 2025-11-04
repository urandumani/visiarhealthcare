import './globals.css';
import Layout from '@/components/Layout';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Healthcare Frontend',
  description: 'Appointment management system',
};

// @ts-ignore
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
    <AuthProvider>
      <Layout>
        {children}
      </Layout>
    </AuthProvider>
    </body>
    </html>
  );
}