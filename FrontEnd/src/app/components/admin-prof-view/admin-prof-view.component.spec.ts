import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfViewComponent } from './admin-prof-view.component';

describe('AdminProfViewComponent', () => {
  let component: AdminProfViewComponent;
  let fixture: ComponentFixture<AdminProfViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProfViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
