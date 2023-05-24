import { Endpoints } from '../model';

export const baseURL = 'https://social-network.samuraijs.com/api/1.0';
export const API_KEY = '1c38c842-07bb-4bc7-b26d-c8faa7ff5be5';

export const endpoints: Endpoints = {
    login: `${baseURL}/auth/login`,
};
