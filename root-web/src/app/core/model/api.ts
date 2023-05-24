const endpointsKeys = ['login'] as const;
export type Endpoints = Record<(typeof endpointsKeys)[number], string>;
