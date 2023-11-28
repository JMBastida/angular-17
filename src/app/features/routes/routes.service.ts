import {inject, Injectable, signal} from '@angular/core';
import {API_URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoutesModel} from "./models/routes.model";

@Injectable()
export class RoutesService {
  routesSignal = signal<RoutesModel[]>([]);

  apiBaseUrl = inject(API_URL);
  http = inject(HttpClient);

  fetchOptimizedRoutes(): void {
    this.http.get<RoutesModel[]>(`${this.apiBaseUrl}/optimized-routes`).subscribe(
      route =>{
        this.routesSignal.set(route);
      }
    );
  }

  updateRoutes(routes: RoutesModel[]): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/route-updated`, routes);
  }
}
