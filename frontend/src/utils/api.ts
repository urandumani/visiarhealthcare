const API_BASE_URL = 'http://localhost:8080/api'; 

export const fetchAuthenticated = async (endpoint: string, method: string = 'GET', body: object | null = null) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    throw new Error('User not authenticated. Please log in.');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, 
  };

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Session expired or unauthorized. Please log in again.');
    }
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed.');
  }

  if (response.status === 204) return null;

  return response.json();
};
