import { Flex, Image } from 'antd';
import { selectFile } from '../../features/dxfSlice';
import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';

export const NewDetail = () => {
    const fileData = useAppSelector(selectFile);
    const [imageSrc, setImageSrc] = useState<string>('');
    useEffect(() => {
        if (fileData) {
            const file = fileData.get('file') as File;

            if (file && file.type === 'image/png') {
                const reader = new FileReader();

                reader.onload = (event) => {
                    setImageSrc(event.target?.result as string);
                };

                reader.readAsDataURL(file);
            } else {
                alert('Файл не является PNG');
            }
        }
    }, [fileData]);
    return (
        <Flex className='page '>
            <Image src={imageSrc} preview={false} />
        </Flex>
    );
};
