import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ChatComponent } from './components/chat/chat.component'; 


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  }, // I observed that I should use either this or app-homepage selector in app.component.html
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
