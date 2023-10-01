import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSecondaryResultComponent } from './delete-secondary-result.component';

describe('DeleteSecondaryResultComponent', () => {
  let component: DeleteSecondaryResultComponent;
  let fixture: ComponentFixture<DeleteSecondaryResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSecondaryResultComponent]
    });
    fixture = TestBed.createComponent(DeleteSecondaryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
