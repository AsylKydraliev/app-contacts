export class Users{
  constructor(
    public name: string,
    public userName: string,
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

// export class Address {
//   constructor(
//     streetA: string,
//     streetB: string,
//     streetC: string,
//     streetD: string,
//     city: string,
//     state: string,
//     country: string,
//     zipCode: string,
//     geo: Geo[],
//   ) {}
// }
//
// export class Geo {
//   constructor(
//     public lat: string,
//     public lng: string
//   ) {}
// }
//
// export class Company {
//   constructor(
//     public companyName: string,
//     public catchPhrase: string,
//     public bs: string,
//   ) {}
// }
