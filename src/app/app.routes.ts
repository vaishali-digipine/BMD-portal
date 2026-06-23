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
    path: 'forgotPassword',
    component: ForgotPassword,
  },
  {
    path: 'resetPassword',
    component: ResetPassword,
  },
  {
    path: 'userSignup',
    component: UserSignup,
  },
  {
    path: 'clerkSignup',
    component: ClerkSignup,
  },
  { path: 'userDashboard', component: UserHomePage },
  { path: 'userProfile', component: UserProfile },
  { path: 'userApplication', component: UserApplication },
  { path: 'birthService', component: BirthService },
  { path: 'marriageService', component: MarriageService },
  { path: 'deathService', component: DeathService },
];
