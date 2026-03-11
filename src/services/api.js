import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authAPI = {
  login: (email, password) => 
    axios.post(`${API}/auth/login`, { email, password }),
  
  register: (userData) => 
    axios.post(`${API}/auth/register`, userData),
  
  getMe: () => 
    axios.get(`${API}/auth/me`, { headers: getAuthHeader() })
};

export const profileAPI = {
  updateProfile: (data) => 
    axios.put(`${API}/profile`, data, { headers: getAuthHeader() }),
  
  getProfile: (userId) => 
    axios.get(`${API}/profile/${userId}`, { headers: getAuthHeader() })
};

export const usersAPI = {
  browse: (filters = {}) => 
    axios.get(`${API}/users/browse`, {
      params: filters,
      headers: getAuthHeader()
    })
};

export const interestsAPI = {
  send: (receiverId, message) => 
    axios.post(
      `${API}/interests/send`,
      { receiver_id: receiverId, message },
      { headers: getAuthHeader() }
    ),
  
  getReceived: () => 
    axios.get(`${API}/interests/received`, { headers: getAuthHeader() }),
  
  getSent: () => 
    axios.get(`${API}/interests/sent`, { headers: getAuthHeader() }),
  
  respond: (interestId, status) => 
    axios.put(
      `${API}/interests/${interestId}/respond?status=${status}`,
      {},
      { headers: getAuthHeader() }
    )
};

export const matchesAPI = {
  getMatches: () => 
    axios.get(`${API}/matches`, { headers: getAuthHeader() })
};

export const messagesAPI = {
  send: (receiverId, message) => 
    axios.post(
      `${API}/messages/send`,
      { receiver_id: receiverId, message },
      { headers: getAuthHeader() }
    ),
  
  getMessages: (userId) => 
    axios.get(`${API}/messages/${userId}`, { headers: getAuthHeader() }),
  
  getConversations: () => 
    axios.get(`${API}/conversations`, { headers: getAuthHeader() })
};
