import { Component, ElementRef, ViewChild } from '@angular/core';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private usersService: UsersService) {}

  // search contact method
  searchContact() {
    this.usersService.searchUser(this.searchInput.nativeElement.value);
  }
}
