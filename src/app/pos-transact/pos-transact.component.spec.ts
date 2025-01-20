import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosTransactComponent } from './pos-transact.component';

describe('PosTransactComponent', () => {
  let component: PosTransactComponent;
  let fixture: ComponentFixture<PosTransactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosTransactComponent]
    });
    fixture = TestBed.createComponent(PosTransactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
