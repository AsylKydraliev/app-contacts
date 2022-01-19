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
  usersSubscription!: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersSubscription = this.usersService.usersChange.subscribe((data: Users[]) => {
      this.users = data.sort((a,b) => {
        if (a.name < b.name) {return -1}
        if (a.name > b.name) {return 1}
        return 0;
      })
    });
    this.changeArrayUsers();
  }

  changeArrayUsers() {
    const result: any = localStorage.getItem('users');
    let users = JSON.parse(result);
    this.users = users.sort((a:any,b:any) => {
      if (a.name < b.name) {return -1}
      if (a.name > b.name) {return 1}
      return 0;
    });
  }

  getUserIndex(index: number){
    this.usersService.getUserFromStorage(index);
  }

  ngOnDestroy(){
    this.usersSubscription.unsubscribe();
  }
}
