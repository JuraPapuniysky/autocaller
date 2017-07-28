import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNumberComponent } from './update-number.component';

describe('UpdateNumberComponent', () => {
  let component: UpdateNumberComponent;
  let fixture: ComponentFixture<UpdateNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
