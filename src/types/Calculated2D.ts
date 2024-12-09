export interface ICalculate2D {
    details: Detail2D[];
    workpiece: WorkpieceStandard;
}

export type Detail2D = {
    width: number;
    height: number;
    count: number;
};

export type WorkpieceStandard = {
    id: number;
    name: string;
    width: number;
    height: number;
};
