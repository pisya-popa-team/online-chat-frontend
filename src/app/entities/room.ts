export interface IRoom {
  ID: number;
  Name: string;
  UserID: number;
  RoomType: string;
}

export interface IMessage {
  MessageType: string;
  Content: string;
  SentAt: string;
  RoomID: number;
  UserID: number;
}
