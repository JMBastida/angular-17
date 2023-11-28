import { ApplicationConfig } from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';
import { routes } from './app.routes';
import {API_URL, environment} from "../environments/environment";
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {errorInterceptor} from "./core/interceptor/net-error.interceptor";
import {OrdersService} from "./features/orders/orders.service";
import {RidersService} from "./core/services/riders.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    {provide: OrdersService},
    {provide: RidersService},
    { provide: API_URL, useValue: environment.apiBaseUrl },
    provideAnimations(),
    provideHttpClient(withInterceptors([errorInterceptor]))
]
};
