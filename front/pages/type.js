import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useDispatch, useSelector } from 'react-redux';

import InfoBox from '../components/ui/Components/infoBox';
import Sidebar from '../components/ui/Sidebar/Sidebar';
import ScrollIcon from '../components/ui/Components/scrollIcon';
import StyleChooseButtons from '../components/ui/styleChooseButtons';

import { typePage } from '../gql/index';

import { changeApartStyle, resetRoomTypeState, changeApartPrice } from '../redux/actions/index';

import styles from './room.module.scss';
import LoadingSpinner from '../components/ui/Components/loadingSpinner';

export default function Type() {

    const [styleId, setStyleId] = useState(0);
    const [isScroll, setIsScroll] = useState(false);

    const dispatch = useDispatch();

    const { apartStyle, apartSize, generalStates, apartPrice } = useSelector((state) => state);
    const sidebarState = generalStates.open;

    useEffect(() => {
        // setting of initial style
        setStyleId(apartStyle.style);
    }, [])

    // console.log('apartSize', apartSize)
    console.log('apartPrice', apartPrice)

    const {data, error, loading} = useQuery(typePage);
    if (loading) return <LoadingSpinner full={true}/>;
    if(error) return <p>Error, please read the console. {console.log(error)}</p>

    let currentStyle = data.entry.styles[styleId];
    const styleImage = currentStyle.image[0];

    const changeStyle = (id) => {
        const price = {
            0: 0,
            1: apartSize.livingRoomOpt2Price,
            2: apartSize.livingRoomOpt3Price,
        }

        setStyleId(id);
        currentStyle = data.entry.styles[id];
        dispatch(changeApartStyle(id, currentStyle.image[0], currentStyle.styleTitle));
        dispatch(changeApartPrice('Wohnzimmer', price[id]));
        dispatch(resetRoomTypeState());
    }

    const setStyleTypeHandle = () => {
        dispatch(changeApartStyle(styleId, currentStyle.image[0], currentStyle.styleTitle));
    }

    return (
        <div className={`${styles.type__wrapper}`} >   
            <ScrollContainer 
                className={`${sidebarState && styles.image__wrapperActive} ${styles.image__wrapper}`} 
                onStartScroll={() => setIsScroll(true)}
                onEndScroll={() => setIsScroll(false)}
            >
                <div  className={styles.full} style={{position:"relative", width: "100vw", height: "100vh"}}>
                    <Image 
                        priority 
                        src={styleImage.url} 
                        layout="fill" 
                        className={styles.full} 
                        placeholder="blur" 
                        blurDataURL={'/component.png'}
                        alt="Main image"
                    />
                </div>
            </ScrollContainer>

            {(sidebarState & !isScroll) ?  <ScrollIcon/> : null}

            <Sidebar 
                styleId={styleId} 
                activeStyle={(id) => changeStyle(id)} 
                apartmentPrice = {apartSize.price} 
                title="Wohnzimmer" 
                styleCards={data.entry.styles} 
                styleTypeSet={setStyleTypeHandle} 
                currentRoom={'type'}
            />

            {/* <InfoBox  styleTitle={currentStyle.styleTitle} description={currentStyle.description}/> */}

            <StyleChooseButtons 
                room={'type'} 
                styleTypeSet={setStyleTypeHandle} 
                activeStyle={(id) => changeStyle(id)} 
                styleId={styleId} 
                stylesAmount={data.entry.styles.length}
            />
        </div>
    )
}
