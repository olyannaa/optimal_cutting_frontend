import { InboxOutlined } from '@ant-design/icons';

export const NotFoundContentSelect = () => {
    return (
        <div className='select-not-found-content'>
            <InboxOutlined style={{ fontSize: '32px' }} />
            <p>Данных нет</p>
        </div>
    );
};
