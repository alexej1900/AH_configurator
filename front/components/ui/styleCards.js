import { useState } from 'react';

import IconComponent from './atoms/iconComponent';
import Card from './card';

import styles from './styleCards.module.scss';

export default function StyleCards({activeStyle, cardData, styleId}) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const changeInfoVisibility = (number) => {
    setIsInfoVisible(isInfoVisible === number ? false : number === 0);
  };

  return (
    <div >
      <div className={styles.block__description}>
        <div className={styles.block__description_text}>Linie 1</div>
        <div className={styles.block__description_button} onClick={() => changeInfoVisibility(1)}>
          <IconComponent name="info" color="#fff"/>
        </div>
      </div>
      <div className={`${styles.block__info} ${isInfoVisible === 1 && styles.block__info_show}`}>
        Style description, style description, style description, style description, style description, style description, style description.
      </div>

      <div className={styles.block__wrapper}>
        {cardData.map((data, index)=>{

          if (index < 3) {
            return (
            <Card
              selectCard= {() => activeStyle(index, 'image', data.featuredImage && data.featuredImage[0].url, data.styleTitle, data.subtitle)}
              key={index}
              type='large'
              recommended={data.recommended}
              title={data.styleTitle}
              url={data.image}
              active = {styleId === index}
            />
          )}
        })}
      </div>

      <div className={styles.block__description}>
        <div className={styles.block__description_text}>Linie 2</div>
        <div className={styles.block__description_button} onClick={() => changeInfoVisibility(2)}>
          <IconComponent name="info" color="#fff"/>
        </div>
      </div>
      <div className={`${styles.block__info} ${isInfoVisible === 2 && styles.block__info_show}`}>
        Style description, style description, style description, style description, style description, style description, style description.
      </div>

      <div className={`${styles.block__wrapper} ${styles.block__wrapper_even}`}>
      
        {cardData.map((data, index)=>{

          if (index === 3) {
            return (
            <Card
              selectCard= {() => activeStyle(index, 'image', data.featuredImage && data.featuredImage[0].url, data.styleTitle, data.subtitle)}
              key={index}
              type='large'
              recommended={data.recommended}
              title={data.styleTitle}
              url={data.image}
              active = {styleId === index}
            />
          )}
        })}
      </div>
    </div>
  )
}
