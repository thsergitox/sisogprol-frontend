import { TestBed } from '@angular/core/testing';

import { ProductospedidosService } from './productospedidos.service';

describe('ProductospedidosService', () => {
  let service: ProductospedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductospedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
