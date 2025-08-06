import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { User } from '../../user';
import { TuiTable, TuiTableCell } from '@taiga-ui/addon-table';

@Component({
  selector: 'app-users-table',
  imports: [TuiTable, TuiTableCell],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTable {
  readonly users = input.required<User[]>();

  readonly userClicked = output<User>();

  readonly columnNames = ['id', 'name', 'isActive'];

  readonly wordsTableColumns = ['ID', 'Имя', 'Активен'];

  onUserClick(user: User): void {
    this.userClicked.emit(user);
  }
}
