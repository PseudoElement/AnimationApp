const endpointsKeys = ['getAllUsers', 'getUser', 'registerUser'] as const;
export type Endpoints = Record<(typeof endpointsKeys)[number], string | ((id: string) => string)>;
