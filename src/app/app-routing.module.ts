import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { EditContactsComponent } from './edit-contacts/edit-contacts.component';

const routes: Routes = [
  {path: '', component: ContactsComponent},
  {path: ':id', component: EditContactsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
