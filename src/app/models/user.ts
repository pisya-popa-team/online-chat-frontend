export interface IUser {
  ID: number;
  Username: string;
  Email: string;
  Password: { ID: number; hash: string; UserId: number };
  Room: string[];
}
