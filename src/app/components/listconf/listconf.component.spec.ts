import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconfComponent } from './listconf.component';

describe('ListconfComponent', () => {
  let component: ListconfComponent;
  let fixture: ComponentFixture<ListconfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListconfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListconfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
