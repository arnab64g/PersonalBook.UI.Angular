import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSemesterComponent } from './delete-semester.component';

describe('DeleteSemesterComponent', () => {
  let component: DeleteSemesterComponent;
  let fixture: ComponentFixture<DeleteSemesterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSemesterComponent]
    });
    fixture = TestBed.createComponent(DeleteSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
