import { Endpoints } from '../model';
const serverURL = 'https://animation-app-server.vercel.app';
const localServerURL = 'http://localhost:3000';
export const baseURL = serverURL;

export const endpoints: Endpoints = {
    getAllUsers: `${baseURL}/users`,
    getUser: (id: string) => `${baseURL}/users/${id}`,
    registerUser: `${baseURL}/users`,
    getDeveloper: (id: string) => `${baseURL}/developer/${id}`,
    getAbout: `${baseURL}/about`,
    getWebApplications: `${baseURL}/products-web`,
    getGames: `${baseURL}/products-games`,
    getHomepage: `${baseURL}/home-page`,
};
