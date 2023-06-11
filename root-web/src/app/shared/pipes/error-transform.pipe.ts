import { Pipe, PipeTransform } from '@angular/core';
import { IErrors, errorsEN } from 'src/app/core';

@Pipe({
    name: 'errorTransform',
})
export class ErrorTransformPipe implements PipeTransform {
    transform(value: keyof IErrors): string {
        return errorsEN[value];
    }
}
