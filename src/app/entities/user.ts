﻿import { IRoom } from './room';

export interface IUser {
  ID: number;
  Username: string;
  Email: string;
  Rooms: IRoom[];
}
