// User types
export interface User {
  id: number;
  email: string;
  username: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  location?: string;
}

// Card types
export interface Card {
  id: number;
  name: string;
  edition: string;
  condition: string;
  price: number;
  sellerId: number;
}

// Announcement types
export interface Announcement {
  id: number;
  cardId: number;
  sellerId: number;
  description?: string;
  createdAt: string;
  card?: Card;
  seller?: User;
}

// Message types
export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  announcementId: number;
  content: string;
  createdAt: string;
  sender?: User;
  receiver?: User;
  announcement?: Announcement;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  location?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// Form types
export interface CreateAnnouncementRequest {
  card: {
    name: string;
    edition: string;
    condition: string;
    price: number;
  };
  description?: string;
}

export interface SendMessageRequest {
  announcementId: number;
  receiverId: number;
  content: string;
}
