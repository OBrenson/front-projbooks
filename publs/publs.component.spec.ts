import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublsComponent } from './publs.component';

describe('PublsComponent', () => {
  let component: PublsComponent;
  let fixture: ComponentFixture<PublsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublsComponent]
    });
    fixture = TestBed.createComponent(PublsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
