import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizPageComponent } from './add-quiz-page.component';

describe('AddQuizPageComponent', () => {
  let component: AddQuizPageComponent;
  let fixture: ComponentFixture<AddQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuizPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
