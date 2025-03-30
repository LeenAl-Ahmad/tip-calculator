import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-output',
  imports: [
    DecimalPipe
  ],
  templateUrl: './output.component.html',
  styleUrl: './output.component.css'
})
export class OutputComponent implements OnInit {
  cost: number = 0;
  quality: string = '15';
  roundUp: boolean = false;
  tip: number = 0;
  total: number = 0;
  qualityLabel: string = '';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      cost: number,
      quality: string,
      roundUp: boolean
    };

    if (state) {
      this.cost = state.cost;
      this.quality = state.quality;
      this.roundUp = state.roundUp;
    } else {
      this.router.navigate(['/input']);
    }
  }

  ngOnInit(): void {
    this.calculate();
    this.setQualityLabel();
  }

  calculate(): void {
    const tipPercentage = parseInt(this.quality) / 100;
    let calculatedTip = this.cost * tipPercentage;

    if (this.roundUp) {
      calculatedTip = Math.ceil(calculatedTip);
    } else {
      calculatedTip = parseFloat(calculatedTip.toFixed(2));
    }

    this.tip = calculatedTip;
    this.total = parseFloat((this.cost + this.tip).toFixed(2));
  }

  setQualityLabel(): void {
    switch (this.quality) {
      case '15':
        this.qualityLabel = 'Okay (15%)';
        break;
      case '18':
        this.qualityLabel = 'Good (18%)';
        break;
      case '20':
        this.qualityLabel = 'Excellent (20%)';
        break;
      default:
        this.qualityLabel = 'Unknown';
    }
  }

  goBack(): void {
    this.router.navigate(['/input']);
  }
}
