import { Component, Input, ViewChild, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormControlDirective, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    }
  ]
})
export class InputComponent {

  @Input() label!: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() disable = false;

  @ViewChild(FormControlDirective, {static: true}) formControlDirective!: FormControlDirective;
  @Input() formControl !: FormControl;

  @Input() formControlName !: string;

  get control() {
    return (
      this.formControl ||
      this.controlContainer.control?.get(this.formControlName)
    )
  }

  constructor(
    @Optional() private controlContainer: ControlContainer
  ) { }

  clearInput() {
    this.control.setValue('');
    this.control.disabled;
  }

  registerOnTouched(fn: any): void {
    if(this.formControlDirective == undefined) return;
    if(!this.formControlDirective.valueAccessor) return;
    this.formControlDirective.valueAccessor.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    if(this.formControlDirective == undefined) return;
    if(!this.formControlDirective.valueAccessor) return;
    this.formControlDirective.valueAccessor.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    if(this.formControlDirective == undefined) return;
    if(!this.formControlDirective.valueAccessor) return;
    this.formControlDirective.valueAccessor.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.formControlDirective == undefined) return;
    if (!this.formControlDirective.valueAccessor?.setDisabledState) return;
    this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
  }

}
