
import InfoTitle from './atoms/infoTitle';
import Card from './card';

import styles from './styleCards.module.scss';

export default function StyleCards({activeStyle, cardData, styleId}) {

  return (
    <div >
      <InfoTitle 
        title={'Linie 1'}
        infoText={'Style description, style description, style description, style description, style description, style description, style description.'}
      />

      <div className={styles.block__wrapper}>
        {cardData.map((data, index)=>{
          if (index < 2) { // showing first 3 styles, that united to style line 1
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

      <InfoTitle 
        title={'Linie 2'}
        infoText={'Style description, style description, style description, style description, style description, style description, style description.'}
      />

      <div className={`${styles.block__wrapper} ${styles.block__wrapper_even}`}>
        {cardData.map((data, index)=>{

          if (index >= 2) {
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
