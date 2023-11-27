import {Injectable} from '@angular/core';
import {
  HttpInterceptorFn
} from '@angular/common/http';
import {catchError, retry, throwError, timer} from "rxjs";

/* Playing with function based interceptors */

const retryNotifier = (err: Error) =>  {
  const isServerError = err.message.includes('500');
  console.log(isServerError, "RETRY")
  return isServerError ? timer(2000) : throwError(() => err);
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) =>{
      console.log("interceptor errors")
      if (error.status === 400){
        console.log("error 400")
      }
      if (error.status === 500){
        console.log("error 500")
      }
      const e = error.error.message|| error.statusText;
      console.log(e.message);

      return throwError(() => error);
    }),
    retry({delay: (err) => retryNotifier(err)})
  )
}

