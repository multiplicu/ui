import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: `xcu-mena-menu, div[xcu-mena-menu], ul[xcu-mena-menu], nav[xcu-mena-menu]`,
  exportAs: 'xcuMegaMenu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MegaMenuComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}
}
