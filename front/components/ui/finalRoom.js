import Image from 'next/image';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import getModifications from '../../pages/api/getModifications';
import getImages from '../../pages/api/getImages';

import { 
  changeSidebarState, 
  setSummaryVisibility, 
  changeRoomVisibility, 
  changeActivePin, 
  changeActiveMod 
} from '../../redux/actions/index';

import { useQuery } from '@apollo/client';
import { RoomData } from '../../gql/index';

import checkObjIsEmpty from '../../utils/checkObjIsEmpty';

import Card from './card';
import OptionItem from './atoms/optionItem';
import LoadingSpinner from './atoms/loadingSpinner';
import IconComponent from './atoms/iconComponent';

import styles from './finalRoom.module.scss';

export default function FinalRoom({ roomName, style }) {
  const dispatch = useDispatch();
  const roomImages = getImages();
  const { roomType, apartStyle, apartSize } = useSelector(state => state);
  // console.log('roomName', roomName)
  const currentRoom = roomName === 'Küche' ? `${roomName}${apartStyle.kitchenStyle + 1}` : roomName;
  const modifications = getModifications(currentRoom.slice(0, 5) === 'Küche' ? 'küche' : currentRoom);

  const { data, loading, error } = useQuery(RoomData(currentRoom.toLowerCase()));
  if (loading) return <LoadingSpinner/>
  if(error) return <p>Error, please read the console. {console.log(error)}</p>

  const modifyData = data.entry?.mods[0].modificationsTypes;
  
  const dataByStyle = modifyData?.filter((data) => {
    return !data.modificationMainStyle || data.modificationMainStyle === 'false' || data.modificationMainStyle.toLowerCase() === style.toLowerCase()
  });

  const room = roomType[`${roomName.toLowerCase()}`] 
    ? roomType[`${roomName.toLowerCase()}`] 
    : {image: data.entry.roomStyles[0].roomStyleExamples[0].styleDefaultImage[0]}
    // console.log('room', room)
    // if we have main styles decomment 3 lines below and delete 3 lines abowe ==============
    // : {image: data.entry.roomStyles[0].roomStyleExamples.filter(item => {
    //   return item.styleName.toLowerCase() === style.toLowerCase()
    // })[0].styleDefaultImage[0]};

  // const roomImage = room.image ? room.image : data.entry.roomStyles[0].roomStyleExamples[0].styleDefaultImage[0];

  const editClickHandler = (modName) => {
    dispatch(changeSidebarState(true));
    dispatch(changeRoomVisibility(false));
    dispatch(setSummaryVisibility(true));
    dispatch(changeActivePin(modName));
    dispatch(changeActiveMod(modName));
  }

  const allOptions = dataByStyle
    .filter((data) => apartSize[data.modificationIndex])
    .map((item) => {
    if(room?.modifications && room?.modifications[item.modificationName]) {
      return [item.modificationName, room.modifications[item.modificationName]]
    } else {
      const card = {
        modGroupTitle : '', 
        featuredImage : item.modificationItemExample[0].modificationImage[0].url, 
        styleTitle : item.modificationItemExample[0].modificationTitle, 
        subtitle : item.modificationItemExample[0].modificationStyle, 
        description : item.modificationItemExample[0].modificationDescr,
        additionalPrice: item.modificationItemExample[0].modsAdditionalPrice
      }
      
      return [item.modificationName, card]
    }
  })

  const SleepRoomNonVisibleOptions = roomName === "Schlafzimmer" && dataByStyle
    .filter((data) => !data.modificationVisibility && apartSize[data.modificationIndex])
    .map((item) => {
    if(room?.modifications && room?.modifications[item.modificationName]) {
      return [item.modificationName, room.modifications[item.modificationName]]
    } else {
      const card = {
        modGroupTitle : '', 
        featuredImage : item.modificationItemExample[0].modificationImage[0].url, 
        styleTitle : item.modificationItemExample[0].modificationTitle, 
        subtitle : item.modificationItemExample[0].modificationStyle, 
        description : item.modificationItemExample[0].modificationDescr,
        additionalPrice: item.modificationItemExample[0].modsAdditionalPrice
      }
      
      return [item.modificationName, card]
    }
  })

  const SleepRoomVisibleOptions = roomName === "Schlafzimmer" && dataByStyle
    .filter((data) => data.modificationVisibility && apartSize[data.modificationIndex])
    .map((item) => {
    if(room?.modifications && room?.modifications[item.modificationName]) {
      return [item.modificationName, room.modifications[item.modificationName]]
    } else {
      const card = {
        modGroupTitle : '', 
        featuredImage : item.modificationItemExample[0].modificationImage[0].url, 
        styleTitle : item.modificationItemExample[0].modificationTitle, 
        subtitle : item.modificationItemExample[0].modificationStyle, 
        description : item.modificationItemExample[0].modificationDescr,
        additionalPrice: item.modificationItemExample[0].modsAdditionalPrice
      }
      
      return [item.modificationName, card]
    }
  })

  console.log('SleepRoomNonVisibleOptions', SleepRoomNonVisibleOptions)
  console.log('SleepRoomVisibleOptions', SleepRoomVisibleOptions)

  // Comparing choosed modification and existing images (filter images from DB)
  let activeMod = '';
  
  modifyData.forEach((item) => {

    if (item.modificationVisibility && apartSize[item.modificationIndex]) {
      const modName = item.modificationName;
      activeMod = modifications && modifications[modName]
        ? activeMod + 
          `${modName} ${modifications[modName].index} `
        : activeMod+`${modName} ${'0'} `
      }  
  })

  const showOptionList = (list) => {
    return (
      <div className={`${styles.summary__room_data}`}> 
        {list.map((data, index) => {

            const {modGroupTitle, featuredImage, styleTitle, subtitle, description, additionalPrice} = data[1];
            // console.log('data[1]', data[1])
            if (!checkObjIsEmpty(data[1])) 
              return (
                <div key={index} className={`${styles.halfLine}`}>

                  <div className={`${data[1].option ? styles.halfLine : ''}`}>
                    <h5 className={`${styles.summary__room_data_title}`}>{data[0]}  {`${modGroupTitle ?  '- ' + modGroupTitle : ''}`}</h5>
                    <div className={`${styles.summary__room_card_wrapper}`}>
                      <Link href={`/${currentRoom.toLowerCase()}`} >
                        <a className={`${styles.summary__room_edit_icon}`} onClick={() => editClickHandler(data[0])}>
                          <IconComponent name="edit" color="#000"/>
                        </a>		
                      </Link>
                      
                      <Card 
                        title={data[1].individualFormat ? "Individuelle Lösung" : styleTitle} 
                        subtitle={data[1].individualFormat ? "" :  subtitle} 
                        description={data[1].individualFormat ? "" : description}
                        additionalPrice={data[1].individualFormat ? "" : additionalPrice}
                        image={{url: data[1].individualFormat ? "/individ-icon.svg" : featuredImage, width: '125px', height: '100px', layout: "fixed"}}
                        type="small" 
                        final={true}
                        selectCard={() => null} 
                      />
                    </div>
                  </div>
                </div>	
              )
          })
        }
      </div> 
    )
  }     

  const roomActiveMode = 
    activeMod.length === 0 ? currentRoom.toLowerCase() : (currentRoom + ' ' +  activeMod.slice(0, -1)).toLowerCase();
  const roomImage1 = roomImages?.filter((image) => image.title.toLowerCase() === roomActiveMode.toLowerCase())[0];
  const roomImage = room.image ? room.image : roomImage1;
  // console.log('SleepRoomNonVisibleOptions', SleepRoomNonVisibleOptions)
  // console.log('SleepRoomVisibleOptions', SleepRoomVisibleOptions)

  return (
    <section className={`${styles.summary__room} ` }>
      <div className={`${styles.summary__room_image}`}>
        {roomImage?.url && <Image classes="ofi" src={roomImage.url} layout="fill" priority="true" alt="Room Image"/>}
      </div> 
      <div className={`${styles.summary__room_title}`}>{roomName}</div>
          
      {roomName !== "Schlafzimmer" && showOptionList(allOptions)}

      {roomName === "Schlafzimmer" && showOptionList(SleepRoomVisibleOptions) }

      { roomName === "Schlafzimmer" && SleepRoomNonVisibleOptions.length > 0 && 
        <div className={`${styles.summary__room_title}`}>Zuzätzliche Einbauschränke in weiteren Räumen</div>}
      
      { roomName === "Schlafzimmer" && showOptionList(SleepRoomNonVisibleOptions) }
    </section>
  )
}
