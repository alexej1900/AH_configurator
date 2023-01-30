import Image from 'next/image'

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import getSettings from './api/getSettings';

import Button from '../components/ui/Components/button';
import FormToggle from '../components/ui/Components/formToggle';
import ContactBtn from '../components/ui/Components/contactBtn';
import ContactForm from '../components/ui/contactForm';
import LoadingSpinner from '../components/ui/Components/loadingSpinner';

import { apartmentItem } from '../gql/index';

import { useDispatch, useSelector } from "react-redux";
import { changeApartSize, setBrandSettings, setRooms, changeApartData } from "../redux/actions/index";

import styles from '../assets/scss/layout/_welcome.module.scss';

export default function Home() {
  const [isBaseVersion, setIsBaseVersion] = useState(true);
  const [isPopup, setIsPopup] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();
  const queryId = router.query.id;
    
  const apartSize = useSelector((state) => state.apartSize);

  const settings = getSettings();
 
  // const linkWithoutTypeRoom = getLinkWithoutTypeRoom();
  // const checkStylePage = checkIsStylePageExist();

  let pageBg;

  useEffect(() => {
    settings.then((data) => {
      const logo = data.settings?.brandLogo[0].url;
      const headerBgPicture = data.settings?.headerBackgroundPicture[0] ? data.settings?.headerBackgroundPicture[0].url : false;
      const headerBg = data.settings?.headerBackgroundColor;
      pageBg = data?.welcomePageBg ? settings.welcomePageBg : '';

      dispatch(setRooms(data.roomsTitle, data.roomsSlug));
      dispatch(setBrandSettings(logo, headerBgPicture, headerBg));
    })
  }, [settings]);

  const { data, error, loading } = useQuery(apartmentItem, {
    variables: { id: queryId ? queryId : 'K-01.01', var: queryId ? queryId + 'var2' : 'K-01.01var2' },
  });
  if (loading) return <LoadingSpinner full={true}/>;
  if(error) return <p> Error</p>;

  const aparmentData = data.entry.dataList[0];
  
  let apartmentImage = apartSize.image === '' ? aparmentData?.apartmentImage[0] : apartSize.image;

  const onCancel = () => {
    setIsPopup(false);
}

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
              tab1={'Default'} 
              tab1Action={() => {dispatch(changeApartSize(aparmentData.basePrice, aparmentData.apartmentImage[0]));
                                setIsBaseVersion(true)}}
              tab2={'Version'}
              tab2Action={() => {dispatch(changeApartSize(aparmentData.basePrice + aparmentData.additionalLivingRoomPrice, data.asset));
                                setIsBaseVersion(false)}}
            />

            <div 
              className={`${styles.submitBtn} center`} 

              // If user didn't choosed size of apartment will be setted initial large size
              onClick={() => isBaseVersion 
                ? dispatch(changeApartData(aparmentData, apartmentImage, aparmentData.basePrice))
                : dispatch(changeApartData(aparmentData, apartmentImage, aparmentData.basePrice + aparmentData.additionalLivingRoomPrice))}
            >              
              <Button title="Wahl bestätigen"  href={"/wohnzimmer"} classes="btn btn--primary btn--check"/>
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
        <div className={`${styles.btn__getContacts}`} onClick={() => setIsPopup(true)}>
            <ContactBtn/>
        </div>
        {isPopup && <ContactForm onCancel={onCancel}/>}
      </div>
    </>
  )
}
