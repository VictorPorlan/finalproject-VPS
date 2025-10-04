import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  CreateAnnouncementRequest, 
  SendMessageRequest,
  Announcement,
  Message,
  User,
  PaginatedResponse
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/auth/me');
    return response.data;
  }

  // Announcements endpoints
  async getAnnouncements(page = 1, limit = 10): Promise<PaginatedResponse<Announcement>> {
    const response: AxiosResponse<PaginatedResponse<Announcement>> = await this.api.get(
      `/announcements?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async getAnnouncementById(id: number): Promise<Announcement> {
    const response: AxiosResponse<Announcement> = await this.api.get(`/announcements/${id}`);
    return response.data;
  }

  async createAnnouncement(announcementData: CreateAnnouncementRequest): Promise<Announcement> {
    const response: AxiosResponse<Announcement> = await this.api.post('/announcements', announcementData);
    return response.data;
  }

  async getUserAnnouncements(userId: number): Promise<Announcement[]> {
    const response: AxiosResponse<Announcement[]> = await this.api.get(`/users/${userId}/announcements`);
    return response.data;
  }

  // Messages endpoints
  async getMessages(announcementId: number): Promise<Message[]> {
    const response: AxiosResponse<Message[]> = await this.api.get(`/messages/announcement/${announcementId}`);
    return response.data;
  }

  async sendMessage(messageData: SendMessageRequest): Promise<Message> {
    const response: AxiosResponse<Message> = await this.api.post('/messages', messageData);
    return response.data;
  }

  async getUserMessages(): Promise<Message[]> {
    const response: AxiosResponse<Message[]> = await this.api.get('/messages');
    return response.data;
  }

  // Users endpoints
  async getUserById(id: number): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get(`/users/${id}`);
    return response.data;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.api.put(`/users/${id}`, userData);
    return response.data;
  }
}

export default new ApiService();
