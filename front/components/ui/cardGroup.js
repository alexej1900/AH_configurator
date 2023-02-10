import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { changeRoomFormatIndividual, changeApartPrice, changeApartIndividualPrice, changeActiveMod } from '../../redux/actions/index';

import Card from './card';
import IconComponent from './Components/iconComponent';
import OptionsList from './optionsList';

import getModifications from '../../pages/api/getModifications';

import styles from './cardGroup.module.scss';

export default function CardGroup({ data, activeMod, activeStyle, styleId, room, setActiveMod, activePin }) {

    const [activeTab, setActiveTab] = useState(0);
    const [collapsed, setCollapsed] = useState(!activeMod);
    const [checked, setChecked] = useState(false);
    const [isInLine, setIsInLine] = useState(!activeMod);
    const [onlyIndividual, setOnlyIndividual] = useState(false);

    const dispatch = useDispatch();

    const modificationName = data.modificationName;
   
    const individualPrices = useSelector(state => state.apartPrice.individual);

    const modsGroup = data.modificationGroupBlock;
    const modificationDescription = data.modificationDescription;
    const individual = data.individualSolution ? data.individualSolution[0] : null;
    const isIndividualSetted = individualPrices[modificationName] && individualPrices[modificationName] > 0;

    let modificationImage;
    let modificationTitle;
    let modificationStyle;

    const modifications = getModifications(room);
    // const roomType = useSelector(state => state.roomType);
    // const modifications = roomType[room];
    // console.log('roomTypeCARDGROOP', roomType)
    // console.log('modifications', modifications)

    const optionsClickHandler = (price) => {
        activeStyle(
          activeIndex, 
          modificationName,
          activeModification.modificationImage[0] && activeModification.modificationImage[0].url, 
          activeModification.modificationTitle, 
          activeModification.modificationStyle,
          data.modificationGroupBlock[activeTab].modGroupName
        ); 
        setChecked(true);

        dispatch(changeApartPrice(modificationName, +price));
    }

    const activeModification = (modifications && modifications[`${modificationName}`]) 
        ? {
            modificationImage: [{url: modifications[`${modificationName}`].featuredImage, width: '80px', height: '50px'}],
            modGroupName: modifications[`${modificationName}`].modGroupTitle,
            modificationStyle: modifications[`${modificationName}`].subtitle,
            modificationTitle: modifications[`${modificationName}`].styleTitle,
            modificationNumber: modifications[`${modificationName}`].index,
            activeOption: modifications[`${modificationName}`].option ? modifications[`${modificationName}`].option.index : 0,
        } 
        : data.modificationGroupBlock && data.modificationGroupBlock[0] 
            && {... data.modificationGroupBlock[0]?.modificationExamples[styleId], 
                modificationNumber: styleId, 
                modGroupName: data.modificationGroupBlock[0].modGroupName,
                activeOption: 0,
            } 
            // : {... data.modificationGroupBlock[0]?.modificationExamples[0], modificationNumber: 0, modGroupName: data.modificationGroupBlock[0].modGroupName} ;

    const activeIndex = activeModification.modificationNumber;

    const setModsPrice = (price) => {
        dispatch(changeApartPrice(data.modificationName, price));
    }

    useEffect(() => {
        (modifications && modifications[`${modificationName}`]) && setChecked(true);
    }, [])

    useEffect(() => {
        if (activePin === data.modificationName) {
          setCollapsed(!collapsed ); setIsInLine(isInLine ? !isInLine : isInLine); setActiveMod()
        } else {
          setCollapsed(true);
        }
    }, [activePin])

    useEffect(() => {
        setCollapsed(!activeMod);
    }, [activeMod])

    useEffect(() => {
        setOnlyIndividual(isIndividualSetted);
    }, [individualPrices])

    const individualFormat = () => {
        const individualPrice = data.individualSolution[0].individualSolutionPrice;

        setChecked(true);
        setCollapsed(!activeMod);
        setOnlyIndividual(!isIndividualSetted);

        activeStyle(
            activeIndex, 
            modificationName,
            activeModification.modificationImage[0] && activeModification.modificationImage[0].url, 
            activeModification.modificationTitle, 
            activeModification.modificationStyle,
            data.modificationGroupBlock[activeTab].modGroupName
          ); 
    
        dispatch(changeRoomFormatIndividual(room, modificationName, !isIndividualSetted));
        dispatch(changeApartIndividualPrice(data.modificationName, !onlyIndividual ? individualPrice : 0) );
        dispatch(changeApartPrice(data.modificationName, 0));
    }

    const listSwitchHandler = () => {
        setCollapsed(!collapsed ); 
        setIsInLine(isInLine ? !isInLine : isInLine); 
        setActiveMod();
    
        dispatch(changeActiveMod(modificationName));
      }

    return (

        <div className={`${styles.card__wrapper} ${collapsed && styles.collapsed} ${isInLine | individual && styles.inLine}`}>
            <div className={styles.card__header} onClick={() => listSwitchHandler()}>
                <div className={`${styles.arrow} ${collapsed && styles.rotate}`} ></div>

                <h4 className={styles.mod__title}>{data.modificationName}</h4>

                {checked &&
                    <div className={styles.checkIcon}>
                        <IconComponent name="check" color={styles.checkIconColor}/>
                    </div>
                }
            </div>

            <div className={styles.group__wrapper}>
                <div className={`${styles.tabs__wrapper}`}>   
                
                    {modsGroup.map((group, groupIndex) => {

                        return (
                            <div key={groupIndex} className={`${styles.tabs}`}>
                                <span className={`${activeTab === groupIndex && styles.active}`} onClick={() => {setActiveTab(groupIndex)}}>
                                    {group.modGroupName}
                                </span>
                            </div>
                            )
                        })
                    } 
                </div> 
                <div className={`${styles.mod__description}`}>
                    {modificationDescription}
                </div>  

                {modsGroup.map((group, groupIndex) => {

                    return (
                        <div key={groupIndex} className={`${styles.card__list} ${activeTab === groupIndex && styles.active__list}`  }>
                            {collapsed | onlyIndividual
                                ? <Card
                                    checked={() => setChecked(true)}
                                    selectCard= {() => listSwitchHandler()}
                                    type='small'
                                    image={!onlyIndividual 
                                        ? {url: activeModification.modificationImage[0].url, width: '80px', height: '50px', layout: "fixed"} 
                                        : {url: 'individ-icon.svg', width: '30px', height: '30px', layout: "fixed", background: '#00d2d3'}}
                                    subtitle={!onlyIndividual ? activeModification.modificationStyle : 'Individual'}
                                    title={!onlyIndividual ? activeModification.modificationTitle : ''}
                                    description={!onlyIndividual ? activeModification.modificationDescr : ''}
                                    active = 'true'
                                    collapsed={collapsed}
                                />
                                : group.modificationExamples.map((item, index)=>{
                                    
                                    modificationImage = item.modificationImage;
                                    modificationTitle = item.modificationTitle;
                                    modificationStyle = item.modificationStyle;
        
                                    return (
                                        <div key={index} className={`${styles.card__block}`}>
                                            <Card
                                                selectCard= {() => {
                                                    activeStyle(
                                                        index, 
                                                        data.modificationName,
                                                        item.modificationImage && item.modificationImage[0].url, 
                                                        item.modificationTitle, 
                                                        item.modificationStyle,
                                                        item.modificationDescr,
                                                        group.modGroupName
                                                    );
                                                    setChecked(true);
                                                    setModsPrice(group.modsAdditionalPrice ? group.modsAdditionalPrice : 0);
                                                    }
                                                }
                                                type='small'
                                                image={modificationImage[0]}
                                                subtitle={modificationStyle}
                                                title={modificationTitle}
                                                description={item.modificationDescr}
                                                active = {activeModification.modGroupName === group.modGroupName && activeIndex === index}
                                            /> 
                                        </div>
                                    )
                                })
                            }
                            {group.optionsList &&
                                <OptionsList 
                                    selectCard= {optionsClickHandler}
                                    data={group.optionsList}
                                    modificationName={modificationName}
                                    inLine={isInLine}
                                    onlyIndividual={collapsed | onlyIndividual}
                                    activeFormat={activeModification.activeOption}
                                />
                            }
                        </div>
                    )})
                }
            </div>

            {individual?.enableIndividualSolution && 
                <div className={`${styles.individual} ${collapsed  && styles.individual__inLine}`}>
                    <span>Ich wünsche eine</span>
                    <p className="toggle">Individuelle Lösung 
                        <input 
                            type="checkbox" 
                            id={modificationName} 
                            onChange={() => individualFormat()}
                            checked={isIndividualSetted}
                        />
                        <label htmlFor={modificationName}>Toggle</label>
                    </p>
                </div>
            }
        </div>
    );
}
