import { Endpoints } from '../model';
const serverURL = 'https://animation-app-server.vercel.app';
const localServerURL = 'http://localhost:3000';
export const baseURL = localServerURL;

export const endpoints: Endpoints = {
    getAllUsers: `${baseURL}/users`,
    getUser: (id: string) => `${baseURL}/users/${id}`,
    registerUser: `${baseURL}/auth/register`,
    loginUser: `${baseURL}/auth/login`,
    getDeveloper: (id: string) => `${baseURL}/developers/${id}`,
    getAbout: `${baseURL}/about/developer-cards`,
    getWebApplications: `${baseURL}/products/apps`,
    getGames: `${baseURL}/products/games`,
    getHomepage: `${baseURL}/home-page`,
    getAllMessagesFromDB: `${baseURL}/chat/messages`,
};
