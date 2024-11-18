import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    'Content-Type': 'application/json'
  }
});

export const gameApi = {
  createRoom: async () => {
    const response = await api.post('/api/rooms');
    return response.data;
  },
  
  joinRoom: async (roomId: string) => {
    const response = await api.post(`/api/rooms/${roomId}/join`);
    return response.data;
  }
};
