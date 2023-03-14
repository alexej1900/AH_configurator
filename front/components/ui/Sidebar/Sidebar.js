import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { changeSidebarState, changeApartIndividualPrice, changeRoomImage } from "../../../redux/actions/index";

import StyleCards from '../styleCards';
import ModifyCards from '../modifyCards';
import SidebarButtons from './sidebarButtons';
import IconComponent from '../atoms/iconComponent';

import { formatNumber } from '../../../utils/utilities';
import getImages from '../../../pages/api/getImages';
import getPrices from '../../../pages/api/getPrices';
import getModifications from '../../../pages/api/getModifications';

import checkObjIsEmpty from '../../../utils/checkObjIsEmpty';

import styles from './sidebar.module.scss';

export default function Sidebar({
		apartmentPrice, 
		currentRoom, 
		styleId, 
		title, 
		styleCards,
		setLargeImage, 
		activeStyle, 
		styleTypeSet,
		modifyData,
	}) {

	const [shift, setShift] = useState(true);

	const dispatch = useDispatch();
	// =============== if we have individual solutions in options decomment 1 line below ===============
	// const [individualPrice, setIndividualPrice] = useState(0);

	const sidebarOpen = useSelector(state => state.generalStates.open);
	const { showStyle } = useSelector(state => state.generalStates);
	// =============== if we have main style lines decomment 1 line below ===============
	// const mainStyle = useSelector(state => state.apartStyle).title;
	const roomId = useSelector(state => state.apartSize.apartmentId);
	const sidebarTitle = title ? title : currentRoom;

	const { OptionsPrice, IndividualPrice } = getPrices();

	const modifications = getModifications(currentRoom.slice(0, 5) === 'küche' ? 'küche' : currentRoom);
	const roomImages = getImages();

	useEffect(() => {
    checkSize();
  }, []);

	useEffect(() => {
		if (roomImages && modifyData && !checkObjIsEmpty(modifications)) {
			setActiveImage();
		}
	}, [modifications]);

	const checkSize = () => {  // Comparing height of wisible part of options list with window height
    const optionBlock = document.getElementById('sidebar__content');
    if (optionBlock) {
      const isOptionListAtBottonm =  Math.abs(optionBlock.scrollHeight - optionBlock.clientHeight - optionBlock.scrollTop) < 1
      window.innerHeight < optionBlock.scrollHeight && !isOptionListAtBottonm ? setShift(true) : setShift(false);
    }
  }

	// =============== if we have individual solutions in options decomment function below ===============
	// const setIndividualHandler = (increase, price) => {
	//     setIndividualPrice(increase ? individualPrice + price : individualPrice - price);
	//     dispatch(changeApartIndividualPrice(individualPrice));
	// }

	const setActiveImage = () => {  // Comparing choosed modification and existing images 
		let activeMod = '';
		// =============== if we have modifications groups decomment 1 line below ===============
		// let prevModGroupTitle = null; 

		modifyData.forEach((item) => {
			if (item.modificationVisibility 
				// =============== if we have main style lines decomment 3 line below ===============
				// && 
				// (item.modificationMainStyle.toLowerCase().replaceAll(' ', '') === mainStyle.toLowerCase().replaceAll(' ', '') ||
				// item.modificationMainStyle.toLowerCase() === "false")
				) {
				const modName = item.modificationName;
				
				// =============== if we have modifications groups decomment 7 lines below ===============
				// const modGroupTitle = modifications[modName]?.modGroupTitle ? ` ${modifications[modName]?.modGroupTitle}` : '';
				// const modGroupBlock = prevModGroupTitle !== modGroupTitle
				//     ? `${modName}${modGroupTitle} ${modifications[modName].index} ${
				//         modifications[modName].option  && (modifications[modName].option?.index !== 0)
				//             ? `option ${modifications[modName].option.index} ` 
				//             : ''}` 
				//     : '';
				// end modifications groups block

				activeMod = 
					// =============== if we have modifications groups decomment 3 lines below ===============
					// modifications[modName] && modifications[modName].modGroupTitle
					// ? activeMod + modGroupBlock
					// : 
					modifications[modName] 
						? activeMod + 
							`${modName} ${modifications[modName].index} ${
									modifications[modName].option  && (modifications[modName].option?.index !== 0)
										? `option ${modifications[modName].option.index} ` 
										: ''
								}`
						// =============== if user able mix styles, decomment 1 line below ===============
						// : activeMod+`${modName} ${item.modificationItemExample.length > styleId ? styleId : '0'} ` 
						: activeMod+`${modName} ${'0'} `
					// =============== if we have modifications groups decomment 1 line below ===============
					// prevModGroupTitle = modName;
				}  
		})
		// console.log('activeMod', room + ' ' + `${mainStyle} ` +  activeMod)
		// console.log('roomImages', roomImages)

		const roomActiveMode = 
		// =============== if we have main style lines & rooms without styles:  set to line below titles of 
		// rooms without styles & decomment 3 line below ===============
		// currentRoom !== 'badezimmer' & currentRoom !== 'dusche'
		//     ? activeMod.length === 0 ? currentRoom : (currentRoom + ' ' + `${mainStyle} ` +  activeMod.slice(0, -1)).toLowerCase()
		//     : 
			activeMod.length === 0 ? currentRoom : (currentRoom + ' ' +  activeMod.slice(0, -1)).toLowerCase();
		const newActiveImage = roomImages?.filter((image) => image.title.toLowerCase() === roomActiveMode)[0];
		
		// console.log('roomActiveMode', roomActiveMode)
		// console.log('roomImageswwww', roomImages[72].title.toLowerCase().slice(0, 40) === roomActiveMode.slice(0, 40))
		// console.log('newActiveImage', newActiveImage)
		setLargeImage(newActiveImage); 
		// currentRoom !== ('küche1' || 'küche2' || 'küche3') && console.log('dsfdfd')
		dispatch(changeRoomImage(currentRoom.slice(0, 5) === 'küche' ? 'küche' : currentRoom, newActiveImage));
		// console.log('newActiveImage11', roomImages?.filter((image) => image.title.toLowerCase() === roomActiveMode)[0].title)
	}

	return (
		<div className={`${styles.sidebar} ${sidebarOpen && styles.open} ${!showStyle && styles.moveLeft} ` }>
			<div className={styles.sidebar__toggle} onClick={() => dispatch(changeSidebarState(!sidebarOpen))} >
				<div className={styles.toggle}> Ausstattung <IconComponent name="sidebar-nav" color="#fff"/></div>
			</div>
			{sidebarOpen &&
				<div className={styles.sidebar__content} id="sidebar__content" onScroll={checkSize}>
					<div className={`${[`${styles.sidebar__header} items-center`].join(' ')} ${currentRoom === 'kitchen-type' && showStyle && styles.hideHeader}`}>
						<div className={`${styles.optionsTitle}`}>{sidebarTitle}</div>
						<div className={`${styles.options}`}>
							<div><span>Optionen</span> {OptionsPrice > 0 ? '+' : ''}<strong>{formatNumber(OptionsPrice)}</strong></div>
							{IndividualPrice !== 0 && <div><span>Individuelle</span>{IndividualPrice > 0 ? '-' : ''}<strong>{formatNumber(IndividualPrice)}</strong></div>}
							<div><span>CHF</span> <strong>{formatNumber(parseInt(apartmentPrice) + OptionsPrice - IndividualPrice)}</strong></div> 
						</div>
					</div>

					<div className={styles.card__wrapper}>
								
						{styleCards && 
							<StyleCards 
								cardData={styleCards}
								styleId={styleId}
								activeStyle={activeStyle}
							/>
						}

						{modifyData &&
							<ModifyCards 
								cardData={modifyData}
								styleId={styleId}
								activeStyle={activeStyle}
								roomType={currentRoom}
								// setIndividualPrice={setIndividualHandler}
							/>
						}
						
					</div>
				</div>
			}	

			{shift 
				? <div className={`${styles.button_down}`}></div>
				: null 
			} 
			<SidebarButtons currentRoom={currentRoom} styleTypeSet={styleTypeSet} roomId={roomId}/>
		</div>
	)
}
