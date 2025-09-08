import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchConfirmEmailPassComponent } from './switch-confirm-email-pass.component';

describe('SwitchConfirmEmailPassComponent', () => {
  let component: SwitchConfirmEmailPassComponent;
  let fixture: ComponentFixture<SwitchConfirmEmailPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchConfirmEmailPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchConfirmEmailPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
