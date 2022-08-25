import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { KLineChartIteamThumbnailComponent } from './kline-chart-iteam-thumbnail.component';

describe('KLineChartIteamThumbnailComponent', () => {
  let component: KLineChartIteamThumbnailComponent;
  let fixture: ComponentFixture<KLineChartIteamThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ KLineChartIteamThumbnailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KLineChartIteamThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
