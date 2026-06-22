import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';

import { ForgotPassword } from './features/auth/forgot-password/forgot-password';

import { SignIn } from './features/auth/sign-in/sign-in';
import { ResetPassword } from './features/auth/reset-password/reset-password';

import { UserSignup } from './features/auth/user-signup/user-signup';
import { ClerkSignup } from './features/auth/clerk-signup/clerk-signup';

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
];
