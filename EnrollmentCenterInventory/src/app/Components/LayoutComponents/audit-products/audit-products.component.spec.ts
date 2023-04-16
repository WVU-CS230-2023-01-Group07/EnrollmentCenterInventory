import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditProductsComponent } from './audit-products.component';

describe('AuditProductsComponent', () => {
  let component: AuditProductsComponent;
  let fixture: ComponentFixture<AuditProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
