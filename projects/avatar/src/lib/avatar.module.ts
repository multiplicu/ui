import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XcuAvatarStackComponent } from './avatar-stack/avatar-stack.component';
import { XcuAvatarComponent } from './avatar.component';
import {
  XcuProfileComponent,
  XcuProfileImage,
  XcuProfileName,
  XcuProfileSubtitle,
} from './profile/profile.component';

@NgModule({
  declarations: [
    XcuAvatarComponent,
    XcuAvatarStackComponent,
    XcuProfileComponent,
    XcuProfileName,
    XcuProfileSubtitle,
    XcuProfileImage,
  ],
  imports: [CommonModule],
  exports: [
    XcuAvatarComponent,
    XcuAvatarStackComponent,
    XcuProfileComponent,
    XcuProfileName,
    XcuProfileSubtitle,
    XcuProfileImage,
  ],
})
export class XcuAvatarModule {}
