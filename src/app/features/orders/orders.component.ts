import {ChangeDetectionStrategy, Component, computed, inject, OnInit, Signal} from '@angular/core';
import {OrdersService} from "./orders.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-orders',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{

  orders$ = this.ordersService.ordersSignal;
  displayedColumns = ['name', 'price', 'location'];
  title = 'Orders';
  constructor(private ordersService: OrdersService, private titleService: Title) {
    this.ordersService.fetchTomorrowOrders();
  }
  ngOnInit() {
    this.title = this.titleService.getTitle();
  }

  isOrdersNotEmpty = computed(() => this.orders$().length > 0);

}
