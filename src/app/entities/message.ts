export interface IMessage {
  message_type: string;
  content: string;
  sent_at: string;
  room_id: number;
  user_id: number;
  username: string;
}
