const Keys = ['white', 'black', 'rgbaWhite03', 'rgbaBlack02'] as const;

export type Colors = Record<(typeof Keys)[number], string>;
