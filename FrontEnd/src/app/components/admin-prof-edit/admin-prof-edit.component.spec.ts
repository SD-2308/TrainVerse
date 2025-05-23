import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfEditComponent } from './admin-prof-edit.component';

describe('AdminProfEditComponent', () => {
  let component: AdminProfEditComponent;
  let fixture: ComponentFixture<AdminProfEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProfEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProfEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
