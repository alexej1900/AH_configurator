import Image from 'next/image'

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import setVariables from './../utils/setVariables';
import getSettings from './api/getSettings';
import getInitialData from './api/getInitialData';
import getLinkWithoutTypeRoom from './api/getLinkWithoutTypeRoom';
import checkIsStylePageExist from './api/checkIsStylePageExist';

import Button from '../components/ui/button';
import FormToggle from '../components/ui/formToggle';
import { introScreen } from '../gql/index';

import { changeApartSize, changeIsStyleRoomState, addApartmentType } from "../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { setBrandSettings } from "../redux/actions/index";

import styles from '../assets/scss/layout/_welcome.module.scss';

export default function Home() {
  const [link, setLink] = useState(false);
  const [apartImage, setApartImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [welcomeScreen, setWelcomeScreen] = useState(false);

  const dispatch = useDispatch();

  const apartSize = useSelector((state) => state.apartSize);

  let pageBg;
  let apartmentType;
 

  //   getSettings().then((data) => {
  //     const logo = data?.brandLogo[0].url;
  //     const headerBgPicture = data?.headerBackgroundPicture[0] ? data?.headerBackgroundPicture[0].url : false;
  //     const headerBg = data?.headerBackgroundColor;

  //     setVariables(data);
  //     dispatch(setBrandSettings(logo, headerBgPicture, headerBg));
  //     pageBg = data?.welcomePageBg ? settings.welcomePageBg : '';
  //   })
    
  //   // checkIsStylePageExist().then((isExist) => {
  //   //   dispatch(changeIsStyleRoomState(isExist ? true : false));

  //   //   linkWithoutTypeRoom.then((link) => {
  //   //     !isExist ? setLink(link) : setLink('/type');
  //   //   })
  //   // }) 

  //   getInitialData().then((data) => {
  //     apartmentType = data?.apartmentType[0].apartmentTitle;
  //     const rooms = data?.apartmentType[0].apartmentRooms.map((room) => room.roomType)   
  //     const apartmentImage = data?.apartmentType[0].apartmentImage[0];
      
  //     setApartImage(apartmentImage);
      

  //     // setIsLoading(false);
  //   })    
  // }

  if(apartImage && welcomeScreen) {
    setIsDataLoaded(true);
  }


  // const settings = getSettings();
  const linkWithoutTypeRoom = getLinkWithoutTypeRoom();
  // const checkStylePage = checkIsStylePageExist();

  

  // useEffect(() => {
  //   initialData.then((data) => {

  //     setWelcomeScreen(data)

  //     apartmentType = data?.apartmentType[0].apartmentTitle;
  //     const rooms = data?.apartmentType[0].apartmentRooms.map((room) => room.roomType)
      
  //     const apartmentImage = data?.apartmentType[0].apartmentImage[0];
  //     !isLoading && setApartImage(apartmentImage);



  //     // console.log('data', data)

  //   }).then(() => {
  //     setIsLoading(false);
  //   })
  // }, [initialData]);



  useEffect(() => {
    settings.then((data) => {
      const logo = data?.brandLogo[0].url;
      const headerBgPicture = data?.headerBackgroundPicture[0] ? data?.headerBackgroundPicture[0].url : false;
      const headerBg = data?.headerBackgroundColor;

      setVariables(data);
      dispatch(setBrandSettings(logo, headerBgPicture, headerBg));
      pageBg = data?.welcomePageBg ? settings.welcomePageBg : '';
    })
  }, [settings]);

  useEffect(() => {
    checkStylePage.then((isExist) => {
      dispatch(changeIsStyleRoomState(isExist ? true : false));

      linkWithoutTypeRoom.then((data) => {
        !isExist ? setLink(data) : setLink('/type');
      })
    }) 
  }, [checkStylePage]);

  useEffect(() => {
    
    if (apartmentType) {
      const apartmentImage = apartmentTypes[0].apartmentImage[0];
      // dispatch(changeApartSize('large', apartmentTypes[0].apartmentPrice, apartmentImage))
      setApartImage(apartmentImage)
    }
    // const apartmentImage = apartSize.size ==='large' ? welcomeScreen?.bigRoomImage[0] : welcomeScreen?.smallRoomImage[0];
    
    // dispatch(addApartmentType(apartmentType, rooms));
  }, []);


  const changeApartmentType = (size, price, image) => {

    setApartImage(image);
    dispatch(changeApartSize(size, price, image.url))
  }


  if(!welcomeScreen) {
    const { data, error, loading } = useQuery(introScreen);
    setWelcomeScreen(data);

  }

  
  // if (loading) return <p>Loading...</p>;
  // if(error) return <p> Error</p>;

  // console.log('apartmentTypes', apartmentTypes)
  console.log('apartImage', apartImage)

  // const apartmentImage = apartSize.size ==='large' ? welcomeScreen.bigRoomImage[0] : welcomeScreen.smallRoomImage[0];
  // console.log('apartmentImage', apartmentImage)

  return (
    <>

    {isDataLoaded ? <div>Loading...</div> :


      <div className={styles.welcome} style={{background: pageBg}}>
        <div className={styles.welcome__inner}>
          <div className={`${styles.halfLine} ${styles.content}`}>
            <h2 className={`${styles.title}`}>{welcomeScreen?.introText}</h2>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: welcomeScreen?.paragraph }}></div>

            <FormToggle 
              tab1={welcomeScreen?.bigRoomTitle} 
              tab1Action={() => changeApartmentType('large', welcomeScreen?.bigApartmentPrice, welcomeScreen.apartmentType[0].apartmentImage[0])}


              tab2={welcomeScreen?.smallRoomTitle}
              tab2Action={() => changeApartmentType('small', welcomeScreen?.smallApartmentPrice, welcomeScreen.apartmentType[2].apartmentImage[0])}
            />

            <div 
              className={`${styles.submitBtn} center`} 

              // If user didn't choosed size of apartment will be setted initial large size
              onClick={apartSize.image === '' 
                ? () => dispatch(changeApartSize('large', welcomeScreen?.bigApartmentPrice, apartImage.url)) 
                : null}
            >              
              <Button title="Wahl bestätigen"  href={!link ? "/type" : `${link}`} classes="btn btn--primary btn--check"/>
            </div>

          </div>
          <div className={`${styles.halfLine} ${styles.planImage}`}>
            {apartImage ?  
            <Image src={apartImage.url} width={apartImage.width} height={apartImage.height} />
            : <p>Loading...</p>
            }
          </div>
        </div>
      </div>
      }
    </>
  )
}
