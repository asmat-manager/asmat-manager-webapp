import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsmatComponent } from './add-asmat.component';

describe('AddAsmatComponent', () => {
  let component: AddAsmatComponent;
  let fixture: ComponentFixture<AddAsmatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAsmatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAsmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
