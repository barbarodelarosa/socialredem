import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
  access_token:any='';
  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
    const token = localStorage.getItem('access_token');
    console.log('El token es:',token);
    if (!token) {
      return next.handle(req);
    }
    const headers = req.headers
    .set('Authorization', `Bearer ${token}`)
    console.log('El header es:',headers);   
    const authReq = req.clone({ headers, withCredentials:true});
    return next.handle(authReq);
  }
  

}