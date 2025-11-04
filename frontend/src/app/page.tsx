// src/app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative bg-gray-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Welcome to Visiar Healthcare
          </h1>
          <p className="text-lg text-gray-700">
            Book appointments, consult with doctors, and manage your health online.
          </p>
          <div className="flex justify-center lg:justify-start">
            <a
              href="/register"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition text-lg font-medium"
            >
              Register
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="/logo.png"
            alt="Healthcare illustration"
            className="rounded-xl shadow-lg"
            width={500}
            height={400}
            priority
          />
        </div>
      </div>
    </div>
  );
}
