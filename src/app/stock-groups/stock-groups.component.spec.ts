import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockGroupsComponent } from './stock-groups.component';

describe('StockGroupsComponent', () => {
  let component: StockGroupsComponent;
  let fixture: ComponentFixture<StockGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
