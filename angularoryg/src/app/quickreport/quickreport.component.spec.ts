import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickreportComponent } from './quickreport.component';

describe('QuickreportComponent', () => {
  let component: QuickreportComponent;
  let fixture: ComponentFixture<QuickreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
