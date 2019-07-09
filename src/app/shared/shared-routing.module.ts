import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomCheckBoxComponent } from './custom-check-box/custom-check-box.component';

const routes: Routes = [{
  path: '',
  component: CustomCheckBoxComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
