/*
import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return next(cloned);
  }

  return next(req);
};*/

/*
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: token  // Token includes "Bearer ..."
      }
    });
    return next(cloned);
  }

  return next(req);
};

*/

/*
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const publicUrls = [
    '/api/customers/login',
    '/api/customers/register',
    '/api/customers/logout',
    '/api/washers/login',
    '/api/washers/register'
  ];

  const isPublic = publicUrls.some(url => req.url.includes(url));

  // ✅ Only attach Authorization if it's not a public route and token is valid
  if (!isPublic && token && token.trim() !== '') {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // ✅ Otherwise, send the request unmodified
  return next(req);
};
*/
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const publicUrls = [
    '/api/customers/login',
    '/api/customers/register',
    '/api/customers/logout',
    '/api/washers/login',
    '/api/washers/register'
  ];

  const isPublic = publicUrls.some(url => req.url.includes(url));

  // ✅ Only attach valid token with exactly 2 periods
  const isValidToken = token && token.split('.').length === 3;

  if (!isPublic && isValidToken) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
