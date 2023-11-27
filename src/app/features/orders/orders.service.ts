import {inject, Injectable, signal} from "@angular/core";
import {OrderModel} from "./models/order.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../../environments/environment";

@Injectable()
export class OrdersService {
  ordersSignal = signal<OrderModel[]>([]);

  apiBaseUrl = inject(API_URL);
  http = inject(HttpClient);

  fetchTomorrowOrders(): void {
    this.http.get<OrderModel[]>(`${this.apiBaseUrl}/orders`).subscribe(order => {
      this.ordersSignal.set(order);
    });
  }
}
