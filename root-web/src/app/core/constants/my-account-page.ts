import { IFormBuilderData } from '../model';
import { PASSWORD_PATTERN } from './regExp';

export const formData: IFormBuilderData[] = [
    {
        submitButtonText: 'Update email',
        controls: [
            {
                disabled: false,
                id: 'email',
                name: 'email',
                type: 'text',
                value: '',
                label: 'New email',
                placeholder: 'Input new email',
                validation: {
                    required: true,
                    maxLength: 20,
                    minLength: 5,
                    max: null,
                    min: null,
                    email: true,
                    pattern: '',
                },
            },
        ],
    },
    {
        submitButtonText: 'Update password',
        controls: [
            {
                disabled: false,
                id: 'old-password',
                name: 'old-password',
                type: 'password',
                value: '',
                label: 'Old password',
                placeholder: 'Input old password',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 30,
                    max: null,
                    min: null,
                    email: false,
                    pattern: PASSWORD_PATTERN,
                },
            },
            {
                disabled: false,
                id: 'new-password',
                name: 'new-password',
                type: 'password',
                value: '',
                label: 'New password',
                placeholder: 'Input new password',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 30,
                    max: null,
                    min: null,
                    email: false,
                    pattern: PASSWORD_PATTERN,
                },
            },
        ],
    },
];
