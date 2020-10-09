import {Component, OnInit, forwardRef} from '@angular/core';
import {UserInterface} from "../interfaces/User.interface";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {LoginResponse} from "../interfaces/LoginResponse";
import {ToastrService} from "ngx-toastr";
import {
    FormGroup, FormBuilder, Validators, FormControl,
} from "@angular/forms";
import {ThemeService} from "../services/theme.service";


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    host: {
        class: 'login_component'
    },

})
export class LoginComponent implements OnInit {

    loginFormGroup: FormGroup;


    curr: UserInterface = {
        login: '',
        password: ''
    };

    signingIn = true;
    passIsValid = true;
    logIsValid = true;

    constructor(
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService,
        private formBuilder: FormBuilder,
        private themeService: ThemeService,
    ) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.loginFormGroup = this.formBuilder.group({
            login: ['',
                [
                    Validators.required,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$'),
                ]
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.pattern("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).{6,20}$")

                ]
            ]
        });
    }

    switchSigning(): void {
        this.signingIn = !this.signingIn;
        this.curr = this.loginFormGroup.getRawValue()
    }


    signIn() {
        this.passIsValid = false;
        this.logIsValid = false;
        if (this.loginFormGroup.status === "VALID") {
            this.curr = this.loginFormGroup.getRawValue();
            this.userService.signIn(this.curr).subscribe(
                (data: LoginResponse) => {
                    localStorage.setItem('user', data.user.login);
                    localStorage.setItem('userId', data.user._id);
                    localStorage.setItem('access_token', data.user.access_token);
                    localStorage.setItem('refresh_token', data.user.refresh_token);
                    localStorage.setItem('theme', data.user.theme);

                    this.toastr.success(`Signed in as ${data.user.login}`, 'SUCCESS');
                    return this.router.navigate(['/']);
                },
                error => {
                    console.log(error)
                });
        } else
            if(this.loginFormGroup.controls.login.status === "INVALID"){
            this.toastr.warning('Wrong email', 'ERROR', {
                timeOut: 10000});
            if(this.loginFormGroup.controls.password.status === "INVALID"){
                this.toastr.warning('Wrong password', 'ERROR', {
                    timeOut: 10000});
            }
        }
        this.initForm();
    }

    saveUser() {
        if (this.loginFormGroup.status === "VALID") {
            const data = this.loginFormGroup.value;
            this.userService.signUp(data)
                .subscribe(
                    res => {
                        this.switchSigning();
                        this.toastr.success('New user is added', 'SUCCESS');
                    },
                    error => {
                        console.log(error);
                    }
                );
        } else {
            this.toastr.error('Cannot Sign UP', 'ERROR');
        }
        this.initForm();
    }
}
