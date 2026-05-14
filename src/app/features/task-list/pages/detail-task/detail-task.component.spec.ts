import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTaskComponent } from './detail-task.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('DetailTaskComponent', () => {
  let component: DetailTaskComponent;
  let fixture: ComponentFixture<DetailTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTaskComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ idTemp: '234' })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
