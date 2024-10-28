import { Routes } from '@angular/router';
import { SignInComponent } from '../views/sign-in/sign-in.component';
import { SignUpComponent } from '../views/sign-up/sign-up.component';
import { MainPageComponent } from '../views/main-page/main-page.component';
import { StarredComponent } from '../views/starred/starred.component';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'Register', component: SignUpComponent },
  { path: 'Dashboard', component: MainPageComponent },
  { path: 'Starred', component: StarredComponent },
];


