import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeStyleVisibility} from '/redux/actions/index';

import Button from './atoms/button';

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
		nextLink = {link: `/badezimmer`, title: `Badezimmer`}
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

				if (room.toLowerCase() === 'badezimmer') {
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
    room === 'kitchen-type' ? changeStyle() : dispatch(changeStyleVisibility(false));
  }
			
	return (
		<div className={styles.style__button}>
			{room === 'kitchen-type' 
				? <>
						<Button 
							title='Wahl bestätigen'
							href={nextLink.link}
							type="primary" 
							iconName='confirm'
							iconColor="#fff" 
							clickFn={styleTypeSet}
						/>
						<div className={`${styles.btn__next}`}>
							<Button title="Nächster Stil" type="secondary" iconName="arrow" iconColor="#3C6589" iconRight={true} clickFn={nextStepClick}/>
						</div>
					</>
				: <>
						<Button title="Optionen" type="back" iconName="options" iconColor="#fff" clickFn={nextStepClick}/>

						<div className={`${styles.btn__next}`}>
							<Button title={nextLink.title} href={nextLink.link} type="primary" iconName="arrow" iconColor="#fff" iconRight={true} clickFn={styleTypeSet}/>
						</div>
					</>
			}
		</div>
  )
}
