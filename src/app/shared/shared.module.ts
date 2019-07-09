import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { CustomCheckBoxComponent } from './custom-check-box/custom-check-box.component';

@NgModule({
  declarations: [CustomCheckBoxComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
