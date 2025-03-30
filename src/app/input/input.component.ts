import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  tipForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.tipForm = this.fb.group({
      cost: ['', [Validators.required, Validators.min(0.01)]],
      quality: ['15', Validators.required],
      roundUp: [false]
    });
  }

  calculateTip() {
    if (this.tipForm.valid) {
      const formData = this.tipForm.value;
      this.router.navigate(['/output'], {
        state: {
          cost: formData.cost,
          quality: formData.quality,
          roundUp: formData.roundUp
        }
      });
    }
  }
}
