import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    intercept(req:HttpRequest<any>,next:HttpHandler){
        const userToken = localStorage.getItem('token');
        if(req.headers.get('skip')){
            return next.handle(req);
        }
        else{
            const modifiedReq = req.clone({headers:req.headers.set('Authorization',`Bearer ${userToken}`)});
            return next.handle(modifiedReq);
        }
        
    }
}