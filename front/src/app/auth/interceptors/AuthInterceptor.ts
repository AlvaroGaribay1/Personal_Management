import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Observable } from 'rxjs';

// Interceptor como función, con los tipos adecuados
export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn // Usamos HttpHandlerFn en lugar de HttpHandler
): Observable<HttpEvent<any>> => {
  const tokenService = inject(TokenService); // Usar 'inject' para inyectar dependencias
  const token = tokenService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned); // Pasar la solicitud clonada al siguiente manejador
  }

  return next(req); // Pasar la solicitud original si no hay token
};
