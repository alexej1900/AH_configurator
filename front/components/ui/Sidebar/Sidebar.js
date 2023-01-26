import { useState, useEffect } from 'react';

import Image from 'next/image';

import { useDispatch, useSelector } from "react-redux";
import { changeSidebarState, changeApartIndividualPrice, changeRoomImage, setStyleImage, changeLoadingState } from "../../../redux/actions/index";

import StyleCards from '../styleCards';
import ModifyCards from '../modifyCards';
import SidebarButtons from './sidebarButtons';

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

    const dispatch = useDispatch();

    const [individualPrice, setIndividualPrice] = useState(0);

    const sidebarOpen = useSelector(state => state.generalStates.open);
    const { showStyle, showRoom } = useSelector(state => state.generalStates);
    const mainStyle = useSelector(state => state.apartStyle).title;
    const roomId = useSelector(state => state.apartSize.apartmentId);

    const { OptionsPrice, IndividualPrice } = getPrices();

    console.log('OptionsPrice', OptionsPrice)

    const modifications = getModifications(currentRoom);

    const roomImages = getImages(currentRoom);

    useEffect(() => {
        if (roomImages && modifyData && !checkObjIsEmpty(modifications)) {
            setActiveImage();
        }
    }, [modifications]);

    const sidebarTitle = title ? title : currentRoom;

    const setIndividualHandler = (increase, price) => {
        setIndividualPrice(increase ? individualPrice + price : individualPrice - price);
        dispatch(changeApartIndividualPrice(individualPrice));
    }

    const setActiveImage = () => {  // Comparing choosed modification and existing images 
        // console.log('modifyData', modifyData)
        // console.log('modifications', modifications)
        // console.log('mainStyle', mainStyle)
        let activeMod = '';
        let prevModGroupTitle = null;
        modifyData.forEach((item) => {

            if (
                item.modificationVisibility && 
                (item.modificationMainStyle.toLowerCase().replaceAll(' ', '') === mainStyle.toLowerCase().replaceAll(' ', '') ||
                item.modificationMainStyle.toLowerCase() === "false")
                ) {
                const modName = item.modificationName;
                const modGroupTitle = modifications[modName]?.modGroupTitle ? ` ${modifications[modName]?.modGroupTitle}` : '';

                activeMod = modifications[modName] && modifications[modName].modGroupTitle
                    ? activeMod + 
                        prevModGroupTitle !== modGroupTitle
                        ?
                            `${modName}${modGroupTitle} ${modifications[modName].index} ${
                                    modifications[modName].option  && (modifications[modName].option?.index !== 0)
                                        ? `option ${modifications[modName].option.index} ` 
                                        : ''
                                }` 
                        : ''

                    : modifications[modName] 
                        ? activeMod + 
                            `${modName} ${modifications[modName].index} ${
                                    modifications[modName].option  && (modifications[modName].option?.index !== 0)
                                        ? `option ${modifications[modName].option.index} ` 
                                        : ''
                                }` 
                        // : activeMod+`${modName} ${item.modificationItemExample.length > styleId ? styleId : '0'} ` if user able mix styles, decomment 
                        : activeMod+`${modName} ${'0'} `
                
                    prevModGroupTitle = modName;
                }  
        })
        // console.log('activeMod', room + ' ' + `${mainStyle} ` +  activeMod)
        // console.log('roomImages', roomImages)

        const roomActiveMode = activeMod.length === 0 ? currentRoom : (currentRoom + ' ' + `${mainStyle} ` +  activeMod.slice(0, -1)).toLowerCase();
        const newActiveImage = roomImages?.filter((image) => image.title.toLowerCase() === roomActiveMode)[0];

        // if (currentRoom.toLowerCase() === 'küche') { // set final style image for Wohnzimmer depends on kueche style
        //     const styleImage = roomImages?.filter((image) => image.title.toLowerCase() +` küchenabdeckung 0` === ('Wohnzimmer' + ' ' + `${mainStyle} ` +  activeMod.slice(0, -1)).toLowerCase())[0];
        //     console.log('styleImage', 'Wohnzimmer' + ' ' + `${mainStyle} ` +  activeMod.slice(0, -1))
        //     dispatch(setStyleImage(styleImage));
        // }
        // console.log('roomActiveMode', roomActiveMode.slice(0, 43))
        // console.log('roomImages0', roomImages)
        // console.log('roomImages0', roomImages[0].title.slice(0, 43))
        // console.log('roomImages', roomImages[0].title.toLowerCase().slice(0, 43) === roomActiveMode.slice(0, 43))
        setLargeImage(newActiveImage); 
        dispatch(changeRoomImage(currentRoom, newActiveImage));
        // console.log('newActiveImage11', roomImages?.filter((image) => image.title.toLowerCase() === roomActiveMode)[0].title)
    }

    return (
        <div className={`${styles.sidebar} ${sidebarOpen && styles.open} ${currentRoom === 'type' && showStyle && styles.moveLeft} ${currentRoom !== 'type' && !showRoom && styles.moveLeft}` }>
            <div className={styles.sidebar__toggle} onClick={() => dispatch(changeSidebarState(!sidebarOpen))} >
                <span className={styles.toggle}>
                    Ausstattung                 
                    <Image src="/sidebar-navigation.svg" width="24" height="24" alt="Open sidebar icon"/> 
                </span>
            </div>
            {sidebarOpen &&
                <div className={styles.sidebar__content}>
                    <div className={`${[`row ${styles.sidebar__header} items-center`].join(' ')} ${currentRoom === 'type' && showStyle && styles.hideHeader}`}>
                        <div className={[styles["col-6"], "col-6"].join(' ')}>
                            <h3 className={`${styles.optionsTitle}`}>{sidebarTitle}</h3>
                        </div>
                        <div className={`${styles["col-6"]} ${styles.options}`}>
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
                                setIndividualPrice={setIndividualHandler}
                            />
                        }
                    </div>
                </div>
            }
            
            <SidebarButtons currentRoom={currentRoom} styleTypeSet={styleTypeSet} roomId={roomId}/>
        </div>
    )
}
