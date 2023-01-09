import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockTypesComponent } from './stock-types.component';

const routes: Routes = [{ path: '', component: StockTypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockTypeRoutingModule { }
