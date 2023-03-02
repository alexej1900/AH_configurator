import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { changeStyleVisibility} from '/redux/actions/index';

import IconComponent from './atoms/iconComponent';

import styles from './styleChooseButtons.module.scss';

export default function StyleChooseButtons({room, styleTypeSet, activeStyle, styleId, stylesAmount}) {
  const dispatch = useDispatch();

	const [currentStyleId, setCurrentStyleId] = useState(styleId);

	const { roomsTitle, roomsSlug } = useSelector((state) => state.generalStates);
	const apartStyle = useSelector((state) => state.apartStyle);
	const roomId = useSelector(state => state.apartSize.apartmentId);

	useEffect(() => {
		setCurrentStyleId(styleId)
	},[styleId])
	
	let nextLink, prevLink;

	if (room === 'kitchen-type') {
		nextLink = {link: `/küche${apartStyle.kitchenStyle + 1}`, title: `Linie ${apartStyle.kitchenStyle + 1}`}
		prevLink = '/raumtrenner';
	} else if (room.slice(0, -1) === 'küche') {
		nextLink = {link: `/badewanne`, title: `Badewanne`}
		prevLink = '/kitchen-type';
	} else {
		for (let i = 0; i < roomsTitle.length; i++) {   
			if (roomsSlug[i].toLowerCase() === room) {
				nextLink = roomsTitle[i+1] 
					?  {link: `/${roomsSlug[i+1].toLowerCase()}`, title: roomsTitle[i+1]}
					:  {link: '/summary', title: 'Abschliessen'};

				prevLink = roomsSlug[i-1] ? roomsSlug[i-1].toLowerCase() : '/type';

				if (room.toLowerCase() === 'raumtrenner') {
					nextLink = {link: `/kitchen-type`, title: 'Küchendesign'}
					prevLink = '/wohnzimmer';
				}

				if (room.toLowerCase() === 'badewanne') {
					prevLink = `/kitchen-type`;
				}
				
				if (room.toLowerCase() === 'wohnzimmer') {
					prevLink = `/?id=${roomId}`;
				}
			}
		}
	}

	const changeStyle = () => {
		activeStyle(++currentStyleId%stylesAmount);  //Last number depends on amount of style lines
	}

  const nextStepClick = () => {
    room === 'kitchen-type' ?  changeStyle(): dispatch(changeStyleVisibility(false));
  }
			
	return (
		<div className={styles.style__button}>
			<div className={styles.btn__wrapper}>
				{room === 'kitchen-type' 
					? <>
							<Link href={`${nextLink.link}`}>
								<a className={`${styles.btn} ${styles.btn__primary}`} onClick={styleTypeSet}>
									<IconComponent name="confirm" color="#fff"/> Wahl bestätigen
								</a>
							</Link>   
							<div className={`${styles.btn} ${styles.btn__next} ${styles.btn__next_style} center`} onClick={nextStepClick}>
								Nächster Stil <IconComponent name="arrow" color={"#3C6589"}/>
							</div>
						</>
					: <>
							<div className={`${styles.btn} ${styles.btn__options} center`} onClick={nextStepClick}>
								<IconComponent name="options" color="#fff"/> Optionen 
							</div>
							<Link href={`${nextLink.link}`}>
								<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__next_style}`} onClick={styleTypeSet}>
								 	{nextLink.title} <IconComponent name="arrow" color="#fff"/>
								</a>
							</Link> 
						</>
				}
			</div>
	</div>
  )
}
