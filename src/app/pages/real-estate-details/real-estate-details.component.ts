import { Component, OnInit } from '@angular/core';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { RealEstate } from 'src/app/_models/real-estate';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/_services/common/common.service';
import { KLineChartIteamThumbnailComponent } from 'src/app/kline-chart-iteam-thumbnail/kline-chart-iteam-thumbnail.component';
@Component({
  selector: 'app-real-estate-details',
  templateUrl: './real-estate-details.component.html',
  styleUrls: ['./real-estate-details.component.scss']
})
export class RealEstateDetailsComponent implements OnInit {
  realestates : RealEstate[] =[{img:"news/img-1.png", name:"House in Senegal", price:90000, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  {img:"news/img-2.png", name:"Apartment in Senegal", price:80678, isVideo:true, isNew:true, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  {img:"news/img-3.png", name:"Penthouse in Senegal", price:40999, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  {img:"news/img-4.png", name:"Villa in Senegal", price:190000, isVideo:true, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]}];

  info: RealEstate = {};
  propertyImagesOptions: OwlOptions = {
    loop: true,
    margin: 14,
    autoWidth: false,
    autoplay: false,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 2
      },
      576: {
        items: 4
      },
      768: {
        items: 4
      }
    }
  }

  popularLinksOptions: OwlOptions = {
    loop: true,
    margin: 20,
    autoplay: false,
    dots: false,
    nav: true,
    stagePadding: 68,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      768: {
        items: 3
      }
    }    
  }

  constructor(    private route: ActivatedRoute, public commonService : CommonService) { }

  ngOnInit(): void {
    this.getRealEstateDetail();
  }

  getRealEstateDetail() : void{
    const id : string = this.route.snapshot.paramMap.get('id')!;
    this.commonService.getRealEstateDetail(id)
    .subscribe(
      (data) => {
        const  realEstateDetail = data.realEstateDetail[0];
        this.info.id = realEstateDetail._id;
        this.info.name = realEstateDetail.Name;
        this.info.price = realEstateDetail.Price;
        this.info.description = realEstateDetail.Descriptions;
        this.info.bedrooms = realEstateDetail.Bedrooms;
        this.info.bathrooms = realEstateDetail.Bathrooms;
        this.info.internal = realEstateDetail['Internal Area'];
        this.info.external = realEstateDetail['External Area'];
        this.info.lat = realEstateDetail['Lat'];
        this.info.lng = realEstateDetail['Lng'];
        this.info.city = realEstateDetail['City'];
        this.info.country = realEstateDetail['Country'];
        this.info.imageArray = [];
        for(let i = 1; i <= realEstateDetail['Image Count']; i ++){
          let index : string = "Image "+ i +" File Name";
          this.info.imageArray?.push(realEstateDetail[index]);
        }
      }
    );
  }

  purchase() {

  }
}
