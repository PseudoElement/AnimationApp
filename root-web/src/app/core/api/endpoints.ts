import { Endpoints } from '../model';

export const baseURL = 'http://localhost:3000';

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
