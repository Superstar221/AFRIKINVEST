import { Component, OnInit } from '@angular/core';
import { toJson } from 'angular';

import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { RealEstate } from 'src/app/_models/real-estate';
import { CommonService } from 'src/app/_services/common/common.service';
// import { ContractService } from 'src/app/_services/contract/contract.service';
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
              p.Bedrooms = p.Bedrooms == null ? 0 : p.Bedrooms;
              p.Bathrooms = p.Bathrooms == null ? 0 : p.Bathrooms;
              temp.id = p._id;
              temp.details = [p.Bedrooms+" Bedrooms", p.Bathrooms+" Bathrooms", p["Internal Area"]];
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
