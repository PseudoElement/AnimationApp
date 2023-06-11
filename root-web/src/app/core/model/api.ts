const endpointsKeys = [
    'getAllUsers',
    'getUser',
    'registerUser',
    'getDeveloper',
    'getAbout',
    'getWebApplications',
    'getGames',
    'getHomepage',
] as const;
export type Endpoints = Record<(typeof endpointsKeys)[number], string | ((id: string) => string)>;
