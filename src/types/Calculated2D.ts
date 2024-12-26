export interface ICalculate2D {
    details: Detail2D[];
    workpieceId: RequestWorkpiece;
    cuttingThickness: number;
}

export interface ResultCalculate2D {
    details: DetailCoordinates[];
    workpiece?: WorkpieceStandard;
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

export type DetailCoordinates = {
    width: number;
    height: number;
    x: number;
    y: number;
    figures: Figure[];
    rotated: boolean;
};

export type RequestWorkpiece = {
    width: number;
    height: number;
};

export type Figure = {
    id: number;
    filenameId: number;
    typeId: number;
    coordinates: string;
};
