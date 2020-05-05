import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { AvatarStackComponent } from './avatar-stack/avatar-stack.component';

@NgModule({
  declarations: [AvatarComponent, AvatarStackComponent],
  imports: [],
  exports: [AvatarComponent, AvatarStackComponent],
})
export class XcuAvatarModule {}
