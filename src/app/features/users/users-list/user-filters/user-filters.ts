import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { UserFiltersData } from '../user-filters-data';
import { Input } from '../../../../shared/ui/input/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TuiFilter } from '@taiga-ui/kit';
import { UserStatus } from '../../user-status';

@Component({
  selector: 'app-user-filters',
  imports: [Input, ReactiveFormsModule, TuiFilter],
  templateUrl: './user-filters.html',
  styleUrl: './user-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFilters {
  readonly statusFilterOptions = Object.values(UserStatus);

  readonly filtersChanged = output<UserFiltersData>();

  readonly form = inject(FormBuilder).group({
    name: [''],
    status: [[] as string[]],
  });

  constructor() {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.filtersChanged.emit(this.serializeForm());
    });
  }

  get nameControl() {
    return this.form.controls.name;
  }

  get statusControl() {
    return this.form.controls.status;
  }

  private serializeForm(): UserFiltersData {
    const status = this.statusControl.value;
    const isActive =
      status && status.length === 1 ? status[0] === UserStatus.Active : null;

    return {
      name: this.nameControl.value,
      isActive,
    };
  }
}
