import { api } from '../apiClient';
import type { Conversation, ChatResponse, Preferences } from '@/src/types';

export interface SendMessageRequest {
  userMessage: string;
  preferences?: Preferences;
}

export interface CreateConversationRequest {
  title?: string;
}

export const chatApi = {
  getConversations: () => api.get<Conversation[]>('/chat/conversations'),

  getConversation: (id: string) =>
    api.get<Conversation>(`/chat/conversations/${id}`),

  createConversation: (data?: CreateConversationRequest) =>
    api.post<Conversation>('/chat/conversations', data),

  renameConversation: (id: string, title: string) =>
    api.patch<Conversation>(`/chat/conversations/${id}`, { title }),

  deleteConversation: (id: string) =>
    api.delete<{ success: boolean }>(`/chat/conversations/${id}`),

  sendMessage: (conversationId: string, data: SendMessageRequest) =>
    api.post<ChatResponse>(`/chat/conversations/${conversationId}/messages`, data),

  healthCheck: () => api.get<{ status: string }>('/chat/health', { auth: 'none' }),
};
