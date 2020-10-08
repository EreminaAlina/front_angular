import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpClient
} from '@angular/common/http';
import {catchError, filter, take, switchMap, finalize} from "rxjs/operators";
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {UserService} from "./services/user.service";
import {TokensInterface} from "./interfaces/tokens";
import {Router} from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );


    constructor(private userServ: UserService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Interception In Progress ", req); //SECTION 1
        const access_token: string = localStorage.getItem('access_token');
        req = req.clone(
            {headers: req.headers.set('Authorization', 'Bearer ' + access_token)});
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error && error.status === 401) {
                        // 401 errors are most likely going to be because we have an expired token that we need to refresh.
                        if (this.refreshTokenInProgress) {
                            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                            // which means the new token is ready and we can retry the request again
                            return this.refreshTokenSubject.pipe(
                                filter(result => result !== null),
                                take(1),
                                switchMap(() => {
                                    return next.handle(req.clone(
                                        {headers: req.headers.set('Authorization', 'Bearer ' + access_token)}))
                                })
                            );
                        } else {
                            this.refreshTokenInProgress = true;
                            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                            this.refreshTokenSubject.next(null);
                            return this.userServ.refreshToken().pipe(
                                switchMap((success: TokensInterface) => {
                                    this.refreshTokenSubject.next(success.newToken);
                                    localStorage.setItem('access_token', success.newToken);
                                    localStorage.setItem('refresh_token', success.newRToken);
                                    return next.handle(req.clone(
                                        {headers: req.headers.set('Authorization', 'Bearer ' + success.newToken)}));
                                }),
                                // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                                // for the next time the token needs to be refreshed
                                finalize(() => (this.refreshTokenInProgress = false))
                            );
                        }
                    } else if (error && error.status === 403) {
                        localStorage.clear();
                        this.refreshTokenInProgress = false;
                        this.router.navigate(['/login']);
                    } else {
                        return throwError(error);
                    }
                })
            );
    }
}