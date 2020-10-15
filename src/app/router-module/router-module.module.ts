import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {ToDoComponent} from "../to-do/to-do.component";
import {YourGuardGuard} from "../guards/your-guard.guard";
import {ChatComponent} from "../chat/chat.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: '', component: ToDoComponent, canActivate: [YourGuardGuard] },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouterModuleModule { }

