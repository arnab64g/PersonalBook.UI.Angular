import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGradePopupComponent } from './delete-grade-popup.component';

describe('DeleteGradePopupComponent', () => {
  let component: DeleteGradePopupComponent;
  let fixture: ComponentFixture<DeleteGradePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteGradePopupComponent]
    });
    fixture = TestBed.createComponent(DeleteGradePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
