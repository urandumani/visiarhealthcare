'use client';
import { useEffect, useState } from 'react';
import { fetchAuthenticated } from '../../utils/api';
import { useAuth } from '../../context/AuthContext'; 

interface Appointment {
  id: number;
  date: string;
  status: string;
  doctorId: number;
  doctorName: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // @ts-ignore
  const { user, logout } = useAuth();

  const loadAppointments = async () => {
    if (!user?.isAuthenticated) return;

    try {
      setLoading(true);
      const data = await fetchAuthenticated('/appointments');
      setAppointments(data);
    } catch (err) {
      // @ts-ignore
      setError(err.message);
      // @ts-ignore
      if (err.message.includes('unauthorized')) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [user]);

  const handleCancel = async (appointmentId: number) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await fetchAuthenticated(`/appointments/${appointmentId}`, 'DELETE');
        await loadAppointments();
      } catch (err) {
        // @ts-ignore
        alert(`Cancellation failed: ${err.message}`);
      }
    }
  };

  if (loading) return <div className="text-center mt-12">Loading appointments...</div>;
  if (error) return <div className="text-center mt-12 text-red-600">Error: {error}</div>;

  return (
    <div className="mt-8">
      <h1 className="text-xl font-semibold mb-4">My Appointments</h1>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p>You have no upcoming appointments.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt.id} className="p-4 bg-white shadow rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold">{appt.doctorName}</p>
                <p className="text-gray-600">Date: {new Date(appt.date).toLocaleDateString()}</p>
              </div>
              {appt.status !== 'Cancelled' && (
                <button onClick={() => handleCancel(appt.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
