import { Checkbox, Flex, Image } from 'antd';
import { useState } from 'react';
import srcArrowDown from '../../../assets/icons/arrowDown.svg';
import srcArrowRight from '../../../assets/icons/arrowRight.svg';
import srcFolderOpen from '../../../assets/icons/folderOpen.svg';
import styles from './BranchSelect.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
	addCheckedDetails,
	deleteCheckedDetails,
	selectAddedDetails,
	selectCheckedDetails,
} from '../../../features/selectDetails2DSlice';
import { Designation } from '../../../app/services/addDxf';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type Props = {
	name: string;
	details: Designation[];
};

export const BranchSelect = ({ name, details }: Props) => {
	const dispatch = useAppDispatch();
	const checkedDetails = useAppSelector(selectCheckedDetails);
	const addedDetails = useAppSelector(selectAddedDetails);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const onChangeCheckBox = (event: CheckboxChangeEvent) => {
		const currDetail = details.find(
			(detail) => detail.id === Number(event.target.value)
		);
		if (event.target.checked) {
			dispatch(addCheckedDetails({ name: name, checkedDetail: currDetail }));
		} else {
			dispatch(deleteCheckedDetails({ name: name, checkedDetail: currDetail }));
		}
	};

	const getValues = () => {
		if (!checkedDetails[name] && !addedDetails[name]) return [];
		else if (checkedDetails[name] && !addedDetails[name])
			return Object.values(checkedDetails[name]).map((detail) => detail.id);
		else if (!checkedDetails[name] && addedDetails[name])
			return Object.values(addedDetails[name]).map((detail) => detail.id);
		else
			return [
				...Object.values(checkedDetails[name]).map((detail) => detail.id),
				...Object.values(addedDetails[name]).map((detail) => detail.id),
			];
	};

	return (
		<>
			<Flex gap='5px'>
				<Image
					src={isOpen ? srcArrowDown : srcArrowRight}
					preview={false}
					onClick={() => setIsOpen((last) => !last)}
					className={styles.iconIsOpen}
				/>
				<Flex>
					<Image
						src={srcFolderOpen}
						preview={false}
						className={styles.iconOpenDir}
					/>
					<Flex align='center'>{name}</Flex>
				</Flex>
			</Flex>
			{isOpen && (
				<Checkbox.Group className={styles.selectDetails} value={getValues()}>
					{details.map((detail) => (
						<Checkbox
							value={detail.id}
							key={detail.id}
							onChange={(e) => onChangeCheckBox(e)}
						>
							{detail.designation}
						</Checkbox>
					))}
				</Checkbox.Group>
			)}
		</>
	);
};
