import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemsLayoutComponent } from './search-items-layout.component';

describe('SearchItemsLayoutComponent', () => {
  let component: SearchItemsLayoutComponent;
  let fixture: ComponentFixture<SearchItemsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchItemsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchItemsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
