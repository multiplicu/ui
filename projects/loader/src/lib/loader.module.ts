import { NgModule } from '@angular/core';
import { XcuLoaderComponent } from './loader.component';
import { XcuMarkComponent } from './mark/mark.component';

@NgModule({
  declarations: [XcuLoaderComponent, XcuMarkComponent],
  imports: [],
  exports: [XcuLoaderComponent, XcuMarkComponent],
})
export class XcuLoaderModule {}
