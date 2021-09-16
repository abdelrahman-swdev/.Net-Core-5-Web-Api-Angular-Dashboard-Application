import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn:'root'
})
export class TokenInterceptorService implements HttpInterceptor{

    constructor(private authService:AuthService,private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.authService.getCurrentToken();
        req.headers
        let tokenizedReq = req.clone({
            setHeaders:{
                'Authorization':`Bearer ${token}`
            }
        });
        return next.handle(tokenizedReq).pipe(catchError(e => this.handleAuthError(e)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401) {
            //navigate /delete stored data in local storage
            this.router.navigateByUrl('/user/login');
            localStorage.clear();
        }
        return throwError(err);
    }
}