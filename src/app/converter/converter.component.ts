import { Component, OnInit } from '@angular/core';
import { Converter } from '../converter';
import { ConverterService } from '../converter.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})

export class ConverterComponent implements OnInit {  
  converter = new Converter(0,'CAD','USD');
  convertRate:any = 1;
  convertResult:any = 0;
  convertRateList:any = {};
  convertRateSelections:any = ['CAD','USD','EUR'];
  opened: boolean = false;
  disclaimer: string = "Disclaimer";
  baseHasError: boolean = false;
  resHasError: boolean = false;
  errorMessage: string = "Please enter a number";

  constructor(public dataService: ConverterService) { }

  ngOnInit() {
    this.dataService.fetchData().subscribe(
      data => {
        this.convertRateList.USD = 1;
        this.convertRateList.EUR = (data as any).rates.EUR;
        this.convertRateList.CAD = (data as any).rates.CAD;
        this.getRate(); 
      }
    );
  }

  baseCurrencyOnChange(currency) {
    this.converter.baseCurrency=currency;
    this.getRate();
    this.getResult();
  }

  convertCurrencyOnChange(currency) {
    this.converter.convertCurrency=currency;
    this.getRate();
    this.getResult();
  }

  getRate() {
    this.convertRate = this.convertRateList[this.converter.convertCurrency]/this.convertRateList[this.converter.baseCurrency];
  }

  getResult() {
    if(this.inputValidate(this.converter.baseValue)) {
      this.baseHasError = false;
      this.convertResult = this.converter.baseValue*this.convertRate;      
    } else {
      this.baseHasError = true;
    }
  }

  resetResult(val) {
    if(this.inputValidate(val)) {
      this.resHasError = false;
      this.converter.baseValue = val/this.convertRate;
    } else {
      this.resHasError = true;
    }
  }

  inputValidate(val) {
    return isNaN(val) ? false : true
  }

  open() {
    this.opened = !this.opened;
  }

  close() {
    this.opened = false;
  }

}
