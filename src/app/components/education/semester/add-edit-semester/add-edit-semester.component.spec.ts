import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSemesterComponent } from './add-edit-semester.component';

describe('AddEditSemesterComponent', () => {
  let component: AddEditSemesterComponent;
  let fixture: ComponentFixture<AddEditSemesterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSemesterComponent]
    });
    fixture = TestBed.createComponent(AddEditSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
