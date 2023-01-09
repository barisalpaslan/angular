import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StockTypesComponent } from './stock-types.component';
import { StockTypeRoutingModule } from './stock-types-routing.module';
import { DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule, DxTextBoxModule, DxFormModule, DxCheckBoxModule, DxPopupModule, DxSelectBoxModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';

@NgModule({
  declarations: [
    StockTypesComponent,

  ],
  imports: [
    SharedModule,
    CommonModule,
    StockTypeRoutingModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxFormModule,
    DxCheckBoxModule,
    DxSelectBoxModule,


  ]
})
export class StockTypeModule  { }
