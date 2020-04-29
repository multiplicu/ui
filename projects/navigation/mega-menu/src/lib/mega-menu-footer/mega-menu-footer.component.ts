import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xcu-mega-menu-footer, div[xcu-mega-menu-footer]',
  exportAs: 'xcuMegaMenuFooter',
  templateUrl: './mega-menu-footer.component.html',
  styleUrls: ['./mega-menu-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuFooterComponent {
  public constructor() {}
}
