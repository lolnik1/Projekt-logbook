import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItSystemsListComponent } from './itsystemslist.component';

describe('ItsystemslistComponent', () => {
  let component: ItSystemsListComponent;
  let fixture: ComponentFixture<ItSystemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItSystemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItSystemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
