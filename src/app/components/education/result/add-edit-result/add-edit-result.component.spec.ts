import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditResultComponent } from './add-edit-result.component';

describe('AddEditResultComponent', () => {
  let component: AddEditResultComponent;
  let fixture: ComponentFixture<AddEditResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditResultComponent]
    });
    fixture = TestBed.createComponent(AddEditResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
