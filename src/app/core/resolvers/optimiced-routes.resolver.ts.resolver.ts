import {ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {OrderModel} from "../../features/orders/models/order.model";
import {OrdersService} from "../../features/orders/orders.service";

export const orderResolver: ResolveFn<OrderModel[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const orders = inject(OrdersService).ordersSignal();
  if (orders.length > 0) {
    return orders;
  }

  inject(Router).navigate(["/"]);
  return orders;
};
