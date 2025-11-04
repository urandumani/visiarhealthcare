'use client';
import { useEffect, useState } from 'react';
import { fetchAuthenticated } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface Doctor {
  id: number;
  name: string;
}

export default function BookAppointmentPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const router = useRouter();
  // @ts-ignore
  const { user, loading } = useAuth();

  useEffect(() => {
    const loadDoctors = async () => {
      if (loading || !user?.isAuthenticated) return;

      try {
        const data = await fetchAuthenticated('/doctors');
        setDoctors(data);
      } catch (err) {
        console.error('Error loading doctors:', err);
        // @ts-ignore
        alert('Failed to load doctors: ' + err.message);
      }
    };
    loadDoctors();
  }, [user, loading]); 
  
  if (loading || !user?.isAuthenticated) {
    return <div className="text-center mt-12">Please log in to book an appointment.</div>;
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!selectedDoctorId || !date) return;

    try {
      await fetchAuthenticated('/appointments', 'POST', {
        doctorId: parseInt(selectedDoctorId),
        date: new Date(date).toISOString().split('T')[0],
      });

      alert('Appointment successfully booked!');
      router.push('/appointments');

    } catch (err) {
      // @ts-ignore
      alert(`Booking failed: ${err.message}`);
    }
  };

  return (
    <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Book a New Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Select Doctor</label>
          <select
            id="doctor"
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            required
            className={`
                            mt-1 block w-full px-4 py-2 text-base border rounded-lg shadow-sm
                            bg-white text-gray-700
                            border-gray-300
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                            hover:border-indigo-400
                            transition
                        `}
          >
            <option value="">Choose a doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                        hover:border-indigo-400 transition"
          />

        </div>
        <div>
          <button type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Book Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
