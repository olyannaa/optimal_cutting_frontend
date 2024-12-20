import { Flex, Image } from 'antd';
import styles from './TableRow.module.css';
import { tableOptions } from '../../const/tableOptions';
import { TableCell } from '../TableCell/TableCell';
import { ICustomTableRow } from '../../../types/CustomTable';
import srcClose from '../../../assets/icons/close.svg';
import { CellTypes, TableTypes } from '../../../types/typeTable';

type Props = {
    typeTable: TableTypes;
    isHeader?: boolean;
    rowInfo: ICustomTableRow;
    deleteRow: (num: number, detail: string) => void;
    countRows?: number;
};

export const TableRow = ({
    typeTable,
    isHeader = false,
    rowInfo,
    deleteRow,
    countRows,
}: Props) => {
    return (
        <Flex
            className={`${styles['table__row']} ${styles[`table__row_${typeTable}`]} ${
                isHeader && styles[`table__row_header`]
            }`}
        >
            {tableOptions[typeTable].map((col, i) => (
                <TableCell
                    isHeader={isHeader}
                    typeCell={CellTypes[col]}
                    rowInfo={rowInfo}
                    key={i}
                    typeTable={typeTable}
                />
            ))}
            {!isHeader &&
                ((countRows! > 1 && typeTable === TableTypes.detail1D) ||
                    typeTable === TableTypes.detail2D) && (
                    <Flex align='center' justify='center' className={styles['close-row']}>
                        <Image
                            src={srcClose}
                            preview={false}
                            onClick={() => deleteRow(rowInfo.number, rowInfo.detail)}
                            style={{ cursor: 'pointer' }}
                        />
                    </Flex>
                )}
        </Flex>
    );
};
