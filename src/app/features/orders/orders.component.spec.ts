import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrdersService } from './orders.service';
import {asyncScheduler, of, scheduled} from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "../../shared/shared.module";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {API_URL} from "../../../environments/environment";
import {OrderModel} from "./models/order.model";
import {provideRouter, Router} from "@angular/router";
import {signal} from "@angular/core";

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let ordersServiceStub: Partial<OrdersService>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    ordersServiceStub = {
      fetchTomorrowOrders: () => scheduled(of([{productName: "test", price: 17.05, orderId: "1", deliveryLocation: {latitude: 47.5951518,longitude:-122.3316393}}]), asyncScheduler), // Mock the service method to return an observable of an empty array
      ordersSignal: signal<OrderModel[]>([{productName: "test", price: 17.05, orderId: "1", deliveryLocation: {latitude: 47.5951518,longitude:-122.3316393}}])
    };

    TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      providers: [
        {provide: OrdersService, useValue: ordersServiceStub},
        provideRouter([])
      ],
      imports: [SharedModule, BrowserAnimationsModule]
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  it('should create the component', waitForAsync(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it('should set page title correctly in h3 when title is provided', fakeAsync(() => {
    router.resetConfig([
      {
        path: '',
        title: 'Recent orders',
        component: OrdersComponent
      }
    ]);
    router.navigateByUrl('/');
    tick();
    fixture = TestBed.createComponent(OrdersComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    discardPeriodicTasks();

    expect(compiled.querySelector('h3').textContent).toContain('Recent orders');
  }));

  it('should fetch orders on ngOnInit', waitForAsync(() => {
    const spy = spyOn<Partial<OrdersService>, any>(ordersServiceStub,'fetchTomorrowOrders')
    fixture = TestBed.createComponent(OrdersComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    expect(ordersServiceStub.fetchTomorrowOrders).toHaveBeenCalled();
  }));

  afterEach(() => {
    fixture.destroy();
  });

});

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let httpTestingController: HttpTestingController;
  const orders: OrderModel[] = [
    {productName: "test", price: 17.05, orderId: "1", deliveryLocation: {latitude: 47.5951518,longitude:-122.3316393}}
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService, { provide: API_URL, useValue: 'https://example.com/api' }]
    });

    ordersService = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(ordersService).toBeTruthy();
  });

  it('should fetch tomorrow orders', () => {

    ordersService.fetchTomorrowOrders();

    const req = httpTestingController.expectOne('https://example.com/api/orders');
    expect(req.request.method).toBe('GET');

    req.flush(orders);

    expect(ordersService.ordersSignal()).toEqual(orders);
  });

});
