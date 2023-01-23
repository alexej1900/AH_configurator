import Image from 'next/image'

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import getSettings from './api/getSettings';
import getLinkWithoutTypeRoom from './api/getLinkWithoutTypeRoom';
import checkIsStylePageExist from './api/checkIsStylePageExist';

import Button from '../components/ui/button';
import FormToggle from '../components/ui/formToggle';
import { introScreen, apartmentItem } from '../gql/index';

import { useDispatch, useSelector } from "react-redux";
import { changeApartSize, changeIsStyleRoomState, setBrandSettings, setRooms } from "../redux/actions/index";

import styles from '../assets/scss/layout/_welcome.module.scss';
import LoadingSpinner from '../components/ui/loadingSpinner';
import Spinner from '../components/ui/spinner';

export default function Home() {
  const [link, setLink] = useState(false);
// console.log('index');
  const dispatch = useDispatch();

  const router = useRouter();
    // ROOM_TYPE = router.query.room;
    const queryId = router.query.id;

  const apartSize = useSelector((state) => state.apartSize);

  const settings = getSettings();

  const linkWithoutTypeRoom = getLinkWithoutTypeRoom();
  const checkStylePage = checkIsStylePageExist();

  let pageBg;

  useEffect(() => {
    settings.then((data) => {
      const logo = data.settings?.brandLogo[0].url;
      const headerBgPicture = data.settings?.headerBackgroundPicture[0] ? data.settings?.headerBackgroundPicture[0].url : false;
      const headerBg = data.settings?.headerBackgroundColor;
      pageBg = data?.welcomePageBg ? settings.welcomePageBg : '';

      dispatch(setRooms(data.rooms));
      dispatch(setBrandSettings(logo, headerBgPicture, headerBg));
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


  const { data, error, loading } = useQuery(introScreen);
  // const { data, error, loading } = useQuery(apartmentItem, {
  //   variables: { id: queryId ? queryId : 27891 },
  // });
  if (loading) return <LoadingSpinner full={true}/>;
  if(error) return <p> Error</p>;

  // console.log('data', data);

  const welcomeScreen = data.globalSets[0].welcomeScreen[0];
  const apartmentImage = apartSize.size ==='large' ? welcomeScreen.bigRoomImage[0] : welcomeScreen.smallRoomImage[0];


  // const apartmentData = data.globalSets[0].apartmentList[0]
  // const apartmentImage = apartmentData.apartmentImage[0];
  // console.log('apartmentData', apartmentData);
  // console.log('queryId', queryId);
  return (
    <>
      <div className={styles.welcome} style={{background: pageBg}}>
        <div className={styles.welcome__inner}>
          <div className={`${styles.halfLine} ${styles.content}`}>
            <h2 className={`${styles.title}`}>Stellen Sie Ihr ganz persönliches Eigenheim zusammen</h2>
            <div className={styles.description}>Im Folgenden können Sie die einzelnen Räume Ihres zukünftigen Eigenheimes ganz nach Ihren Wünschen gestalten. In der von Ihnen aktuell ausgesuchten 5.5-Zimmer-Wohnung haben Sie zudem die Möglichkeit, aus einem Schlafzimmer ein Wohnzimmer zu konfigurieren. Das Wohnzimmer verfügt im Gegensatz zum Schlafzimmer über eine heruntergesetzte Decke für eine gemütliche Atmosphäre.</div>

            <FormToggle 
              tab1={welcomeScreen.bigRoomTitle} 
              tab1Action={() => dispatch(changeApartSize('large', welcomeScreen.bigApartmentPrice, apartmentImage))}
              tab2={welcomeScreen.smallRoomTitle}
              tab2Action={() => dispatch(changeApartSize('small', welcomeScreen.smallApartmentPrice, apartmentImage))}
            />

            <div 
              className={`${styles.submitBtn} center`} 

              // If user didn't choosed size of apartment will be setted initial large size
              onClick={apartSize.image === '' 
                ? () => dispatch(changeApartSize('large', welcomeScreen.bigApartmentPrice, apartmentImage)) 
                : null}
            >              
              <Button title="Wahl bestätigen"  href={!link ? "/type" : `${link}`} classes="btn btn--primary btn--check"/>
            </div>

          </div>
          <div className={`${styles.halfLine} ${styles.planImage}`}>
            <Image 
              src={apartmentImage.url} 
              width={apartmentImage.width} 
              height={apartmentImage.height} 
              priority 
              placeholder="blur"
              blurDataURL={'/component.png'}
              alt="Apartment Image"
            />
          </div>
        </div>
      </div>
    </>
  )
}
