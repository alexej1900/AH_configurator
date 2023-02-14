import Image from 'next/image';

import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ScrollContainer from 'react-indiana-drag-scroll';

import { useDispatch, useSelector } from 'react-redux';

import InfoBox from '../components/ui/Components/infoBox';
import Sidebar from '../components/ui/Sidebar/Sidebar';
import ScrollIcon from '../components/ui/Components/scrollIcon';
import StyleChooseButtons from '../components/ui/styleChooseButtons';

import { kitchenTypePage } from '../gql/index';

import { resetRoomTypeState, changeKitchenStyle, changeApartPrice } from '../redux/actions/index';

import styles from './room.module.scss';
import LoadingSpinner from '../components/ui/Components/loadingSpinner';

export default function KitchenType() {

    const [styleId, setStyleId] = useState(0);
    const [isScroll, setIsScroll] = useState(false);

    const dispatch = useDispatch();

    const { apartStyle, apartSize, generalStates, roomType } = useSelector((state) => state);
    const sidebarState = generalStates.open;

    useEffect(() => {
        // setting of initial style
        setStyleId(apartStyle.kitchenStyle);
    }, [])

    // console.log('apartStyle', apartStyle)
    // console.log('roomType', roomType)

    const {data, error, loading} = useQuery(kitchenTypePage);
    if (loading) return <LoadingSpinner full={true}/>;
    if(error) return <p>Error, please read the console. {console.log(error)}</p>
    // console.log('data', data);

    let currentStyle = data.entry.styles[styleId];
    const styleImage = currentStyle.image[0];

    const changeStyle = (id) => {
        

      const price = {
        0: 0,
        1: apartSize.kitchen1Opt2Price,
        2: apartSize.kitchen1Opt3Price,
        3: apartSize.kitchen2Price,
      }

      setStyleId(id);
      currentStyle = data.entry.styles[id];
      dispatch(changeKitchenStyle(id, currentStyle.image[0], currentStyle.styleTitle));
      dispatch(changeApartPrice('Küchendesign', price[id]));
      // dispatch(resetRoomTypeState());
    }

    const setStyleTypeHandle = () => { 
        dispatch(changeKitchenStyle(styleId, currentStyle.image[0], currentStyle.styleTitle));
    }

    return (
        <div className={`${styles.type__wrapper}`} >   
            <ScrollContainer 
                className={`
                    ${sidebarState && styles.image__wrapperActive} 
                    ${styles.image__wrapper}
                `} 
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
                title="Küchendesign" 
                styleCards={data.entry.styles} 
                styleTypeSet={setStyleTypeHandle} 
                currentRoom={'kitchen-type'}
            />

            <InfoBox  styleTitle={currentStyle.styleTitle} description={currentStyle.description}/>

            <StyleChooseButtons 
                room={'kitchen-type'} 
                styleTypeSet={setStyleTypeHandle} 
                activeStyle={(id) => changeStyle(id)} 
                styleId={styleId} 
                stylesAmount={data.entry.styles.length}
            />
        </div>
    )
}
