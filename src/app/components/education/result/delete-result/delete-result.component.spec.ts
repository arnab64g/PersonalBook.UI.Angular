import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResultComponent } from './delete-result.component';

describe('DeleteResultComponent', () => {
  let component: DeleteResultComponent;
  let fixture: ComponentFixture<DeleteResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteResultComponent]
    });
    fixture = TestBed.createComponent(DeleteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
