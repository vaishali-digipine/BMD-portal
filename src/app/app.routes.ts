import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';

import { ForgotPassword } from './features/auth/forgot-password/forgot-password';

import { SignIn } from './features/auth/sign-in/sign-in';
import { ResetPassword } from './features/auth/reset-password/reset-password';

import { UserSignup } from './features/auth/user-signup/user-signup';
import { ClerkSignup } from './features/auth/clerk-signup/clerk-signup';
import { UserHomePage } from './features/user-dashboard/user-home-page/user-home-page';
import { UserProfile } from './features/user-dashboard/user-profile/user-profile';
import { UserApplication } from './features/user-dashboard/user-application/user-application';
import { BirthService } from './features/user-dashboard/user-services/birth-service/birth-service';
import { MarriageService } from './features/user-dashboard/user-services/marriage-service/marriage-service';
import { DeathService } from './features/user-dashboard/user-services/death-service/death-service';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'signIn',
    component: SignIn,
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
  },
  {
    path: 'reset-password',
    component: ResetPassword,
  },
  {
    path: 'user-signup',
    component: UserSignup,
  },
  {
    path: 'clerk-signup',
    component: ClerkSignup,
  },
  { path: 'user-dashboard', component: UserHomePage },
  { path: 'user-profile', component: UserProfile },
  { path: 'user-application', component: UserApplication },
  { path: 'birth-service', component: BirthService },
  { path: 'marriage-service', component: MarriageService },
  { path: 'death-service', component: DeathService },
];
