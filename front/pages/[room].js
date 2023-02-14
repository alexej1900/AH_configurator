import { useState, useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Image from 'next/image';

import Sidebar from '../components/ui/Sidebar/Sidebar';
import PinsList from '../components/ui/pinsList';
import ScrollIcon from '../components/ui/Components/scrollIcon';
import StyleChooseButtons from '../components/ui/styleChooseButtons';
import ContactForm from '../components/ui/contactForm';
import ConfirmationForm from '../components/ui/Components/confirmationForm';
import ContactBtn from '../components/ui/Components/contactBtn';
import LoadingSpinner from '../components/ui/Components/loadingSpinner';
import IconComponent from '../components/ui/Components/iconComponent';

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { RoomData } from '../gql/index';

import { useDispatch, useSelector } from "react-redux";
import { 
    changeRoomType, 
    changeSidebarState, 
    changeActivePin, 
    changeActiveMod, 
    changeRoomVisibility, 
    changeLoadingState,
    changeApartPrice
} from '../redux/actions/index';

import styles from './room.module.scss';

let ROOM_TYPE;

export default function Room() {
    const router = useRouter();
    ROOM_TYPE = router.query.room;
    const path = router.asPath.slice(1);

    const [styleId, setStyleId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [largeImage, setLargeImage] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [isPinsVisible, setIsPinsVisible] = useState(true);
    const [optionData, setOptionData] = useState({});

    const dispatch = useDispatch();

    const { apartSize, apartStyle, generalStates, roomType} = useSelector((state) => state);
    const sidebarState = generalStates.open;
    const isImageload = generalStates.loading;
    const roomState = roomType[ROOM_TYPE]; ///// ToDo CHANGE to getModification

// console.log('largeImage', largeImage)
// console.log('roomState', roomState.image)

    useEffect(() => {
        setStyleId(apartStyle.style);
    }, []);

    // const moveImageFunction = async() => {
    //     for (let x = 0; x <= 600; x += 25) {
    //         const scrollableImage = document.querySelector('.indiana-scroll-container--hide-scrollbars');

    //         if (x < 400) {
    //             scrollableImage?.scrollTo({left: sidebarState ? x : 0, behavior: 'smooth'}); 
    //         } 
    //         else {
    //             scrollableImage?.scrollTo({left: sidebarState ? 800 - x : 0, behavior: 'smooth'});
    //         }
    //     }
    // }

    useEffect(async() => {
        dispatch(changeLoadingState(true))
        // document.querySelector('.indiana-scroll-container--hide-scrollbars')?.scrollTo({left: sidebarState ? 0 : 0});
        document.querySelector(`.${styles.image__wrapper}`)?.classList.add(styles.animate);

        setTimeout(() => {
            document.querySelector(`.${styles.image__wrapper}`)?.classList.remove(styles.animate);
            // moveImageFunction();
        }, 1000);

        //if we have in state image of current room, we set this image
        roomType[`${ROOM_TYPE?.toLowerCase()}`] 
            ? setLargeImage(roomType[`${ROOM_TYPE.toLowerCase()}`].image) 
            : setLargeImage(false);

    }, [path]);

    useEffect(async() => {
        setTimeout(() => {
            
            if (data && ROOM_TYPE === 'küche1' || ROOM_TYPE === 'küche2' || ROOM_TYPE === 'küche3') {
                
                const modifications = 
                    data?.entry.mods[0].modificationsTypes
                        .filter((item) => item.modificationName !== 'Böden')
                console.log('data?.entry.mods[0].modificationsTypes', data?.entry.mods[0].modificationsTypes);

                modifications.forEach(item => {
                    changeType(
                        0, 
                        item.modificationName, 
                        item.modificationItemExample[0].modificationImage[0].url, 
                        item.modificationItemExample[0].modificationTitle,
                        item.modificationItemExample[0].modificationStyle,
                        item.modificationItemExample[0].modificationDescr,
                        item.modificationItemExample[0].modsAdditionalPrice,
                        )
                });
            }

            setStyleId(0);
        }, 1000);
    }, [ROOM_TYPE])

    const { data, loading, error } = useQuery(RoomData(ROOM_TYPE));
    if (loading) return <LoadingSpinner full={true}/>
    // if (isImageload) return <LoadingSpinner full={true}/>
    if(error) return <p>Error, please read the console. {console.log(error)}</p>

    // console.log('data.entry', data.entry)
    const activeImage = roomState?.image ? roomState.image : data.entry.roomStyles[0].roomStyleExamples[styleId].styleDefaultImage[0];

    const modifyData = data.entry.mods[0].modificationsTypes;
    
    const changeType = (index, modName,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, mainStyle) => {
        // console.log('index, modName,  featuredImage, styleTitle, subtitle, description, modGroupTitle, mainStyle', {index, modName,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, mainStyle})
        setOptionData({index, modName,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, mainStyle});
        const room = ROOM_TYPE.slice(0, -1) === 'küche' ? ROOM_TYPE.slice(0, -1) : ROOM_TYPE;
        
        if (ROOM_TYPE === 'wohnzimmer') {  // set floor type for all types of rooms
            ['wohnzimmer', 'raumtrenner', 'küche', 'schlafzimmer', 'gang']
                .forEach((room) => dispatch(changeRoomType(room, 'Böden', index,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, largeImage, mainStyle)))
                dispatch(changeApartPrice('Böden', additionalPrice));
        } else if (modName === 'Böden') {  // else show popup with confirmation
            setIsConfirmation(true);
            return;
        } else { // for other options
            dispatch(changeRoomType(room, modName, index,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, largeImage, mainStyle));
            dispatch(changeApartPrice(modName, additionalPrice));
        }

        dispatch(changeActivePin(modName));
    }

    const changeFloorType = () => { // change floor type for all rooms, change price
        ['wohnzimmer', 'raumtrenner', 'küche', 'schlafzimmer', 'gang']
            .forEach((room) => dispatch(changeRoomType(
                room, 
                'Böden', 
                optionData.index,  
                optionData.featuredImage, 
                optionData.styleTitle, 
                optionData.subtitle, 
                optionData.description, 
                optionData.additionalPrice, 
                optionData.modGroupTitle, 
                optionData.mainStyle))
            )
        dispatch(changeApartPrice('Böden', optionData.additionalPrice));
        onCancel();
    }

    const openModificationsList = (modificationName) => {
        dispatch(changeActivePin(modificationName));
    }

    const pinClickHandler = (modName) => {
        dispatch(changeSidebarState(true));
        dispatch(changeRoomVisibility(false))
        openModificationsList(modName);
        dispatch(changeActiveMod(modName));
    }

    //popup function
    
    const onCancel = () => {
        setIsPopup(false);
        setIsConfirmation(false);
        dispatch(changeLoadingState(false))
    };

    // console.log('largeImage', largeImage)
    // console.log('activeImage', activeImage)
    
    return (
        <>
        <div className={`${styles.type__wrapper}`} >  

            <ScrollContainer 
                className={`${sidebarState && styles.image__wrapperActive} ${styles.image__wrapper}`} 
                onStartScroll={() => setIsScroll(true)}
                onEndScroll={() => setIsScroll(false)}
                id={'image__wrapper'}
            >
                <div className={`${styles.full} ${isImageload && styles.blur}`} id='fullImage' style={{position:"relative", width: "100vw", height: "100vh"}}>
                    <Image 
                        src={largeImage ? largeImage.url : activeImage.url} 
                        layout='fill' 
                        object-fit="cover" 
                        style={{width: "100vw", height: "100vh"}}
                        // width={activeImage.width}
                        // height={activeImage.height}
                        onLoadingComplete={() => dispatch(changeLoadingState(false))}
                        priority 
                        // loading='eager'
                        // quality={100}
                        alt="Main image"
                    />

                    {/* {isImageload && <div className={`${styles.loader__wrapper}`}><LoadingSpinner full={true}/></div>} */}
                </div>

                

                {isPinsVisible  && <PinsList data={modifyData} roomState={roomState} pinClickHandler={pinClickHandler} />}
                
            </ScrollContainer>

            {(sidebarState & !isScroll) ? <ScrollIcon/> : null}

            <div className={`${styles.btn__getContacts} ${sidebarState && styles.btn__getContacts_shift}`} onClick={() => setIsPopup(true)}>
                <ContactBtn small={false}/>
            </div>

            <div className={`${styles.btn__pinsHide} ${sidebarState && styles.btn__pinsHide_shift} center`} 
                onClick={() => setIsPinsVisible(!isPinsVisible)}
            >
                <IconComponent name={isPinsVisible ? 'pin_is_open' : 'pin_is_close'} color="#fff"/>
            </div>
            <Sidebar 
                styleId={styleId} 
                apartmentPrice = {apartSize.price} 
                modifyData={modifyData}
                setLargeImage={setLargeImage}
                activeStyle = { 
                    (index, modName, featuredImage, styleTitle, subtitle, additionalPrice, modGroupTitle, mainStyle) => changeType(index, modName,  featuredImage, styleTitle, subtitle, additionalPrice, modGroupTitle, mainStyle)
                }
                currentRoom={ROOM_TYPE}
                title={data.entry.title} 
                stylesCards={true} 
            />

            <StyleChooseButtons room={ROOM_TYPE ? ROOM_TYPE : path} styleTypeSet={() => console.log()} />
        </div>

        {isPopup && <ContactForm onCancel={onCancel}/>}
        {isConfirmation && <ConfirmationForm room={ROOM_TYPE ? ROOM_TYPE : path} onCancel={onCancel} onConfirm={changeFloorType}/>}

        </>
    );
}
