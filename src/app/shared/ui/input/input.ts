import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { TuiError, TuiTextfield } from '@taiga-ui/core';

@Component({
  selector: 'app-input',
  imports: [
    TuiTextfield,
    ReactiveFormsModule,
    TuiError,
    TuiFieldErrorPipe,
    AsyncPipe,
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
  readonly control = input.required<FormControl>();

  readonly shouldShowError = computed(
    () =>
      (this.control().invalid &&
        this.control().touched &&
        this.control().errors) as boolean,
  );

  readonly errorColor = input<'red' | 'white'>('white');

  readonly placeholder = input<string>('');

  readonly iconStart = input<string>('');

  readonly label = input<string>('');
}
