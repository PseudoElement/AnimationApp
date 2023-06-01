export interface IInfoCard {
    img: string;
    name: string;
    post: string;
    info: string;
    path: string;
}

export interface IAboutPageResponse {
    cards: IInfoCard[];
    teamPhoto: string;
}
