import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeActiveMod, changeActivePin } from '../../redux/actions/index';

import ModifyBlock from './modifyBlock';
import CardGroup from './cardGroup';
import InfoTitle from './atoms/infoTitle';

import styles from './modifyCards.module.scss';

export default function ModifyCards({ activeStyle, cardData, styleId, roomType, setIndividualPrice }) {
  const [activeMod, setActiveMod] = useState(0);
  const [isActiveModVisible, setIsActiveModVisible] = useState(true);
  const dispatch = useDispatch();

  const pinState = useSelector((state) => state.generalStates).pin;

  const style = useSelector(state => state.apartStyle).title;

  const dataByStyle = cardData?.filter((data) => {
    return !data.modificationMainStyle || data.modificationMainStyle === 'false' || data.modificationMainStyle.toLowerCase() === style.toLowerCase().replaceAll(' ', '')
  });

  const visibleData = dataByStyle?.filter((data) => data.modificationVisibility);
  const nonVisibleData = dataByStyle?.filter((data) => !data.modificationVisibility);
  
  useEffect(() => {
    visibleData.length === 0 && setIsActiveModVisible(false);
  }, []);

  useEffect(() => {
    (visibleData.length - 1) < activeMod && setActiveMod(0);
    dispatch(changeActivePin(visibleData[0]?.modificationName));
  }, [roomType]);

  // console.log('visibleData', visibleData)
// console.log('style', style.toLowerCase().replaceAll(' ', ''))
// console.log('data.modificationMainStyle.toLowerCase()', data.modificationMainStyle.toLowerCase())
  return (
    <>
      <div className={styles.list__visible}>

        {visibleData?.map((cardItem, index) => {

          return !cardItem.modificationGroupBlock ? (
            <ModifyBlock 
              key={index}
              activeMod={isActiveModVisible && activeMod === index}
              setActiveMod={() => {
                setActiveMod(index);
                setIsActiveModVisible(true);
              }}
              cardItem={cardItem}
              activeStyle={activeStyle}
              styleId={styleId}
              roomType={roomType}
              setIndividualPrice={setIndividualPrice}
              activePin={pinState}
            />
          )
        : (
            <CardGroup 
              key={index}
              data={cardItem} 
              activeStyle={activeStyle}
              setActiveMod={() => {
                setActiveMod(index);
                setIsActiveModVisible(true);
              }}
              styleId={styleId}
              room={roomType}
              setIndividualPrice={setIndividualPrice}
              activeMod={activeMod === index}
              activePin={pinState}
            />
          )
        }) 
        }
      </div>
      
      {nonVisibleData.length !== 0 && 
      
        <div className={styles.list__nonvisible}>
          <InfoTitle 
            title={'Einbauschr??nke in anderen Zimmern'}
            infoText={'Die nachfolgenden Optionen werden nicht in den Visualisierungen dargestellt, jedoch in der Berechnung und der Zusammenfassung ber??cksichtigt'}
          />

          {nonVisibleData?.map((cardItem, index) => {

            return !cardItem.modificationGroupBlock ? (
              <ModifyBlock 
                key={index}
                activeMod={!isActiveModVisible && activeMod === index}
                setActiveMod={() => {
                  setIsActiveModVisible(false);
                  setActiveMod(index);
                }}
                cardItem={cardItem}
                activeStyle={activeStyle}
                styleId={styleId}
                roomType={roomType}
                setIndividualPrice={setIndividualPrice}
                activePin={pinState}
              />
            )
          : (
              <CardGroup 
                key={index}
                data={cardItem} 
                activeStyle={activeStyle}
                setActiveMod={() => {
                  setActiveMod(index);
                  setIsActiveModVisible(false);
                }}
                styleId={styleId}
                room={roomType}
                setIndividualPrice={setIndividualPrice}
                activeMod={activeMod === index}
                activePin={pinState}
              />
            )
          }) 
          }
        </div>
      }
    </>
  )
}
