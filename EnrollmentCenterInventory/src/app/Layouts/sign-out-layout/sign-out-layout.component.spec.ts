import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutLayoutComponent } from './sign-out-layout.component';

describe('SignOutLayoutComponent', () => {
  let component: SignOutLayoutComponent;
  let fixture: ComponentFixture<SignOutLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignOutLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignOutLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
