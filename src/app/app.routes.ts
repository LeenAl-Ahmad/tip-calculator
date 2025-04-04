import { Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';

export const routes: Routes = [
  { path: '', redirectTo: '/input', pathMatch: 'full' },
  { path: 'input', component: InputComponent },
  { path: 'output', component: OutputComponent }
];
