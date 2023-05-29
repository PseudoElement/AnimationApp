import { Endpoints } from '../model';

export const baseURL = 'http://localhost:3000';
export const API_KEY = '1c38c842-07bb-4bc7-b26d-c8faa7ff5be5';

export const endpoints: Endpoints = {
    getAllUsers: `${baseURL}/users`,
    getUser: (id) => `${baseURL}/users/${id}`,
    registerUser: `${baseURL}/users`,
};
