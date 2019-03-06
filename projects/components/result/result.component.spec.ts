import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';

import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let fixture: ComponentFixture<ResultComponent>;
  let component: ResultComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule],
      declarations: [ResultComponent]
    });

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
