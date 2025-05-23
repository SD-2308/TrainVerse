import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailssComponent } from './course-detailss.component';

describe('CourseDetailssComponent', () => {
  let component: CourseDetailssComponent;
  let fixture: ComponentFixture<CourseDetailssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseDetailssComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
