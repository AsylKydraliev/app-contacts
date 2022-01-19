export class Users{
  constructor(
    public name: string,
    public username: string,
    public email: string,
    public address: [],
    public phone: string,
    public website: string,
    public company: [],
    public posts: [],
    public accountHistory: [],
    public favorite: boolean,
    public avatar: string,
    public id: number,
  ) {}
}
