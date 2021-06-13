import {
  ChangeDetectionStrategy,
  Component,
  Input,
  IterableDiffer,
  ViewEncapsulation,
} from '@angular/core';
import { isDataSource } from '@multiplicu/ui/core';
import { XCU_TABLE } from './tokens';

/**
 * Set of properties that represents the identity of a single rendered row.
 *
 * When the table needs to determine the list of rows to render, it will do so by iterating through
 * each data object and evaluating its list of row templates to display (when multiTemplateDataRows
 * is false, there is only one template per data object). For each pair of data object and row
 * template, a `RenderRow` is added to the list of rows to render. If the data object and row
 * template pair has already been rendered, the previously used `RenderRow` is added; else a new
 * `RenderRow` is * created. Once the list is complete and all data objects have been itereated
 * through, a diff is performed to determine the changes that need to be made to the rendered rows.
 *
 * @docs-private
 */
export interface RenderRow<T> {
  data: T;
  dataIndex: number;
  rowDef: CdkRowDef<T>;
}

@Component({
  selector: 'xcu-table, table[xcu-table], div[xcu-table]',
  exportAs: 'xcuTable',
  host: {
    class: 'xcu-table',
  },
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: XCU_TABLE, useExisting: XcuTableComponent }],
})
export class XcuTableComponent<T> {
  /** Latest data provided by the data source. */
  protected _data: readonly T[];

  /** Differ used to find the changes in the data provided by the data source. */
  private _dataDiffer: IterableDiffer<RenderRow<T>>;

  /**
   * The table's source of data, which can be provided in three ways (in order of complexity):
   *   - Simple data array (each object represents one table row)
   *   - Stream that emits a data array each time the array changes
   *   - `DataSource` object that implements the connect/disconnect interface.
   *
   * If a data array is provided, the table must be notified when the array's objects are
   * added, removed, or moved. This can be done by calling the `renderRows()` function which will
   * render the diff since the last table render. If the data array reference is changed, the table
   * will automatically trigger an update to the rows.
   *
   * When providing an Observable stream, the table will trigger an update automatically when the
   * stream emits a new array of data.
   *
   * Finally, when providing a `DataSource` object, the table will use the Observable stream
   * provided by the connect function and trigger updates when that stream emits new data array
   * values. During the table's ngOnDestroy or when the data source is removed from the table, the
   * table will call the DataSource's `disconnect` function (may be useful for cleaning up any
   * subscriptions registered during the connect process).
   */
  @Input()
  get dataSource(): CdkTableDataSourceInput<T> {
    return this._dataSource;
  }
  set dataSource(dataSource: CdkTableDataSourceInput<T>) {
    if (this._dataSource !== dataSource) {
      this._switchDataSource(dataSource);
    }
  }
  private _dataSource: CdkTableDataSourceInput<T>;

  public constructor() {}

  /**
   * Switch to the provided data source by resetting the data and unsubscribing from the current
   * render change subscription if one exists. If the data source is null, interpret this by
   * clearing the row outlet. Otherwise start listening for new data.
   */
  private _switchDataSource(dataSource: CdkTableDataSourceInput<T>) {
    this._data = [];

    if (isDataSource(this.dataSource)) {
      this.dataSource.disconnect(this);
    }

    // Stop listening for data from the previous data source.
    if (this._renderChangeSubscription) {
      this._renderChangeSubscription.unsubscribe();
      this._renderChangeSubscription = null;
    }

    if (!dataSource) {
      if (this._dataDiffer) {
        this._dataDiffer.diff([]);
      }
      this._rowOutlet.viewContainer.clear();
    }

    this._dataSource = dataSource;
  }
}
