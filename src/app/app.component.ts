import { Component, OnInit } from '@angular/core';
// import { Data } from 'data.json'
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  
  // title = 'product-details';
  public productDetails : any;
  public currencies = [{"title": "INR", "value": "INR"}, {"title": "US", "value": "USD"}];
  public imageLoader = false;

  constructor(
    private httpClient: HttpClient,
    // private moduledata: moduledata
  ) { }

  ngOnInit(): void {
    this.getInputData();
  }

  public changeCurrency(event: any) {
    var type = event.target.value;
    var params = new HttpParams();
    //var params = {"base" : type};
    params.set("base", type);
    
    this.httpClient.get('https://api.exchangeratesapi.io/latest', {params: {"base": type}}).subscribe(result => {
      console.log(result);
      if(result) {
        var rates = result["rates"];
        var obj: {};
        var country = ('INR' === type)? 'USD':'INR';
        for(let i in this.productDetails) {
          obj = this.productDetails[i];
          obj["price"] = Math.round(obj["price"] * rates[country]);
          this.productDetails[i] = obj;
        }

     }
    });
  }

  public getInputData() {
    this.httpClient.get('assets/data.json').subscribe(result => {
                  
         this.productDetails = result["ProductDetails"];
           }
         );
  }
}
