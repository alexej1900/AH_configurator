import Card from './card';

export default function StyleCards({activeStyle, cardData, styleId}) {
  const styleCardsStyle = {
    padding: '0 24px',
  }

  return (
    <div style={styleCardsStyle}>
      {cardData.map((data, index)=>{
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
        )})
      }
    </div>
  )
}
