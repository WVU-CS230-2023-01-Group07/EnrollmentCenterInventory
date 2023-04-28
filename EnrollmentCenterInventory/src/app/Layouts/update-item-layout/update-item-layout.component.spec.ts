import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateItemLayoutComponent } from './update-item-layout.component';

describe('UpdateItemLayoutComponent', () => {
  let component: UpdateItemLayoutComponent;
  let fixture: ComponentFixture<UpdateItemLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateItemLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateItemLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
