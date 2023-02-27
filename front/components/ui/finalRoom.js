
import Image from 'next/image';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';

import { 
  changeSidebarState, 
  setSummaryVisibility, 
  changeRoomVisibility, 
  changeActivePin, 
  changeActiveMod 
} from '../../redux/actions/index';

import { useQuery } from '@apollo/client';
import { RoomData } from '../../gql/index';

import getModifications from '../../pages/api/getModifications';

import checkObjIsEmpty from '../../utils/checkObjIsEmpty';
import Card from './card';
import OptionItem from './Components/optionItem';
import LoadingSpinner from './Components/loadingSpinner';
import IconComponent from './Components/iconComponent';

import styles from './finalRoom.module.scss';

export default function FinalRoom({ roomName, style }) {
  const dispatch = useDispatch();
  
  const { roomType, apartStyle } = useSelector(state => state);

  // console.log('roomType', roomType)
  const currentRoom = roomName === 'Küche' ? `${roomName}${apartStyle.kitchenStyle + 1}` : roomName;
  const { data, loading, error } = useQuery(RoomData(currentRoom));
  if (loading) return <LoadingSpinner/>
  if(error) return <p>Error, please read the console. {console.log(error)}</p>

  const modifyData = data.entry?.mods[0].modificationsTypes;

  const dataByStyle = modifyData?.filter((data) => {
    return !data.modificationMainStyle || data.modificationMainStyle === 'false' || data.modificationMainStyle.toLowerCase() === style.toLowerCase()
  });
  // console.log('roomName',roomName)
  // console.log('data.entry.roomStyles[0]', data.entry?.roomStyles[0].roomStyleExamples)
  // const room = roomType[`${roomName.toLowerCase()}`] 

  const room = roomType[`${roomName.toLowerCase()}`] 
    ? roomType[`${roomName.toLowerCase()}`] 
    : {image: data.entry.roomStyles[0].roomStyleExamples[0].styleDefaultImage[0]}

    // if we have main styles decomment 3 lines below and delete 3 lines abowe ==============
    // : {image: data.entry.roomStyles[0].roomStyleExamples.filter(item => {
    //   return item.styleName.toLowerCase() === style.toLowerCase()
    // })[0].styleDefaultImage[0]};


  const roomMods = room?.modifications && Object.entries(room.modifications);

  const editClickHandler = (modName) => {
    dispatch(changeSidebarState(true));
    dispatch(changeRoomVisibility(false));
    dispatch(setSummaryVisibility(true));
    dispatch(changeActivePin(modName));
    dispatch(changeActiveMod(modName));
  }

  const allOptions = dataByStyle.map((item) => {
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
// console.log('room', room)
// console.log('roomType', roomType)
  return (
    <section className={`${styles.summary__room} finalRoom` }>
      <div className={`${styles.summary__room_title}`}>
        <h2 className={`${styles.summary__room_roomTitle} center`}>{roomName}</h2>
      </div>

      <div className={`${styles.summary__room_image} row`}>
        <Image classes="ofi" src={room.image.url} layout="fill" priority="true" alt="Room Image"/>
      </div> 
          
      <div className={`${styles.summary__room_data}`}>
        {allOptions.map((data, index)=> {

          const {modGroupTitle, featuredImage, styleTitle, subtitle, description, additionalPrice} = data[1];
          // console.log('data[1]', data[1])
          if (!checkObjIsEmpty(data[1])) 
          return (
            <div key={index} className={`${data[1].option ? styles.fullLine : styles.halfLine}`}>

              <div className={`${data[1].option ? styles.halfLine : ''}`}>
                <h5 className={`${styles.summary__room_data_title}`}>{data[0]}  {`${modGroupTitle ?  '- ' + modGroupTitle : ''}`}</h5>
                <div className={`${styles.summary__room_card_wrapper}`}>
                  <Link href={`/${currentRoom.toLowerCase()}`} >
                    <a className={`${styles.summary__room_edit_icon}`} onClick={() => editClickHandler(data[0])}>
                      <IconComponent name="edit" color="#000"/>
                    </a>		
                  </Link>
                  
                  <Card 
                    title={data[1].individualFormat ? "Individuelle Lösung" : subtitle} 
                    subtitle={data[1].individualFormat ? "" : styleTitle } 
                    description={data[1].individualFormat ? "" : description}
                    additionalPrice={data[1].individualFormat ? "" : additionalPrice}
                    image={{url: data[1].individualFormat ? "/individ-icon.svg" : featuredImage, width: '80px', height: '80px', layout: "fixed"}}
                    type="small" 
                    final={true}
                    selectCard={() => null} 
                  />
                </div>
              </div>

              {data[1].option && 
                <div className={`${styles.halfLine}`}>
                  <h5 className={`${styles.summary__room_data_title}`}>Format</h5>
                  <OptionItem 
                    activeOption={0}
                    index={0} 
                    final={true}
                    data={{
                      optionsTitle: data[1].option.title, 
                      optionsSubtitle: data[1].option.subtitle, 
                      optionsPrice: data[1].option.price
                    }} 
                  />
                </div>
              }
            </div>	
          )
        })}
      </div> 
    </section>
  )
}
