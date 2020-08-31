import { NgModule } from '@angular/core';
import { XcuAvatarComponent } from './avatar.component';
import { XcuAvatarStackComponent } from './avatar-stack/avatar-stack.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [XcuAvatarComponent, XcuAvatarStackComponent],
  imports: [CommonModule],
  exports: [XcuAvatarComponent, XcuAvatarStackComponent],
})
export class XcuAvatarModule {}
