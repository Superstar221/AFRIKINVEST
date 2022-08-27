import { Component, OnInit } from '@angular/core';
import { toJson } from 'angular';

import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { RealEstate } from 'src/app/_models/real-estate';
import { CommonService } from 'src/app/_services/common/common.service';
@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss']
})
export class RealEstateComponent implements OnInit {
  page = 1;
  count = 0;
  pageSize = 12;
  realestates : RealEstate[] = [];
  currentRealEstate : RealEstate = {};
  currentIndex = -1;
  // realestates : RealEstate[] =[{img:"real-estate/img-1.png", name:"Country house in Saly", price:90000, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-2.png", name:"Luxury home In Cap Skiring", price:190000, isVideo:true, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-3.png", name:"Residential complexes in Dakar Almadie", price:50900, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-4.png", name:"Penthouse in central Dakar", price:790000, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-5.png", name:"Designer villas in Somone", price:1190000, isVideo:true, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-6.png", name:"House with exceptional views in Saly", price:679000, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-7.png", name:"Elegant style view in Casamance", price:89000, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-8.png", name:"Exclusive home in Dakar", price:90000, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-9.png", name:"Townhouse in Senegal", price:140000, isVideo:true, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-10.png", name:"Properties in Dakar", price:990000, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-11.png", name:"Luxury villas in Saly", price:50000, isVideo:true, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]},
  // {img:"real-estate/img-12.png", name:"Penthouse in Senegal", price:80000, isVideo:false, isNew:false, details: ["3 Bedrooms", "2 Bathrooms","200 m²"]}];
  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    // if (searchTitle) {
    //   params[`title`] = searchTitle;
    // }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveRealEstates();
  }
  nextPage(): void{
    this.page = this.page + 1;
    let tempCount = this.count;
    console.log(Math.floor(this.count / this.pageSize));
    if((Math.floor(this.count / this.pageSize)) * this.pageSize == this.count){
      if(this.page  >  Math.floor(tempCount / this.pageSize)) this.page --;
      else this.retrieveRealEstates();
    }
    else
    {
      if(this.page - 1 >  Math.floor(tempCount / this.pageSize)) this.page --;
      else this.retrieveRealEstates();
    }
  }
  previousPage() : void{
    this.page = this.page - 1;
    if(this.page < 1) this.page = 1;
    else  this.retrieveRealEstates();
   
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveRealEstates();
  }

  refreshList(): void {
    this.retrieveRealEstates();
    this.currentRealEstate = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(realestate: RealEstate, index: number): void {
    this.currentRealEstate = realestate;
    this.currentIndex = index;
  }
  retrieveRealEstates(): void {
    const params = this.getRequestParams( this.page, this.pageSize);

    this.commonService.getRealEstates(params)
      .subscribe({
        next: (data) => {
          const { realEstateDetails} = data;
          this.realestates = [];
          realEstateDetails.map((p:any, i:number)=>{
              let temp : RealEstate = {};
              temp.img = p.Image1;
              temp.name = p.Name;
              temp.price = p.Price;
              p.Bedrooms = p.Bedrooms == '' ? 0 : p.Bedrooms;
              p.Bathrooms = p.Bathrooms == '' ? 0 : p.Bathrooms;

              temp.details = [p.Bedrooms+"Bedrooms", p.Bathrooms+"Bathrooms", p.Total ];
              this.realestates.push(temp);
          });
          this.count = this.commonService.realestateCount;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
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

  constructor(public commonService : CommonService ) {}

  ngOnInit(): void {
    this.commonService.setCountRealEstates();
    this.retrieveRealEstates();
  }

}
