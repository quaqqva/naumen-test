import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersTable } from './users-table/users-table';
import { UsersListState } from './users-list-state/users-list-state';
import { User } from '../user';
import { InfoDialogOpener } from '../../../shared/ui/dialog/info-dialog-opener';
import { UserFilters } from './user-filters/user-filters';
import { UserFiltersData } from './user-filters-data';

@Component({
  selector: 'app-users-list',
  imports: [UsersTable, UserFilters],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersList {
  readonly usersState = inject(UsersListState);

  readonly infoDialogOpener = inject(InfoDialogOpener);

  onFiltersChanged(filters: UserFiltersData): void {
    this.usersState.applyFilters(filters);
  }

  onUserClicked(user: User): void {
    this.infoDialogOpener.open({
      title: 'Информация о пользователе',
      message: `Email: ${user.email}`,
    });
  }
}
