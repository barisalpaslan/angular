import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockGroupsComponent } from './stock-groups.component';

const routes: Routes = [{ path: '', component: StockGroupsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockGroupRoutingModule { }
