export interface IRandomWheelSegment {
    id: number;
    value: string;
}

export interface ISegmentWithFullData extends IRandomWheelSegment {
    angleStart: number;
    angleEnd: number;
}

export interface IWinResult {
    value: string;
    createdAt: Date;
    username: string;
}

export type RandomWheelTimeOptions = 2000 | 4000 | 10000;
