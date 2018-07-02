import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclientdialogComponent } from './addclientdialog.component';

describe('AddclientdialogComponent', () => {
  let component: AddclientdialogComponent;
  let fixture: ComponentFixture<AddclientdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddclientdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclientdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
