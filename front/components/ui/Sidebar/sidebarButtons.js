import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeRoomVisibility, changeStyleVisibility } from '../../../redux/actions/index';

import Button from '../atoms/button';

import styles from './sidebar.module.scss';

export default function SidebarButtons({ currentRoom, styleTypeSet, roomId, showArrow }) {
	const dispatch = useDispatch();

	const { roomsTitle, roomsSlug } = useSelector((state) => state.generalStates);
	const { apartStyle, apartSize } = useSelector(state => state);
	const [buttonHeight, setButtonHeight] = useState('');
	// const [secondButtonHeight, setSecondButtonHeight] = useState('');
// let buttonHeight;
// let secondButtonHeight;
// buttonHeight = document.getElementById('hook1')?.clientHeight;
	// if (document.getElementById('hook3')?.clientHeight > document.getElementById('hook1')?.clientHeight) {
	// 	secondButtonHeight = document.getElementById('hook3')?.clientHeight
	// } 

	useEffect(() => {
		setButtonHeight(document.getElementById('hook1')?.clientHeight);

		// if (document.getElementById('hook3')?.clientHeight > document.getElementById('hook1')?.clientHeight) {
		// 	setSecondButtonHeight(document.getElementById('hook3')?.clientHeight);
		// } 
		// console.log('buttonHeight1111', buttonHeight)
  }, [currentRoom]);

	// console.log('buttonHeight', buttonHeight)

	let nextLink, prevLink;

	if (currentRoom === 'kitchen-type') {
		nextLink = {link: `/küche${apartStyle.kitchenStyle + 1}`, title: `Linie ${apartStyle.kitchenStyle + 1}`}
		prevLink = '/wohnzimmer';
	} else if (currentRoom.slice(0, -1) === 'küche') {
		nextLink = apartSize.roomsCount > 2.5 ? {link:  `/badezimmer`, title: `Badezimmer mit Badewanne`} : {link:  `/dusche`, title: `Badezimmer mit Dusche`}
		prevLink = '/kitchen-type';
	} else {
		for (let i = 0; i < roomsTitle.length; i++) {   
			if (roomsSlug[i].toLowerCase() === currentRoom) {

				nextLink = roomsTitle[i+1] 
					?  {link: `/${roomsSlug[i+1].toLowerCase()}`, title: roomsTitle[i+1]}
					:  {link: '/summary', title: 'Fertigstellen'};

				switch (currentRoom.toLowerCase()) {
					case 'badezimmer':
						nextLink = {link:  `/dusche`, title: `Badezimmer mit Dusche`}
						prevLink = `/kitchen-type`;
						break;
					case 'dusche':
						prevLink = apartSize.roomsCount > 2.5 ? `/badezimmer` : `/kitchen-type`;
						break;
					case 'wohnzimmer':
						nextLink = {link: `/kitchen-type`, title: 'Küchendesign'}
						prevLink = `/?id=${roomId}`;
						break;
					default:
						prevLink = roomsSlug[i-1] ? roomsSlug[i-1].toLowerCase() : '/type';
				}
			}
		}
	}

	const showRoomClick = () => {
		dispatch(changeRoomVisibility(true))
		dispatch(changeStyleVisibility(true));
	}
			
	return (
		<div className={`${styles.sidebar__button} ${currentRoom === 'kitchen-type' && styles.sidebar__typeRoomButtons}`}>
			{showArrow 
				? <div className={`${styles.button_down}`}></div>
				: null 
			} 
			<div className={styles.btn__wrapper}>
				<>
					<div className={`${styles.btn__back}`}>
						<Button 
							title="Zurück"  
							href={`${prevLink}`} 
							type="back" 
							iconName="arrow" 
							iconColor="#fff" 
							style={{height: buttonHeight}}/>
					</div>

					<div className={`${styles.btn__showRoom}`} id="hook3">
						<Button 
							title="Raum anzeigen" 
							type="back" 
							iconName="showRoom" 
							iconColor="#fff" 
							clickFn={showRoomClick}
							style={{height: buttonHeight
							}}
							/>
					</div>

					<div className={`${styles.btn__primary} ${currentRoom !== 'kitchen-type' && styles.btn__next}`} id="hook1">
						<Button 
							title={currentRoom === 'kitchen-type' ? 'Wahl bestätigen' : nextLink.title}
							href={nextLink.link}
							type="primary" 
							iconName={currentRoom === 'kitchen-type' ? 'confirm' : currentRoom === 'schlafzimmer' ? 'summary' :'arrow-right'} 
							iconColor="#fff" 
							iconRight={currentRoom === 'schlafzimmer' ? false : true }
							clickFn={styleTypeSet}
							// style={{height: secondButtonHeight}}
							/>
					</div>
				</>  
			</div>
		</div>
  )
}
