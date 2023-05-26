import Image from 'next/image';

import { useSelector } from 'react-redux';
import getModifications from '../../pages/api/getModifications';
import getImages from '../../pages/api/getImages';

import { useQuery } from '@apollo/client';
import { RoomData } from '../../gql/index';

import checkObjIsEmpty from '../../utils/checkObjIsEmpty';

import Card from './card';
import LoadingSpinner from './atoms/loadingSpinner';

import styles from './finalRoomToPdf.module.scss';

export default function FinalRoomToPdf({ roomName }) {
  const roomImages = getImages();
  const { roomType, apartStyle, apartSize } = useSelector(state => state);
  
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

  const allOptions = dataByStyle
    .filter((data) => apartSize[data.modificationIndex])
    .map((item) => {
    if(room?.modifications && room?.modifications[item.modificationName]) {
      return [item.modificationName, room.modifications[item.modificationName]]
    } else {
      const card = {
        modGroupTitle : '', 
        featuredImage : item.modificationItemExample[0].modificationImage[0].url, 
        styleTitle : item.modificationItemExample[0].modificationStyle, 
        subtitle : item.modificationItemExample[0].modificationTitle, 
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
        styleTitle : item.modificationItemExample[0].modificationStyle, 
        subtitle : item.modificationItemExample[0].modificationTitle, 
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
        styleTitle : item.modificationItemExample[0].modificationStyle, 
        subtitle : item.modificationItemExample[0].modificationTitle, 
        description : item.modificationItemExample[0].modificationDescr,
        additionalPrice: item.modificationItemExample[0].modsAdditionalPrice
      }
      return [item.modificationName, card]
    }
  })

  // Comparing choosed modification and existing images 
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
            if (!checkObjIsEmpty(data[1])) 
              return (
                <div key={index} className={`${data[1].option ? styles.fullLine : styles.halfLine}`}>

                  <div className={`${data[1].option ? styles.halfLine : ''}`}>
                    <h5 className={`${styles.summary__room_data_title}`}>{data[0]}  {`${modGroupTitle ?  '- ' + modGroupTitle : ''}`}</h5>
                    <div className={`${styles.summary__room_card_wrapper}`}>
                      <Card 
                        title={styleTitle} 
                        subtitle={subtitle} 
                        description={description}
                        additionalPrice={additionalPrice}
                        image={{
                          url: featuredImage, 
                          width: `${3000 * window.devicePixelRatio}`, // avoid problems with pdf rendering & retina screens
                          height: 1500, 
                          layout: 'fixed'
                        }}
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

  return (

    <section className={`${styles.summary__room} `}>
      <div className={`${styles.summary__room_image}`}>
        {roomImage?.url && 
          <Image 
            classes="ofi" 
            id={roomName + 'img'} 
            src={roomImage.url} 
            layout={"fixed"} 
            width={1500 * window.devicePixelRatio} // avoid problems with pdf rendering & retina screens
            height={400 } 
            priority="true" 
            alt="Room Image"
          />}
      </div> 
      <div className={`${styles.summary__room_image}`} id={roomName}>
            
        {roomName !== "Schlafzimmer" && showOptionList(allOptions)}

        {roomName === "Schlafzimmer" && showOptionList(SleepRoomVisibleOptions) }

        { roomName === "Schlafzimmer" && SleepRoomNonVisibleOptions.length > 0 && 
          <div className={`${styles.summary__room_title}`}>Zuzätzliche Einbauschränke in weiteren Räumen</div>}
        
        { roomName === "Schlafzimmer" && showOptionList(SleepRoomNonVisibleOptions) }
      </div>
    </section>
  )
}
