import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionPageComponent } from './add-question-page.component';

describe('AddQuestionPageComponent', () => {
  let component: AddQuestionPageComponent;
  let fixture: ComponentFixture<AddQuestionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
