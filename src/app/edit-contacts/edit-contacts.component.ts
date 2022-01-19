import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Users } from '../shared/users.model';
import { UsersService } from '../shared/users.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-contacts',
  templateUrl: './edit-contacts.component.html',
  styleUrls: ['./edit-contacts.component.css']
})
export class EditContactsComponent implements OnInit, OnDestroy {
  user!: Users;
  userSubscription!: Subscription;
  index!: number;
  @ViewChild('userForm') userForm!: NgForm;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(){
    this.userSubscription = this.usersService.userChange.subscribe((user: Users) => {
      this.user = user;

      if(this.user) {
        this.setFormValue({
          name: this.user.name,
          phone: this.user.phone,
          email: this.user.email,
        })
      }else{
        this.setFormValue({
          name: '',
          phone: '',
          email: '',
        })
      }
    })
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.usersService.getUserFromStorage(params['id']);
        this.index = params['id'];
      }
    })
  }

  setFormValue(value: {[key: string]: any}) {
    setTimeout(() => {
      this.userForm.setValue(value);
    })
  }

  Save() {
    const user = this.userForm.form.value;
    const result: any = localStorage.getItem('users');
    const users: any = JSON.parse(result);
    users[this.index].name = user.name;
    users[this.index].phone = user.phone;
    users[this.index].email = user.email;
    this.changeArrayLocalStorage(users);
  }

  changeArrayLocalStorage(users: Users[]) {
    this.usersService.getUsersLocalStorage(users);
    localStorage.clear();
    localStorage.setItem('users', JSON.stringify(users));
    void this.router.navigate(['/']);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
