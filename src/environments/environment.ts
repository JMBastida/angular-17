import {InjectionToken} from "@angular/core";

export const API_URL = new InjectionToken<string>('API_URL');

export const environment = {
  production: false,
  apiBaseUrl: 'https://exam.development.cafler.com'
}
