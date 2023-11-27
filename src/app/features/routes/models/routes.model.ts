export interface RoutesModel {
  routeId: string;
  driverId: string;
  productsToDeliver: {orderId: string}[];
}

export interface RoutesState {
  routes: RoutesModel[];
}
