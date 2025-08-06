import { inject, Injectable } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { InfoDialogData } from './info-dialog-data';

@Injectable({
  providedIn: 'root',
})
export class InfoDialogOpener {
  private readonly _dialog = inject(TuiDialogService);

  open({ title, message }: InfoDialogData): void {
    this._dialog
      .open(message, {
        label: title,
      })
      .subscribe();
  }
}
