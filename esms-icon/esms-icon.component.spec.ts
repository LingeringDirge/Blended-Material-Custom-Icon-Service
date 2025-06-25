import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsmsIconComponent } from './esms-icon.component';

describe('EsmsIconComponent', () => {
  let component: EsmsIconComponent;
  let fixture: ComponentFixture<EsmsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsmsIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsmsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
