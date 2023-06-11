export const AnimationTypes = {
    fadeLeft: 'fadeLeft',
    fadeRight: 'fadeRight',
    fadeUp: 'fadeUp',
    fadeDown: 'fadeDown',
    bounceRight: 'bounceRight',
    bounceLeft: 'bounceLeft',
    flash: 'flash',
    pulse: 'pulse',
    shake: 'shake',
    flip: 'flip',
    flipX: 'flipX',
    flipY: 'flipY',
    zoomInEnter: 'zoomInEnter',
    zoomIn: 'zoomIn',
    zoomOut: 'zoomOut',
} as const;

export interface ITypingAnimation {
    durationMS: number;
}
