import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RoutesComponent} from "./routes.component";
import {RoutesRoutingModule} from "./routes-routing.module";
import {RoutesService} from "./routes.service";
@NgModule({
  declarations: [RoutesComponent],
  imports: [
    SharedModule,
    RoutesRoutingModule
  ],
  providers: [
    RoutesService
  ]
})
export class RoutesModule { }
