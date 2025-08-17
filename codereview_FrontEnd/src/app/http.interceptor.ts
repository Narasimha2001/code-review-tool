import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('interceptor called');
  // console.log(req);
  req = req.clone({
    url: `${environment.baseURL}/${req.url}`,
  });
  return next(req);
};
