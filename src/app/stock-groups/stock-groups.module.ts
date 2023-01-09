import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DxDataGridModule, DxTemplateModule, DxBulletModule, DxButtonModule, DxTextBoxModule, DxFormModule, DxCheckBoxModule, DxPopupModule, DxSelectBoxModule, DxLookupModule } from 'devextreme-angular';
import dxButton from 'devextreme/ui/button';
import { StockGroupsComponent } from './stock-groups.component';
import { StockGroupRoutingModule } from './stock-groups-routing.module';
import { DxiColumnModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [
    StockGroupsComponent,

  ],
  imports: [
    SharedModule,
    CommonModule,
    StockGroupRoutingModule,
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxFormModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxLookupModule,
    DxiColumnModule

  ]
})
export class StockGroupModule  { }
