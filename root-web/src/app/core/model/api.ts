const endpointsKeys = [
    'getAllUsers',
    'getUser',
    'registerUser',
    'getDeveloper',
    'getAbout',
    'getWebApplications',
    'getGames',
    'getHomepage',
    'loginUser',
    'getAllMessagesFromDB',
    'refreshAccessToken',
    'getRandomWheelResults',
    'updateUserPhoto',
    'updateUserEmail',
    'updateUserPassword',
] as const;
export type Endpoints = Record<(typeof endpointsKeys)[number], string | ((id: string) => string)>;
