import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoComponent } from './components/info/info.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ActionComponent } from './components/action/action.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from './components/popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChatComponent } from './components/chat/chat.component';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    HomepageComponent,
    ActionComponent,
    PopupComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule/*,
    ReactiveFormsModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
