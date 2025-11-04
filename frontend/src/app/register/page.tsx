'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import FormCard from '../../components/FormCard';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // @ts-ignore
  const { register } = useAuth();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <FormCard title="Patient Registration">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="mt-1">
            <input id="name" name="name" type="text" required value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Email and Password fields are similar to the login page */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <div className="mt-1">
            <input id="email" name="email" type="email" required value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1">
            <input id="password" name="password" type="password" required value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Register
          </button>
        </div>
      </form>
    </FormCard>
  );
}
