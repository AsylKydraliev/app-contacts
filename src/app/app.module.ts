import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EditContactsComponent } from './edit-contacts/edit-contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found.component';
import { stopPropagationDirective } from './shared/stopPropagation.directive';
import { PhoneValidatorDirective } from './shared/phoneValidator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    EditContactsComponent,
    HomeComponent,
    NotFoundComponent,
    stopPropagationDirective,
    PhoneValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
