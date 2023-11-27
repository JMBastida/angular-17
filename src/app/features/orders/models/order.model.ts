import {RoutesModel} from "../../routes/models/routes.model";

export interface OrderModel {
  orderId: string;
  productName: string;
  price: number;
  deliveryLocation: {
    latitude: number;
    longitude: number;
  }
}

export interface OrdersState {
  orders: OrderModel[];
}
