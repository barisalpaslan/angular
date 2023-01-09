import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTypesComponent } from './stock-types.component';

describe('StockTypesComponent', () => {
  let component: StockTypesComponent;
  let fixture: ComponentFixture<StockTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
