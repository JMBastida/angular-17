import {inject, Injectable, signal} from '@angular/core';
import {API_URL} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoutesModel} from "../../features/routes/models/routes.model";
import {RidersModel} from "../models/riders.model";
import {OrderModel} from "../../features/orders/models/order.model";

@Injectable({
  providedIn: 'root'
})
export class RidersService {
  ridersSignal = signal<RidersModel[]>([]);
  apiBaseUrl = inject(API_URL);
  http = inject(HttpClient);

  fetchAvailableRiders(): void {
    this.http.get<RidersModel[]>(`${this.apiBaseUrl}/riders`).subscribe(rider => {
      this.ridersSignal.set(rider);
    });;
  }
}
