import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySurveyComponent } from './city-survey.component';

describe('CitySurveyComponent', () => {
  let component: CitySurveyComponent;
  let fixture: ComponentFixture<CitySurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitySurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
