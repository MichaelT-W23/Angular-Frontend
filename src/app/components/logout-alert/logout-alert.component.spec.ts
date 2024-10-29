import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { LogoutAlertComponent } from './logout-alert.component';

describe('LogoutAlertComponent', () => {
  let component: LogoutAlertComponent;
  let fixture: ComponentFixture<LogoutAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutAlertComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

