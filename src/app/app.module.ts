import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {InputtextComponent} from "./components/inputtext/inputtext.component";
import {CompleteComponent} from './components/complete/complete.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CompExtComponent} from './components/header/comp-ext/comp-ext.component';
import {LoginComponent} from './login/login.component';
import {RouterModuleModule} from "./router-module/router-module.module";
import {ToDoComponent} from './to-do/to-do.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { AuthInterceptorService } from './auth-inspector.service';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MenuComponent } from './components/menu/menu.component';
import {StyleManagerService} from "./services/style-manager.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ChatComponent } from './chat/chat.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {SocketIoService} from "./services/socket.io.service";
import {ScrollToBottomDirective} from "./directives/scroll-to-bottom.directive";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        RouterModuleModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatInputModule,
        MatButtonToggleModule,
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        InputtextComponent,
        CompleteComponent,
        TasksComponent,
        CompExtComponent,
        LoginComponent,
        ToDoComponent,
        MenuComponent,
        ChatComponent,
        ScrollToBottomDirective
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        StyleManagerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
