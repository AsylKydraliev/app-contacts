import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  users!: Users[];
  usersChange = new Subject<Users[]>();

  constructor(private http: HttpClient) {}

  getAllUsers(){
    this.http.get<{[id: string] : Users}>('https://demo.sibers.com/users').pipe(map(result => {
      return Object.keys(result).map(id => {
        const users = result[id];
        return new Users(
          users.name,
          users.userName,
          users.email,
          users.address,
          users.phone,
          users.website,
          users.company,
          users.posts,
          users.accountHistory,
          users.favorite,
          users.avatar,
          users.id,
        );
      });
    }))
      .subscribe(data => {
        this.users = [];
        this.users = data;
        this.usersChange.next(this.users.slice());
      });
  }
}
