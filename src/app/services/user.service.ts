import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {UserInterface} from "../interfaces/User.interface";
@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient){ }


    signIn(user: UserInterface){
        const body = {login: user.login, password: user.password};
        return this.http.post('http://192.168.88.248:1234/user/login', body);
    }

    signUp(data){
        return this.http.post('http://192.168.88.248:1234/user/signup', data)
    }

    refreshToken() {
        const refresh_token: string = localStorage.getItem('refresh_token');
        const body = {refresh_token};
        return this.http.post('http://192.168.88.248:1234/user/token/refresh', body);
    }

    saveTheme(theme){
        const body = {theme};
        return this.http.post('http://192.168.88.248:1234/user/selectTheme', body).subscribe();
    }
}
