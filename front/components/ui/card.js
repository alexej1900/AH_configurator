import Image from 'next/image';

import { useDispatch } from 'react-redux';
import { changeStyleVisibility } from '/redux/actions/index';

import IconComponent from './atoms/iconComponent';

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
    disable,
    optionPrice,
    onlyOne
}) {

    const dispatch = useDispatch();

    const cardClickHandler = () => {
       !disable && selectCard();
       !disable && checked && checked();
    }

    const styleCardClickHandler = () => {
        dispatch(changeStyleVisibility(true));
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
                                layout={final ? 'fixed' : image.layout} 
                                background={image.background}
                                alt="Option"
                            />
                            {recommended && <span className={styles.rec}> Empfehlung </span>}
                        </div>
                        <div className={`${styles.text__wrapper}`}>
                            <div className={styles.card__title}>{title}</div>
                            <p className={styles.card__description}>{subtitle}</p>
                            <p className={styles.card__description}>{description}</p>
                            {/* {optionPrice > 0 && !collapsed ? <p className={styles.card__description}><span className={styles.card__index}>+ CHF</span> {optionPrice}</p> : null} */}
                            {/* {final ? <p className={styles.card__description}>{additionalPrice ? `+ ${additionalPrice} CHF zum Grundpreis` : ''}</p> : null} */}
                            {!final ? <IconComponent name={onlyOne ? "lock" : "check"} color={collapsed ? "rgba(0, 0, 0, 0.32)" :"#fff"}/> : null}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={`${styles.styleCard} ${active && styles.styleCard__active}`}  onClick={styleCardClickHandler}>
                    <div className={styles.card__title} >{title}</div>
                    
                    <div className={styles.img__wrapper1}>
                        <Image src={url[0].url} width={url[0].width} height={url[0].height} alt="Style Image"/>
                        {active 
                            ?   <div className={styles.check__wrapper}>
                                    <IconComponent name={"check"} color={"#fff"}/>
                                </div> 
                            : null}
                    </div>
                </div>
            )
        }
    }

    return <CardType />;
}
