import { Button, Image } from 'antd';
import srcDownload from '../../assets/icons/download.svg';
import styles from './DownloadButton.module.css';

export const DownloadButton = ({ submit }: { submit: () => void }) => {
    return (
        <Button className={styles['btn-download']} onClick={submit}>
            <Image preview={false} src={srcDownload} />
        </Button>
    );
};
