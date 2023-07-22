import { Pipe, PipeTransform } from '@angular/core';
import { IErrors, IErrorsData, transformErrorsEN } from 'src/app/core';

@Pipe({
    name: 'errorTransform',
})
export class ErrorTransformPipe implements PipeTransform {
    transform(value: keyof IErrors, errorsData?: Partial<IErrorsData>): string {
        const transformedErrorsObject = transformErrorsEN({
            max: errorsData?.max,
            maxlength: errorsData?.maxlength,
            min: errorsData?.min,
            minlength: errorsData?.minlength,
        });
        return transformedErrorsObject[value];
    }
}
