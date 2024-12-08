import { Flex } from 'antd';
import { TableInput } from '../../custom-input/TableInput/TableInput';
import styles from './TableCell.module.css';
import { nameColumns } from '../../const/tableOptions';
import { ICustomTableRow } from '../../../types/CustomTable';
import { CellTypes, TableTypes } from '../../../types/typeTable';

type Props = {
    typeCell: CellTypes;
    isHeader: boolean;
    rowInfo: ICustomTableRow;
    typeTable: TableTypes;
};

export const TableCell = ({ typeCell, rowInfo, isHeader, typeTable }: Props) => {
    const isTitleDetailOrNumber: boolean =
        typeCell === CellTypes.detail || typeCell === CellTypes.number;
    return (
        <Flex
            align='center'
            justify='center'
            className={`${styles['table-cell']} ${styles[`table-cell__${typeCell}`]} `}
        >
            {isHeader ? (
                <Flex
                    align='center'
                    justify='center'
                    className={
                        isTitleDetailOrNumber
                            ? `${styles['table-cell__title']} ${styles['table-cell__title_is-first']}`
                            : styles['table-cell__title']
                    }
                >
                    {nameColumns[typeCell]}
                </Flex>
            ) : typeCell === CellTypes.number || typeCell === CellTypes.detail ? (
                rowInfo[typeCell]
            ) : (
                <TableInput
                    name={`${typeCell}_${rowInfo.number}`}
                    typeCell={typeCell}
                    typeTable={typeTable}
                />
            )}
        </Flex>
    );
};
