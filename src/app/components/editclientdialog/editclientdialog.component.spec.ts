import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclientdialogComponent } from './editclientdialog.component';

describe('EditclientdialogComponent', () => {
  let component: EditclientdialogComponent;
  let fixture: ComponentFixture<EditclientdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditclientdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditclientdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
