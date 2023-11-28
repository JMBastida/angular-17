import { TestBed } from '@angular/core/testing';

import { RoutesService } from './routes.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RoutesModel} from "./models/routes.model";
import {API_URL} from "../../../environments/environment";

describe('RoutesService', () => {
  let service: RoutesService;
  let httpTestingController: HttpTestingController;
  const mockRoutes: RoutesModel[] = [
    { routeId: "1", driverId: 'driver 1', productsToDeliver: [{orderId: "3"}, {orderId: "4"}] },
    { routeId: "2", driverId: 'driver 2', productsToDeliver: [{orderId: "1"}] },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RoutesService,
        { provide: API_URL, useValue: 'https://example.com/api' }
      ]
    });

    service = TestBed.inject(RoutesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch optimized routes', () => {
    service.fetchOptimizedRoutes();

    const req = httpTestingController.expectOne('https://example.com/api/optimized-routes');
    expect(req.request.method).toBe('GET');

    req.flush(mockRoutes);

    expect(service.routesSignal()).toEqual(mockRoutes);
  });

  it('should update routes', () => {

    const expectedResponse = { success: true };

    service.updateRoutes(mockRoutes).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne('https://example.com/api/route-updated');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRoutes);

    req.flush(expectedResponse);
  });
});
