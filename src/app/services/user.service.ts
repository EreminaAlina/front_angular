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
        return this.http.post('http://localhost:1234/user/login', body);
    }

    signUp(data){
        return this.http.post('http://localhost:1234/user/signup', data)
    }

}