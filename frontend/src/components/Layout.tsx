'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
  // @ts-ignore
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: '/appointments', label: 'My Appointments' },
    { href: '/appointments/book', label: 'Book Appointment' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="Healthcare Portal Logo"
                  className="h-10 cursor-pointer"
                />
              </Link>
            </div>

            {user?.isAuthenticated && (
              <div className="flex space-x-4 ml-6 items-center">
                {navLinks.map(link => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}>
                        <span
                          className={`
                                px-4 py-2 rounded-full font-medium cursor-pointer transition
                                ${isActive
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'}
                            `}
                        >
                            {link.label}
                        </span>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="flex space-x-4 items-center">
              {!loading && (
                user?.isAuthenticated ? (
                  <>
                <span className="text-gray-600 font-medium">
                    Welcome, {user.email}
                </span>
                    <button
                      onClick={logout}
                      className="
                        px-4 py-2 bg-red-500 text-white rounded-lg shadow-md
                        hover:bg-red-600 transition font-medium cursor-pointer
                    "
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                    <span className="
                        px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md
                        hover:bg-indigo-700 transition font-medium cursor-pointer
                    ">
                        Login
                    </span>
                    </Link>
                  </>
                )
              )}
            </div>

          </div>

        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
