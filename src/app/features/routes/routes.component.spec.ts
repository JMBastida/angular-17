import {ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { RoutesComponent } from './routes.component';
import {ActivatedRoute, provideRouter, Router} from "@angular/router";
import {RoutesService} from "./routes.service";
import {RidersService} from "../../core/services/riders.service";
import {Title} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of, throwError} from "rxjs";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {signal} from "@angular/core";
import {RoutesModel} from "./models/routes.model";
import {RidersModel} from "../../core/models/riders.model";
import {SharedModule} from "../../shared/shared.module";
import {OrdersComponent} from "../orders/orders.component";

describe('RoutesComponent', () => {
  let component: RoutesComponent;
  let fixture: ComponentFixture<RoutesComponent>;
  let router: Router;
  let titleService: Title;
  let mockActivatedRoute: any;
  let mockRoutesService: any;
  let mockRiderService: any;
  let mockSnackBar: any;
  const mockRoutes: RoutesModel[] = [
    { routeId: "1", driverId: 'driver 1', productsToDeliver: [{orderId: "3"}, {orderId: "4"}] },
    { routeId: "2", driverId: 'driver 2', productsToDeliver: [{orderId: "1"}] },
  ];

  beforeEach(() => {
    mockActivatedRoute = {
      data: of({ ordersResolver: [{productName: "test", price: 17.05, orderId: "1", deliveryLocation: {latitude: 47.5951518,longitude:-122.3316393}}] }),
    };

    mockRoutesService = {
      routesSignal: signal<RoutesModel[]>(mockRoutes),
      fetchOptimizedRoutes: jasmine.createSpy('fetchOptimizedRoutes'),
      updateRoutes: jasmine.createSpy('updateRoutes').and.returnValue(of({})),
    };

    mockRiderService = {
      ridersSignal: signal<RidersModel[]>([{driverId:"rider id", driverName:"Test driver", initialLocation: {latitude:47.5951518,longitude:-122.3316393}}]),
      fetchAvailableRiders: jasmine.createSpy('fetchAvailableRiders'),
    };

    mockSnackBar = {
      open: jasmine.createSpy('open'),
    };

    TestBed.configureTestingModule({
      declarations: [RoutesComponent],
      imports: [SharedModule],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: RoutesService, useValue: mockRoutesService },
        { provide: RidersService, useValue: mockRiderService },
        Title,
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    });
    titleService = TestBed.inject(Title);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(RoutesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch optimized routes and available riders on initialization', () => {
    fixture.detectChanges();
    expect(mockRoutesService.fetchOptimizedRoutes).toHaveBeenCalled();
    expect(mockRiderService.fetchAvailableRiders).toHaveBeenCalled();
  });

  it('h2 should be like title when is provided', fakeAsync(() => {
    router.resetConfig([
      {
        path: 'routes',
        title: 'Order routes',
        component: RoutesComponent
      }
    ]);
    router.navigateByUrl('/routes');
    tick();
    fixture = TestBed.createComponent(RoutesComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    discardPeriodicTasks();
    //TODO: cambniar en template a usar variable title y no texto fijo si no fallara
    expect(compiled.querySelector('h2').textContent).toContain('Order routes');
  }));

  it('should drop items correctly', () => {
    const dropEvent = {
      previousContainer: { data: [] },
      container: { data: [undefined] },
      previousIndex: 0,
      currentIndex: 1,
    } as CdkDragDrop<any>;

    component.drop(dropEvent);
    expect(dropEvent.container.data.length).toBe(1);
    expect(dropEvent.container.data[0]).toBeUndefined();
  });


  it('should handle error when saving routes', async () => {
    mockRoutesService.updateRoutes.and.returnValue(throwError({ message: 'Error message' }));
    await component.saveRoutes();
    expect(mockSnackBar.open).toHaveBeenCalledWith('Error message');
  });

  it('should get order name from id', () => {
    const orderId = '1';
    const productName = 'test';

    const result = component.getOrderNameFromId(orderId);

    expect(result).toBe(productName);
  });

  it('should return "Unknown" for unknown order id', () => {
    const orderId = '123';
    const result = component.getOrderNameFromId(orderId);

    expect(result).toBe('Unknown');
  });

  it('should get rider name from id', () => {
    const driverId = 'rider id';
    const driverName = 'Test driver';
    const result = component.getRiderNameFromId(driverId);

    expect(result).toBe(driverName);
  });

  it('should return "Unknown" for unknown rider id', () => {
    const driverId = 'test1234';
    const result = component.getRiderNameFromId(driverId);

    expect(result).toBe('Unknown');
  });
});
