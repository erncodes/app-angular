import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosManagementComponent } from './pos-management.component';

describe('PosManagementComponent', () => {
  let component: PosManagementComponent;
  let fixture: ComponentFixture<PosManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosManagementComponent]
    });
    fixture = TestBed.createComponent(PosManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
