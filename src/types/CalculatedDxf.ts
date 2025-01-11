import { RequestWorkpiece, ResponseWorkpiece } from './Calculated2D';

export interface ICalculateDxf {
    details: number[];
    workpiece: RequestWorkpiece;
    cuttingThickness: number;
}

export interface DetailDxf {
    id: number;
    designation: string;
    count: number;
}

export interface ResultCalculateDxf {
    totalPercentUsage: number;
    workpieces: ResponseWorkpiece[];
}
