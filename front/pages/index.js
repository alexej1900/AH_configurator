import Image from 'next/image'

import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import getSettings from './api/getSettings';

import Button from '../components/ui/atoms/button';
import FormToggle from '../components/ui/atoms/formToggle';
import ContactBtn from '../components/ui/atoms/contactBtn';
import ContactForm from '../components/ui/contactForm';
import LoadingSpinner from '../components/ui/atoms/loadingSpinner';
import ConfirmationForm from '../components/ui/atoms/confirmationForm';

import { apartmentItem } from '../gql/index';

import { useDispatch, useSelector } from "react-redux";
import { changeApartSize, setBrandSettings, setRooms, changeApartData, resetState } from "../redux/actions/index";

import styles from './_welcome.module.scss';

export default function Home() {
  const [isBaseVersion, setIsBaseVersion] = useState(true);
  const [isPopup, setIsPopup] = useState(false);
  const [isModal, setIsModal] = useState(localStorage.getItem('persist:root') && JSON.parse(localStorage.getItem('persist:root')).roomType.length > 5);

  const dispatch = useDispatch();

  const router = useRouter();
  const queryId = router.query.id;
    
  const apartSize = useSelector((state) => state.apartSize);
  // console.log('apartsize', apartSize);

  const settings = getSettings();

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
// console.log(aparmentData)
  let apartmentImage = aparmentData?.apartmentImage[0];

  const onCancel = () => {
    setIsPopup(false);
    setIsModal(false);
  }

  const onResetConfirm = () => {
    setIsModal(false);
    dispatch(resetState());
  }

  // console.log('data.entry.dataList[0]', data.entry.dataList[0]);
  // console.log('apartmentImage.height', apartmentImage.height);
  // console.log('queryId', queryId);
  return (
    <>
      <div className={styles.welcome} style={{background: pageBg}}>
        
        <div className={styles.welcome__inner}>
          <div className={styles.welcome__inner_header}>
            <div className={styles.welcome__inner_header_subtitle}> Haus: {aparmentData.buildingsName}, {aparmentData.apartmentId}</div>
            <h1 className={`${styles.welcome__inner_header_title}`}>Stellen Sie Ihr ganz persönliches Eigenheim zusammen</h1>
            <p className={styles.welcome__inner_header_description}>Im Folgenden können Sie die einzelnen Räume Ihres zukünftigen Eigenheimes ganz nach Ihren Wünschen gestalten.</p>
          </div>

          <div className={`${styles.planImage}`}>
            <Image 
              src={apartmentImage.url} 
              width={apartmentImage.width} 
              height={apartmentImage.height} 
              layout='fill'
              object-fit='contain'
              priority 
              placeholder="blur"
              blurDataURL={'/placeholder.png'}
              alt="Apartment Image"
            />
          </div>

        </div>
        <div className={`${styles.submitBtn}`} 
            onClick={() => dispatch(changeApartData(aparmentData, apartmentImage, aparmentData.basePrice))}
          >              
            <Button title="Zum Konfigurator"  href={"/wohnzimmer"} type="primary" iconName="entry" iconColor="#fff"/>
          </div>
        <div className={`${styles.btn__getContacts}`} onClick={() => setIsPopup(true)}>
            <ContactBtn/>
        </div>
        {isPopup && <ContactForm onCancel={onCancel}/>}
        {isModal && <ConfirmationForm
                      onCancel={onCancel} 
                      onConfirm={onResetConfirm}
                      title={'Konfiguration gefunden'}
                      resetForm={true}
                      child={
                        <div>
                          <p>Wir haben im Speicher ihres Webbrowsers eine bestehende Konfiguration gefunden.</p>
                          <br/>
                          <p>Möchten Sie mit der bestehenden weiterarbeiten oder eine neue Konfiguration beginnen?</p>
                        </div>
                      }
                    />}
      </div>
    </>
  )
}
