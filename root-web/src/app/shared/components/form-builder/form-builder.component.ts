import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Directions, IControl, IValidator } from 'src/app/core';

@Component({
    selector: 'app-form-builder',
    templateUrl: './form-builder.component.html',
    styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
    @Input() submitButtonText: string = 'Submit';
    @Input() controls: IControl[] = [];
    @Input() direction: Directions = 'horizontal';
    form!: FormGroup;
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        const formGroupObject = this._transformControlsForInsertingInFormGroup();
        this.form = this.fb.nonNullable.group(formGroupObject);
    }

    private _transformControlsForInsertingInFormGroup(): Record<string, FormControl<unknown>> {
        const formGroupObject = {} as Record<string, FormControl<unknown>>;
        this.controls.forEach((control) => {
            const validators = this._getValidators(control.validation);
            formGroupObject[control.name] = new FormControl(control.value, validators);
        });
        return formGroupObject;
    }

    private _getValidators(validation: IValidator): ValidatorFn[] {
        const validators = [];
        validation.email && validators.push(Validators.email);
        validation.max && validators.push(Validators.max(validation.max));
        validation.min && validators.push(Validators.min(validation.min));
        validation.maxLength && validators.push(Validators.maxLength(validation.maxLength));
        validation.minLength && validators.push(Validators.minLength(validation.minLength));
        validation.pattern && validators.push(Validators.pattern(validation.pattern));
        validation.required && validators.push(Validators.required);
        return validators;
    }

    public getControl(name: string): FormControl<unknown> {
        return this.form.controls[name] as FormControl<unknown>;
    }

    public onSubmit() {
        console.log('THIS FORM', this.form);
        if (this.form.invalid) return;
        else {
            console.log('Submit');
        }
    }
}
