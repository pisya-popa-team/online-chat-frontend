export interface IRoom {
  ID: number;
  Name: string;
  UserID: number;
  RoomType: string;
}

export interface IMessage {
  ID: number;
  MessageType: string;
  Content: string;
  SentAt: Date;
  RoomID: 3;
  UserID: number;
}
