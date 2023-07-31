import { IRadioInput, IRandomWheelSegment } from '../model';

export const segments: IRandomWheelSegment[] = [
    { id: 1, value: 'Call me on interview' },
    { id: 2, value: 'Phone me' },
    { id: 3, value: 'Offer me job' },
    { id: 4, value: 'Contact me' },
    { id: 5, value: 'Recommend me to collegues' },
    { id: 6, value: 'Text me in mail' },
    { id: 7, value: 'Add my contacts' },
    { id: 8, value: 'Invite me in office' },
];

export const strokeLineWidthRadioInputs: IRadioInput[] = [
    { id: 1, label: '2px', name: 'strokeLineWidth', value: 2 },
    { id: 2, label: '4px', name: 'strokeLineWidth', value: 4 },
    { id: 3, label: '6px', name: 'strokeLineWidth', value: 6 },
    { id: 4, label: '8px', name: 'strokeLineWidth', value: 8 },
    { id: 5, label: '10px', name: 'strokeLineWidth', value: 10 },
];
