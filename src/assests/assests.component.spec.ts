import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestsComponent } from './assests.component';

describe('AssestsComponent', () => {
  let component: AssestsComponent;
  let fixture: ComponentFixture<AssestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
