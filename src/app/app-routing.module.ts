import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileFormComponent } from './forms/profile-form/profile-form.component';
import { ProfileCardComponent } from './cards/profile-card/profile-card.component';

const routes: Routes = [
  {
    path:'create',
    component:ProfileFormComponent,
  },
  {
    path:'edit/:id',
    component:ProfileFormComponent,
  },
  {
    path:'home',
    component:ProfileCardComponent,
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }