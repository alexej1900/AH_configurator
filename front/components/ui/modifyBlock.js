import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { 
  changeActiveMod, 
  changeActivePin, 
  changeLoadingState
} from '../../redux/actions/index';

import Card from './card';
import IconComponent from './atoms/iconComponent';

import getModifications from '../../pages/api/getModifications';

import styles from './modifyBlock.module.scss';

export default function ModifyBlock({
  activeStyle, 
  cardItem, 
  styleId, 
  roomType, 
  activeMod, 
  setActiveMod, 
  activePin, 
}) {

  const [collapsed, setCollapsed] = useState(!activeMod);
  const [checked, setChecked] = useState(false);
  const [isInLine, setIsInLine] = useState(!activeMod);
  const [disabledCards, setDisabledCards] = useState([]);
  const [activeModification, setActiveModification] = useState(
    {... cardItem.modificationItemExample[0], modificationNumber: 0, activeOption: 0}
    );

  const roomState = useSelector(state => state.roomType)[roomType.slice(0, 5) === 'küche' ? 'küche' : roomType];
  const style = useSelector(state => state.apartStyle);
  const apartSize = useSelector(state => state.apartSize);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activePin === cardItem.modificationName) {
      setCollapsed(collapsed ? !collapsed : collapsed); 
      setIsInLine(isInLine ? !isInLine : isInLine); 
      setActiveMod();

    } else {
      setCollapsed(true);
    }
  }, [activePin])

  useEffect(() => {
    setCollapsed(!activeMod);
  }, [activeMod]);

  const modificationName = cardItem.modificationName;
  const modificationDescription = cardItem.modificationDescription;

  let modificationImage;
  let modificationTitle;
  let modificationStyle;
  let activeIndex = 0;
  console.log('modificationName', modificationName)
  console.log('apartSize.additionCorridorCloset', apartSize.additionCorridorCloset)

  const modsAdditionalPrice = roomType === 'raumtrenner' && modificationName === 'Schiebetür' 
        ? {0: 0, 1: apartSize.livingRoomDoorPrice}
        :  modificationName === 'Böden' 
        ? {0: 0, 1: apartSize.livingRoomOpt2Price, 2: apartSize.livingRoomOpt3Price}
        :  roomType === 'badewanne' && modificationName === 'Platten' 
        ? {0: 0, 1: apartSize.bath1PlatePrice}
        :  roomType === 'badewanne' && modificationName === 'Spiegel' 
        ? {0: 0, 1: apartSize.bath1MirrorClosetPrice}
        :  roomType === 'badewanne' && modificationName === 'Waschbecken' 
        ? {0: 0, 1: apartSize.bath1Lavabo2Price}
        :  roomType === 'badewanne' && modificationName === 'Möbel' 
        ? {0: 0, 1: apartSize.bath1FurniturePrice}
        :  roomType === 'badewanne' && modificationName === 'Schiebetür' 
        ? {0: 0, 1: apartSize.bath1ShiftDoorPrice}
        :  roomType === 'dusche' && modificationName === 'Platten' 
        ? {0: 0, 1: apartSize.dushePlatePrice}
        :  roomType === 'dusche' && modificationName === 'Spiegel' 
        ? {0: 0, 1: apartSize.dusheMirrorClosetPrice}
        :  roomType === 'dusche' && modificationName === 'Möbel' 
        ? {0: 0, 1: apartSize.dusheFurniture2Price, 2: apartSize.dusheFurniture3Price, 3: apartSize.dusheFurniture4Price}
        :  roomType === 'schlafzimmer' && modificationName === 'Einbauschrank' 
        ? {0: 0, 1: apartSize.bedroomClosetPrice}
        :  roomType === 'gang' && modificationName === 'Einbauschrank' 
        ? {0: 0, 1: apartSize.additionalClosetPrice}
        :  roomType === 'gang' && modificationName === 'Zusätzlicher Einbauschrank Flur' 
        ? {0: 0, 1: apartSize.additionCorridorCloset}
        :  roomType === 'gang' && modificationName === 'Zusätzlicher Einbauschrank weiteres Zimmer' 
        ? {0: 0, 1: apartSize.additionRoomCloset}
        :  roomType === 'küche4' && modificationName === 'Front' 
        ? {0: 0, 1: apartSize.kitchen2Front2Price, 2: apartSize.kitchen2Front3Price}
        :  roomType === 'küche4' && modificationName === 'Rückwand' 
        ? {0: 0, 1: apartSize.kitchen2Back2Price}
        : {}

  const modifications = getModifications(roomType.slice(0, 5) === 'küche' ? 'küche' : roomType);

  useEffect(() => {
    if (modifications && modifications[`${modificationName}`]) {
      setChecked(true);
      setIsInLine(false);
    } 
  }, []);

  useEffect(() => {
    changeActiveModification();
    setDisabledCardList();
  }, [modifications]);

  const listSwitchHandler = () => {
    setCollapsed(!collapsed ); 
    setIsInLine(isInLine ? !isInLine : isInLine); 
    setActiveMod();

    dispatch(changeActiveMod(modificationName));
    dispatch(changeActivePin(modificationName));
  }

  // const setModsPrice = (price) => {
  //   dispatch(changeApartPrice(cardItem.modificationName, price));
  // }

  const changeActiveModification = () => {
    const activeMod = (modifications && modifications[`${modificationName}`]) 
    ? {
      modificationImage: [{url: modifications[`${modificationName}`].featuredImage, width: '80px', height: '50px'}],
      modificationStyle: modifications[`${modificationName}`].subtitle,
      modificationTitle: modifications[`${modificationName}`].styleTitle,
      modificationNumber: modifications[`${modificationName}`].index,
      activeOption: modifications[`${modificationName}`].option ? modifications[`${modificationName}`].option.index : undefined,
    } 
    // : roomType !== "schlafzimmer" ? {... cardItem.modificationItemExample[0], modificationNumber: 0, activeOption: styleId,} // if style lines are not separated, replace to commented code below (3 lines)
    
                                  : cardItem.modificationItemExample && cardItem.modificationItemExample[styleId] 
                                    ? {... cardItem.modificationItemExample[styleId], modificationNumber: styleId, activeOption: 0,} 
                                    : {... cardItem.modificationItemExample[0], modificationNumber: 0, activeOption: 0} ;
  
    setActiveModification(activeMod);
  }

  const checkIsCardDisable = (item) => {
    let cardIsDisabled = false;
    const modificationsKeys = roomState && Object.keys(roomState.modifications);
    const modificationsKeysCorrected = modificationsKeys && modificationsKeys
      .map((key) => key.toLowerCase()
        .replaceAll('ü', 'u').replaceAll('ö', 'o').replaceAll('ä', 'a') //replacing german letters
        .replaceAll('ü', 'u').replaceAll('ö', 'o').replaceAll('ä', 'a') //replacing swiss-german letters
      );

    item?.setDisabling?.forEach((disableParam) => {

    if (modificationsKeysCorrected?.includes(disableParam.disableIf)) {
      const index = modificationsKeysCorrected.indexOf(disableParam.disableIf);
      if (cardIsDisabled) return cardIsDisabled;
      cardIsDisabled = roomState.modifications[`${modificationsKeys[index]}`].index == +disableParam.value;
      }
    })
    
    return cardIsDisabled;
  }

  const setDisabledCardList = () => {
    const disabledCards = cardItem.modificationItemExample.map((item)=>{
      return checkIsCardDisable(item)
    });

    setDisabledCards(disabledCards);
  }

  const selectCardHandler = (
    index, 
    modificationName, 
    modificationImage, 
    modificationTitle, 
    modificationStyle, 
    modificationDescr
    ) => {
      
    activeStyle(index, modificationName, modificationImage, modificationTitle, modificationStyle, modificationDescr, modsAdditionalPrice[index] ? modsAdditionalPrice[index] : 0);
    setChecked(true);
    cardItem.modificationVisibility && dispatch(changeLoadingState(true)); // if modification non visible, don't loads new big image
  }

  activeIndex = activeModification.modificationNumber;

  // console.log('modifications', modifications)
  // console.log('modificationName', modificationName)
  // console.log('apartSize', apartSize)
  return (
    <>
      <div className={`${styles.card__wrapper} ${collapsed && styles.collapsed} ${isInLine && styles.inLine}`}>
        <div className={styles.card__header} onClick={() => listSwitchHandler()}>
          <div className={`${styles.arrow} ${collapsed && styles.rotate}`}></div>

          <h3 className={styles.mod__title}>{modificationName}</h3>

          {cardItem.modificationItemExample.length > 1 &&
            <div className={styles.card_group__number}>
                <span>{cardItem.modificationItemExample.length}</span>
            </div>
          }

          {/* {checked &&
            <div className={styles.checkIcon}>
              <IconComponent name="check" color="#fff"/>
            </div>
          } */}

        </div> 
        {modificationDescription
          ? <div className={`${styles.mod__description}`}>
              {modificationDescription}
            </div>
          : null
        }       
        <div className={`${styles.card__list}`}>

          {collapsed
            ? <Card
                checked={() => setChecked(true)}
                selectCard= {() => listSwitchHandler()}
                type='small'
                image={{url: activeModification.modificationImage[0].url, width: '80px', height: '50px', layout: "fixed"}}
                subtitle={!activeModification.modificationStyle}
                title={activeModification.modificationTitle}
                description={activeModification.modificationDescr}
                active = 'true'
                collapsed={collapsed}
                disable = {disabledCards[activeModification.index]}
                onlyOne={cardItem.modificationItemExample.length === 1}
              />
            : cardItem.modificationItemExample.map((item, index)=>{

              modificationImage = item.modificationImage;
              modificationTitle = item.modificationTitle;
              modificationStyle = item.modificationStyle;

              if (!item.mainStyle || item.mainStyle === 'false' || item.mainStyle.toLowerCase().replaceAll(' ', '') === style.title.toLowerCase().replaceAll(' ', '')) {
                
                return (
                  <div key={index} className={`${styles.card__block}`}>
                    <Card
                      key={index}
                      selectCard={() => selectCardHandler(
                        index, 
                        cardItem.modificationName,
                        item.modificationImage && item.modificationImage[0].url, 
                        item.modificationTitle, 
                        item.modificationStyle,
                        item.modificationDescr,
                        // item.modsAdditionalPrice,
                      )
                    }
                      type='small'
                      image={modificationImage[0]}
                      subtitle={modificationStyle}
                      title={modificationTitle}
                      description={item.modificationDescr}
                      active = {activeIndex === index}
                      disable = {disabledCards[index]}
                      optionPrice = {modsAdditionalPrice[index]}
                      onlyOne={cardItem.modificationItemExample.length === 1}
                    /> 
                  </div>
                )
              }
            })
          }
        </div>  
      </div>
    </>
  )
}
