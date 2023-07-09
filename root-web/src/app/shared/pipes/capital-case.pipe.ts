import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalCase',
})
export class CapitalCasePipe implements PipeTransform {
    transform(value: string | null): string {
        if (!value) return '';
        const endSigns = value.split('').filter((char) => char === '!' || char === '?' || char === '.');
        const sentences = value.split(/[.!?]\s*/).filter((string) => string !== '');
        const fixSentence = (string: string, index: number): string => {
            return string[0].toUpperCase() + string.slice(1) + (endSigns[index] ?? '');
        };
        const sentencesWithCapitalLetters = sentences.map((string, index) => fixSentence(string, index));
        return sentencesWithCapitalLetters.join(' ');
    }
}
