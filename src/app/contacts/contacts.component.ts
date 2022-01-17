import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../shared/users.service';
import { Users } from '../shared/users.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  users: Users [] = [];
  localUsers: Users[] = [];
  usersSubscription!: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersSubscription = this.usersService.usersChange.subscribe((data: Users[]) => {
      this.users = data;
      this.sendUsersToStorage();
    })
    this.usersService.getAllUsers();
    this.getUsersFromStorage();
  }

  sendUsersToStorage(){
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  getUsersFromStorage() {
    const users: any = localStorage.getItem('users');
    this.localUsers = JSON.parse(users);
  }

  ngOnDestroy(){
    this.usersSubscription.unsubscribe();
  }
}
