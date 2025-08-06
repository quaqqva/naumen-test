import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { UserFiltersData } from './user-filters-data';
import { Input } from '../../../../shared/ui/input/input';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-user-filters',
  imports: [Input],
  templateUrl: './user-filters.html',
  styleUrl: './user-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFilters {
  private isActive: boolean | null = null;

  readonly filtersChanged = output<UserFiltersData>();

  readonly searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.filtersChanged.emit({
          name: value,
          isActive: this.isActive,
        });
      });
  }
}
