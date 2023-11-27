import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const materialModules = [
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  DragDropModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules,
    CurrencyPipe
  ],
  exports: [
    materialModules,
    CurrencyPipe
  ]
})
export class SharedModule { }
