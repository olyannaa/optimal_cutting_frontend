import { ICalculate1D } from '../../types/Calculated1D';

export function isICalculate1D(obj: any): obj is ICalculate1D {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        Array.isArray(obj.workpieces) &&
        obj.workpieces.every(
            (workpiece) =>
                typeof workpiece.length === 'number' &&
                Array.isArray(workpiece.details) &&
                workpiece.details.every(
                    (detail) => typeof detail === 'number'
                ) &&
                typeof workpiece.percentUsage === 'number'
        ) &&
        typeof obj.totalPercentUsage === 'number'
    );
}
