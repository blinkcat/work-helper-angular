import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';

import { ScrollerComponent } from './scroller.component';

describe('ScrollerComponent', () => {
  let fixture: ComponentFixture<ScrollerComponent>;
  let component: ScrollerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [ScrollerComponent]
    });

    fixture = TestBed.createComponent(ScrollerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
