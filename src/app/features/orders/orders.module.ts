import { NgModule } from '@angular/core';
import {OrdersService} from "./orders.service";
import {OrdersComponent} from "./orders.component";
import {OrdersRoutes} from "./orders-routing.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [OrdersComponent],
  imports: [SharedModule, OrdersRoutes]
})
export class OrdersModule { }
