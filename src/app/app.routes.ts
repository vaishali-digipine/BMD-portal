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
import { ClerkHomepage } from './features/clerk-dashboard/clerk-homepage/clerk-homepage';
import { ClerkProfile } from './features/clerk-dashboard/clerk-profile/clerk-profile';
import { ClerkApplication } from './features/clerk-dashboard/clerk-application/clerk-application';
import { BirthViewdetail } from './features/clerk-dashboard/clerk-application/action/view-details/birth-viewdetail/birth-viewdetail';
import { MarriageViewdetail } from './features/clerk-dashboard/clerk-application/action/view-details/marriage-viewdetail/marriage-viewdetail';
import { DeathViewdetail } from './features/clerk-dashboard/clerk-application/action/view-details/death-viewdetail/death-viewdetail';
import { EditBirth } from './features/clerk-dashboard/clerk-application/action/edit/edit-birth/edit-birth';
import { EditDeath } from './features/clerk-dashboard/clerk-application/action/edit/edit-death/edit-death';
import { EditMarriage } from './features/clerk-dashboard/clerk-application/action/edit/edit-marriage/edit-marriage';
import { AdminSidebar } from './features/admin-dashboard/admin-sidebar/admin-sidebar';

import { AdminHomepage } from './features/admin-dashboard/admin-homepage/admin-homepage';
import { AdminProfile } from './features/admin-dashboard/admin-profile/admin-profile';
import { ClerkPage } from './features/admin-dashboard/admin-sidebar/pages/clerk-page/clerk-page';
import { UserPage } from './features/admin-dashboard/admin-sidebar/pages/user-page/user-page';
import { StatePage } from './features/admin-dashboard/admin-sidebar/pages/state-page/state-page';
import { DistrictPage } from './features/admin-dashboard/admin-sidebar/pages/district-page/district-page';
import { OfficePage } from './features/admin-dashboard/admin-sidebar/pages/office-page/office-page';
import { DepartmentPage } from './features/admin-dashboard/admin-sidebar/pages/department-page/department-page';
import { HolidayPage } from './features/admin-dashboard/admin-sidebar/pages/holiday-page/holiday-page';
import { AddState } from './features/admin-dashboard/admin-sidebar/add-pages/add-state/add-state';
import { AddDistrict } from './features/admin-dashboard/admin-sidebar/add-pages/add-district/add-district';
import { AddOffice } from './features/admin-dashboard/admin-sidebar/add-pages/add-office/add-office';
import { AddDepartment } from './features/admin-dashboard/admin-sidebar/add-pages/add-department/add-department';
import { AddHoliday } from './features/admin-dashboard/admin-sidebar/add-pages/add-holiday/add-holiday';
import { ApplicationsPage } from './features/admin-dashboard/admin-sidebar/pages/applications-page/applications-page';
import { SetPassword } from './features/auth/set-password/set-password';
import { SlotPage } from './features/admin-dashboard/admin-sidebar/pages/slot-page/slot-page';
import { MeetingPage } from './features/admin-dashboard/admin-sidebar/pages/meeting-page/meeting-page';
import { Meeting } from './features/clerk-dashboard/meeting/meeting';

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
  { path: 'set-password', component: SetPassword },
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

  {
    path: 'clerk-homepage',
    component: ClerkHomepage,
  },
  { path: 'clerk-profile', component: ClerkProfile },
  { path: 'clerk-application', component: ClerkApplication },
  { path: 'birth-viewdetail/:id', component: BirthViewdetail },
  { path: 'marriage-viewdetail/:id', component: MarriageViewdetail },
  { path: 'death-viewdetail/:id', component: DeathViewdetail },
  { path: 'edit-birth/:id', component: EditBirth },
  { path: 'edit-death/:id', component: EditDeath },
  { path: 'edit-marriage/:id', component: EditMarriage },
  { path: 'meeting', component: Meeting },

  {
    path: '',
    component: AdminSidebar,
    children: [
      {
        path: 'admin-homepage',
        component: AdminHomepage,
      },
      { path: 'admin-profile', component: AdminProfile },
      { path: 'clerk-page', component: ClerkPage },
      { path: 'user-page', component: UserPage },
      { path: 'state-page', component: StatePage },
      { path: 'district-page', component: DistrictPage },
      { path: 'office-page', component: OfficePage },
      { path: 'department-page', component: DepartmentPage },
      { path: 'holiday-page', component: HolidayPage },
      { path: 'application-page', component: ApplicationsPage },
      { path: 'slot-page', component: SlotPage },
      { path: 'meeting-page', component: MeetingPage },
    ],
  },
  { path: 'add-state', component: AddState },
  { path: 'add-district', component: AddDistrict },
  { path: 'add-office', component: AddOffice },
  { path: 'add-department', component: AddDepartment },
  { path: 'add-holiday', component: AddHoliday },
];
