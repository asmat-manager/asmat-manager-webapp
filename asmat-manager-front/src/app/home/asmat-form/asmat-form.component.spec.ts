import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmatFormComponent } from './asmat-form.component';

describe('AsmatFormComponent', () => {
  let component: AsmatFormComponent;
  let fixture: ComponentFixture<AsmatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsmatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsmatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
