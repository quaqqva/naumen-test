import { computed, Injectable, signal } from '@angular/core';
import { usersListData } from './users-list-data';
import { UserFiltersData } from '../user-filters/user-filters-data';

@Injectable({
  providedIn: 'root',
})
export class UsersListState {
  private readonly _initialUsers = usersListData;

  private readonly _filteredUsers = signal(this._initialUsers);

  get users() {
    return computed(() => this._filteredUsers());
  }

  applyFilters(filters: UserFiltersData) {
    const newFilteredUsers = this._initialUsers.filter((user) => {
      let result = true;

      if (filters.name) {
        result =
          result &&
          user.name.toLowerCase().includes(filters.name.toLowerCase());
      }
      if (filters.isActive !== null) {
        result = result && user.isActive === filters.isActive;
      }
      return result;
    });

    this._filteredUsers.set(newFilteredUsers);
  }
}
