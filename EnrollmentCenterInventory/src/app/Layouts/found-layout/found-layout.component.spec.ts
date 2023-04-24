import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundLayoutComponent } from './found-layout.component';

describe('FoundLayoutComponent', () => {
  let component: FoundLayoutComponent;
  let fixture: ComponentFixture<FoundLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
