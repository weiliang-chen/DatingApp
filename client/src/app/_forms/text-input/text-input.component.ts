import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements ControlValueAccessor{
  @Input() label = '';
  @Input() type = 'text';



  constructor(@Self() public ngControl: NgControl) { // Self decorator to reuse the same ngControl in the memory
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {
    
  }

  registerOnChange(fn: any): void {
    
  }

  registerOnTouched(fn: any): void {
    
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl
  }
}
