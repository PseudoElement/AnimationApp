export interface IRandomWheelSegment {
    id: number;
    value: string;
}

export interface ISegmentWithFullData extends IRandomWheelSegment {
    angleStart: number;
    angleEnd: number;
}
