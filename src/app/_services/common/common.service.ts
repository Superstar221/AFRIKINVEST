import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { RealEstate } from 'src/app/_models/real-estate';

const baseUrl = 'https://188.166.51.178:3000/api/v1/';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  currentCrypto : string = "";
  pricePoints : number[] = [];
  currency : number = 0;
  floatPercent : number = 0;
  startPrice : number = 0;
  endPrice: number = 0;
  realestateCount : number = 0;
  setCrypto(newCrypto: string) {
    this.currentCrypto = newCrypto;
  }
  getUrlData(url:any){
    return this.http.get(url)
  }
  getCryptoDataSynchronous():Promise<any>{
    type tplotOptions = {
      [key: string]: string
    }
    const cryptoID : tplotOptions={Bitcoin:"bitcoin", "Ethereum":"ethereum", "Tether":"tether", "USD_Coin":"usd-coin", "BNB":"binancecoin"}
    let params : any = {}
    params['crypto'] = cryptoID[this.currentCrypto];
    return this.http.get<any>(baseUrl+"realestate/currency", { params }).toPromise();
  }
  async setCryptoData(){
    let response = await this.getCryptoDataSynchronous()
    this.pricePoints = [];
    for(var i = 0 ; i < response.temp.prices.length; i ++) this.pricePoints.push(response.temp.prices[i][1]);
    this.currency = this.pricePoints[this.pricePoints.length - 1]
    this.startPrice = this.pricePoints?.[0] 
    this.endPrice = this.pricePoints?.[this.pricePoints.length - 1]
    this.floatPercent = (this.startPrice) && this.endPrice ? (this.endPrice - this.startPrice) / this.startPrice : 0
  }
  getCountRealEstates():Promise<any>{
    const url=baseUrl+"realestate/count";
    return this.getUrlData(url).toPromise();
  }
  async setCountRealEstates(){
    let response = await this.getCountRealEstates();
    this.realestateCount = response.count;
  }
  getRealEstates(params:any){
    return this.http.get<any>(baseUrl+"realestate", { params });
  }
  getRealEstateDetail(id:string){
    return this.http.get<any>(baseUrl+"realestate/"+id);
  }
  constructor(  private http: HttpClient) { }
}
