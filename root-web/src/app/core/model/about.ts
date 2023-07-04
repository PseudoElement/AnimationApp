export interface IInfoCard {
    photoSrcData: string;
    name: string;
    post: string;
    info: string;
    pathToPage: string;
}

export interface IAboutPageResponse {
    cards: IInfoCard[];
    teamPhoto: string;
}
