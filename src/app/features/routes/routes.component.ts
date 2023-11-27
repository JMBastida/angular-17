import {ChangeDetectionStrategy, Component, Input, OnInit, Signal} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {RoutesService} from "./routes.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderModel} from "../orders/models/order.model";
import {OrdersService} from "../orders/orders.service";
import {map, Observable, of, take} from "rxjs";
import {RidersService} from "../../core/services/riders.service";
import {ActivatedRoute} from "@angular/router";
import {RidersModel} from "../../core/models/riders.model";

@Component({
  selector: 'app-routes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss'
})
export class RoutesComponent implements OnInit{
  //private readonly svc = inject(SignalStore<RoutesState>);
  routes$ = this.routesService.routesSignal;
  //Our resolver gives us the data
  orders$: Observable<OrderModel[]> = this.route.data.pipe(map(({ ordersResolver }) => ordersResolver));
  title = 'Routes';
  constructor(
    private route: ActivatedRoute,
    private routesService: RoutesService,
    private riderService: RidersService,
    private titleService: Title,
    private snackBar: MatSnackBar
  ) {
    this.routesService.fetchOptimizedRoutes();
    this.riderService.fetchAvailableRiders();
  }
  ngOnInit() {
    this.title = this.titleService.getTitle();
  }

  drop(event: CdkDragDrop<any>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  async saveRoutes(): Promise<void> {
    const update$ = this.routesService.updateRoutes(this.routes$()).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error)
        this.snackBar.open(error.message);
    }
  });
    /*await lastValueFrom(update$).catch((reason)=> {
      console.log(reason)
    });*/
  }

  getOrderNameFromId(id: string): string | undefined {
    let orderName;
    this.orders$.pipe(take(1)).subscribe(orders => {
      orderName = orders.find(order => order.orderId === id)?.productName ?? "Unknown";
    })
    return orderName;
  }

  getRiderNameFromId(id: string): string | undefined {
    return this.riderService.ridersSignal().find(rider => rider.driverId === id)?.driverName ?? "Unknown";
  }

}
