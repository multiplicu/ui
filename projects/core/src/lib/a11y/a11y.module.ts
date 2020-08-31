/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { PlatformModule } from '../platform/platform.module';
import { CdkMonitorFocus } from './focus-monitor/focus-monitor';

@NgModule({
  imports: [PlatformModule],
  declarations: [CdkMonitorFocus],
  exports: [CdkMonitorFocus],
})
export class A11yModule {
  public constructor() {}
}
