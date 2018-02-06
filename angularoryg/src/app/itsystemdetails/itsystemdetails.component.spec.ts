import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItSystemDetailsComponent } from './itsystemdetails.component';

describe('ItsystemdetailsComponent', () => {
  let component: ItSystemDetailsComponent;
  let fixture: ComponentFixture<ItSystemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItSystemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItSystemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
