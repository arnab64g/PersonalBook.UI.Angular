import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSecondaryResultComponent } from './add-edit-secondary-result.component';

describe('AddEditSecondaryResultComponent', () => {
  let component: AddEditSecondaryResultComponent;
  let fixture: ComponentFixture<AddEditSecondaryResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSecondaryResultComponent]
    });
    fixture = TestBed.createComponent(AddEditSecondaryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
