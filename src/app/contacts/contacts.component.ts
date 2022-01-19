import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    //subscribing event by users change
    this.usersSubscription = this.usersService.usersChange.subscribe((data: Users[]) => {
      this.users = data.sort((a,b) => {
        if (a.name < b.name) {return -1}
        if (a.name > b.name) {return 1}
        return 0;
      })
    });
    this.changeArrayUsers(); //method call on user array changes
  }

  //users array changes and sort alphabetically
  changeArrayUsers() {
    const result: any = localStorage.getItem('users');
    let users = JSON.parse(result);
    this.users = users.sort((a:any,b:any) => {
      if (a.name < b.name) {return -1}
      if (a.name > b.name) {return 1}
      return 0;
    });
  }

  // getting index by clicked user
  getUserIndex(id: number){
    this.usersService.getUserFromStorage(id);
  }

  // search user
  searchContact() {
    const element = document.querySelectorAll('li');
    const value = this.searchInput.nativeElement.value.trim();

    if(value !== '') {
      element.forEach(item => {
        if(item.innerText.toLocaleLowerCase().search(value) === -1){
          item.classList.add('hide');
        }else{
          item.classList.remove('hide');
        }
      })
    }else{
      element.forEach(item => {
        item.classList.remove('hide');
      })
    }
  }

  // unsubscribing from events
  ngOnDestroy(){
    this.usersSubscription.unsubscribe();
  }
}
