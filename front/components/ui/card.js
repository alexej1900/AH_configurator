import Image from 'next/image';

import { useDispatch } from 'react-redux';
import { changeStyleVisibility } from '/redux/actions/index';

import styles from './card.module.scss';

export default function Card({
    title, 
    url, 
    type, 
    image, 
    recommended, 
    subtitle, 
    description,
    additionalPrice,
    selectCard, 
    active, 
    checked, 
    collapsed, 
    final, 
    disable
}) {

    const dispatch = useDispatch();

    const cardClickHandler = () => {
       !disable && selectCard();
       !disable && checked && checked();
    }

    const styleCardClickHandler = () => {
        dispatch(changeStyleVisibility(false));
        selectCard();
        checked && checked();
    }

    // console.log('title', title, disable);

    const CardType = () => {
        if (type === 'small') {
            return (
                <div 
                    className={`
                        ${styles.card} 
                        ${styles.small} 
                        ${active && styles.active} 
                        ${collapsed && styles.collapsed} 
                        ${recommended ? styles.recommended : ''} 
                        ${final && styles.final}
                        ${disable && styles.disable}
                    `} 
                    onClick={cardClickHandler}
                >
                    <div className={`row`} >
                        <div className={`${styles.image__wrapper}`} style={{background: `${image.background}`}}>
                            <Image 
                                classes={styles.card__image} 
                                src={image.url} 
                                width={image.width} 
                                height={image.height} 
                                layout={image.layout} 
                                background={image.background}
                                alt="Option"
                            />
                            {recommended && <span className={styles.rec}> Empfehlung </span>}
                        </div>
                        <div className={`${styles.text__wrapper}`}>
                            <h5 className={styles.card__title}>{title}</h5>
                            <p className={styles.card__description}>{subtitle}</p>
                            <p className={styles.card__description}>{description}</p>
                            {final ? <p className={styles.card__description}>{additionalPrice ? `+ ${additionalPrice} CHF zum Grundpreis` : ''}</p> : null}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={`${styles.card} ${styles.styleCard} ${active && styles.active}`}  onClick={styleCardClickHandler}>

                    <div className={styles.card__title}>
                        <h3 >{title}</h3>
                    </div>
                    
                    <div className={styles.img__wrapper}>
                        <Image src={url[0].url} width="312" height="180" alt="Style Image"/>
                    </div>
                </div>
            )
        }
    }

    return <CardType />;
}
