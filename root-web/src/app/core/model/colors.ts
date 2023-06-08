const Keys = ['white', 'black', 'rgbaWhite03', 'rgbaBlack04', 'rgbaBlack08'] as const;

export type Colors = Record<(typeof Keys)[number], string>;
