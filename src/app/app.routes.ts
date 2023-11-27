import {mapToResolve, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {RoutesComponent} from "./features/routes/routes.component";
import {orderResolver} from "./core/resolvers/optimiced-routes.resolver.ts.resolver";
import {OrderModel} from "./features/orders/models/order.model";

export const routes: Routes = [
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
  //{ path: '**', component: AppComponent },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule),
    title: 'Recent orders'
  },
  {
    path: 'routes',
    resolve: { ordersResolver: orderResolver },//need to assign orders before optimiced routes
    loadChildren: () => import('./features/routes/routes.module').then((x) => x.RoutesModule),
    title: 'Order routes'
  }
  /*{
    path: 'routes',
    loadComponent: () => import('./features/routes/routes.component').then((x) => x.RoutesComponent),
    title: 'Order routes'
  }*/
];
