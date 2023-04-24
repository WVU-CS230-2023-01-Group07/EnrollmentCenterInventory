import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNotFoundLayoutComponent } from './product-not-found-layout.component';

describe('ProductNotFoundLayoutComponent', () => {
  let component: ProductNotFoundLayoutComponent;
  let fixture: ComponentFixture<ProductNotFoundLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductNotFoundLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductNotFoundLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
