import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLayoutComponent } from './audit-layout.component';

describe('AuditLayoutComponent', () => {
  let component: AuditLayoutComponent;
  let fixture: ComponentFixture<AuditLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
