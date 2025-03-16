import { RequestWorkpiece } from './Calculated2D';

export interface ICalculateDxf {
    detailsId: number[];
    workpiece: RequestWorkpiece;
    cuttingThickness: number;
    indent: number;
}

export interface DetailDxf {
    id: number;
    designation: string;
    count: number;
    materialId: number;
    thickness: number;
}
