import { Pipe, PipeTransform } from '@angular/core';
import { SignTypes } from 'src/app/core';

@Pipe({
    name: 'addSignInEnd',
})
export class AddSignInEndPipe implements PipeTransform {
    transform(value: string | null, sign: SignTypes = 'dot'): string {
        if (!value) return '';
        switch (sign) {
            case 'dot':
                return value + '.';
            case 'exclamation':
                return value + '!';
            case 'question':
                return value + '?';
        }
    }
}
