export interface IRoom {
  ID: number;
  lastMessage: IMessage | null;
  pinned: boolean;
  locked: boolean;
}

export interface IMessage {
  sender: string;
  content: string;
  date: string;
}
