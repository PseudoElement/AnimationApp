export interface IDeveloper {
    id: string;
    info: string[];
    name: string;
    photoSrcData: string;
    skills: string[];
    socials: ISocials;
}

export interface ISocials {
    linkedin: string;
    github: string;
    vk: string;
    telegram: string;
}
