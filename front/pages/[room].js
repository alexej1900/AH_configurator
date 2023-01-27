import { useState, useEffect } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import Image from 'next/image';

import Sidebar from '../components/ui/Sidebar/Sidebar';
import PinsList from '../components/ui/pinsList';
import ScrollIcon from '../components/ui/Components/scrollIcon';
import StyleChooseButtons from '../components/ui/styleChooseButtons';
import ContactForm from '../components/ui/contactForm';
import ContactBtn from '../components/ui/Components/contactBtn';
import LoadingSpinner from '../components/ui/Components/loadingSpinner';

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { RoomData } from '../gql/index';

import { useDispatch, useSelector } from "react-redux";
import { changeRoomType, changeSidebarState, changeActivePin, changeActiveMod , changeRoomVisibility, changeLoadingState} from '../redux/actions/index';

import styles from './room.module.scss';

let ROOM_TYPE;

export default function Room() {
    const router = useRouter();
    ROOM_TYPE = router.query.room;
    const path = router.asPath.slice(1);

    const [styleId, setStyleId] = useState(0);
    const [largeImage, setLargeImage] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [isPinsVisible, setIsPinsVisible] = useState(true);

    const dispatch = useDispatch();

    const { apartSize, apartStyle, generalStates, roomType} = useSelector((state) => state);
    const sidebarState = generalStates.open;
    const isImageload = generalStates.loading;
    const roomState = roomType[ROOM_TYPE]; ///// ToDo CHANGE to getModification

// console.log('largeImage', largeImage)
console.log('apartSize', apartSize)

    useEffect(() => {
        setStyleId(apartStyle.style);
    }, []);

    // useEffect(() => {
    //     dispatch(changeLoadingState(true));
    // }, [largeImage]);

    const moveImageFunction = async() => {
        for (let x = 0; x <= 600; x += 25) {
            const scrollableImage = document.querySelector('.indiana-scroll-container--hide-scrollbars');

            if (x < 400) {
                scrollableImage?.scrollTo({left: sidebarState ? x : 0, behavior: 'smooth'}); 
            } 
            else {
                scrollableImage?.scrollTo({left: sidebarState ? 800 - x : 0, behavior: 'smooth'});
            }
        }
    }

    useEffect(async() => {
        document.querySelector('.indiana-scroll-container--hide-scrollbars')?.scrollTo({left: sidebarState ? 0 : 0});
        document.querySelector(`.${styles.image__wrapper}`)?.classList.add(styles.animate);

        setTimeout(() => {
            document.querySelector(`.${styles.image__wrapper}`)?.classList.remove(styles.animate);
            moveImageFunction();
        }, 1000);

        //if we have in state image of current room, we set this image
        roomType[`${ROOM_TYPE?.toLowerCase()}`] 
            ? setLargeImage(roomType[`${ROOM_TYPE.toLowerCase()}`].image) 
            : setLargeImage(false);

    }, [path]);
    
    const { data, loading, error } = useQuery(RoomData(ROOM_TYPE));
    if (loading) return <LoadingSpinner full={true}/>
    if(error) return <p>Error, please read the console. {console.log(error)}</p>
    
    const activeImage = roomState?.image ? roomState.image : data.entry.roomStyles[0].roomStyleExamples[styleId].styleDefaultImage[0];

    const modifyData = data.entry.mods[0].modificationsTypes;
    
    const changeType = (index, modName,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, mainStyle) => {
        // console.log('index, modName,  featuredImage, styleTitle, subtitle, description, modGroupTitle, mainStyle', {index, modName,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, mainStyle})
        dispatch(changeRoomType(ROOM_TYPE, modName, index,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, largeImage, mainStyle));
        dispatch(changeActivePin(modName));
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
    
    const onCancel = () => setIsPopup(false);

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

            <div className={`${styles.btn__getContacts} ${sidebarState && styles.btn__getContacts_shift}`} 
                onClick={() => setIsPopup(true)}
            >
                <ContactBtn/>
            </div>
            <div className={`${styles.btn__pinsHide} ${sidebarState && styles.btn__pinsHide_shift} center`} 
                onClick={() => setIsPinsVisible(!isPinsVisible)}
            >
                <img src={isPinsVisible ? '/pin_is_open.svg' : '/pin_is_close.svg'} width="26px" height="26px" alt="Hide pins icon"/>
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
        </>
    );
}
