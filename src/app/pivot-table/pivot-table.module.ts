import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PivotTableComponent } from './pivot-table.component';


@NgModule({
  declarations: [PivotTableComponent],
  imports: [CommonModule],
  exports: [PivotTableComponent],
})
export class PivotTableModule {}
