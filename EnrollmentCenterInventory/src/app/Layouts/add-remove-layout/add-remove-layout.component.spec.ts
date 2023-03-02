import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveLayoutComponent } from './add-remove-layout.component';

describe('AddRemoveLayoutComponent', () => {
  let component: AddRemoveLayoutComponent;
  let fixture: ComponentFixture<AddRemoveLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemoveLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRemoveLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
