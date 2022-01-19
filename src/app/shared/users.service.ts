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
  user!: Users;
  usersChange = new Subject<Users[]>();
  userChange = new Subject<Users>();
  localUsers: Users[] = [];

  constructor(private http: HttpClient) {
    if (this.users) {
      this.getAllUsers();
    }
  }

  //query for all users
  getAllUsers(){
    this.http.get<{[id: string] : Users}>('https://demo.sibers.com/users').pipe(map(result => {
      return Object.keys(result).map(id => {
        const users = result[id];
        return new Users(
          users.name,
          users.username,
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
        localStorage.setItem('users', JSON.stringify(this.users));
        this.usersChange.next(this.users.slice());
      });
  }

  //get user from localStorage by index
  getUserFromStorage(id: number){
    const userData: any = localStorage.getItem('users');
    this.localUsers = JSON.parse(userData);
    this.localUsers.forEach(item => {
      if(id === item.id) {
        this.user = item;
      }
    })
    this.userChange.next(this.user);
  }

  // users get of localStorage
  getUsersLocalStorage(users: Users[]) {
    this.users = users;
    this.usersChange.next(this.users.slice());
  }
}
