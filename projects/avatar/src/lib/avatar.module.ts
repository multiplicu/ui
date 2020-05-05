import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { AvatarStackComponent } from './avatar-stack/avatar-stack.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AvatarComponent, AvatarStackComponent],
  imports: [CommonModule],
  exports: [AvatarComponent, AvatarStackComponent],
})
export class XcuAvatarModule {}
