import { Flex, Table } from 'antd';
import { useAppSelector } from '../../app/hooks';
import { selectCalculateData1D } from '../../features/cutting1DSlice';
import styles from './TableResult.module.css';
import { ICalculate1D } from '../../types/Calculated1D';
import { ResultCalculate2D } from '../../types/Calculated2D';
import { changeFormatSize } from '../../functions/changeFormatSize';

type Props = {
    result1D?: ICalculate1D;
    result2D?: ResultCalculate2D;
};

export const TableResult = ({ result1D, result2D }: Props) => {
    const dataResult = useAppSelector(selectCalculateData1D);
    console.log(result1D, result2D);
    const dataTable = result1D
        ? result1D.workpieces.map((el, i) => {
              return {
                  number: i + 1,
                  percentUsage: el.percentUsage,
                  details: el.details.join(','),
                  length: el.length.toString(),
                  key: i,
              };
          })
        : result2D
        ? result2D.workpieces.map((el, i) => {
              return {
                  number: i + 1,
                  percentUsage: el.procentUsage,
                  details: changeFormatSize(el.details),
                  length: `${el.width}, ${el.height}`,
                  key: i,
              };
          })
        : [];
    const columns = [
        {
            title: 'Заготовка',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Использование',
            dataIndex: 'percentUsage',
            key: 'percentUsage',
        },
        {
            title: `${result1D ? 'Длины' : 'Размеры'} деталей`,
            dataIndex: 'details',
            key: 'details',
        },
        {
            title: `${result1D ? 'Длина' : 'Размер'} заготовки`,
            dataIndex: 'length',
            key: 'length',
        },
    ];
    return (
        <Flex vertical className={styles['table-result']}>
            <Flex className={styles['table-result__title']}>Результат</Flex>
            <Flex
                className={styles['table-result__count-workpiece']}
            >{`К-во заготовок = ${dataTable.length}`}</Flex>
            <Table columns={columns} dataSource={dataTable} pagination={false} />
        </Flex>
    );
};
