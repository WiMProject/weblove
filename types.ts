
export interface Memory {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  gallery?: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
