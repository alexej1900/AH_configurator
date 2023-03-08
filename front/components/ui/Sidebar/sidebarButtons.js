import { useDispatch, useSelector } from 'react-redux';
import { changeRoomVisibility, changeStyleVisibility } from '../../../redux/actions/index';

import Button from '../atoms/button';

import styles from './sidebar.module.scss';

export default function SidebarButtons({ currentRoom, styleTypeSet, roomId }) {
	const dispatch = useDispatch();

	const { roomsTitle, roomsSlug } = useSelector((state) => state.generalStates);
	const { apartStyle, apartSize } = useSelector(state => state);

	let nextLink, prevLink;

	if (currentRoom === 'kitchen-type') {
		nextLink = {link: `/küche${apartStyle.kitchenStyle + 1}`, title: `Linie ${apartStyle.kitchenStyle + 1}`}
		prevLink = '/raumtrenner';
	} else if (currentRoom.slice(0, -1) === 'küche') {
		nextLink = apartSize.roomsCount > 2.5 ? {link:  `/badezimmer`, title: `Badezimmer mit Badewanne`} : {link:  `/dusche`, title: `Badezimmer mit Dusche`}
		prevLink = '/kitchen-type';
	} else {
		for (let i = 0; i < roomsTitle.length; i++) {   
			if (roomsSlug[i].toLowerCase() === currentRoom) {

				nextLink = roomsTitle[i+1] 
					?  {link: `/${roomsSlug[i+1].toLowerCase()}`, title: roomsTitle[i+1]}
					:  {link: '/summary', title: 'Abschliessen'};

				switch (currentRoom.toLowerCase()) {
					case 'raumtrenner':
						nextLink = {link: `/kitchen-type`, title: 'Küchendesign'}
						prevLink = '/wohnzimmer';
						break;
					case 'badezimmer':
						nextLink = {link:  `/dusche`, title: `Badezimmer mit Dusche`}
						prevLink = `/kitchen-type`;
						break;
					case 'dusche':
						prevLink = apartSize.roomsCount > 2.5 ? `/badezimmer` : `/kitchen-type`;
						break;
					case 'wohnzimmer':
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
			<div className={styles.btn__wrapper}>
				<>
					<div className={`${styles.btn__back}`}>
						<Button title="Zurück"  href={`${prevLink}`} type="back" iconName="arrow" iconColor="#fff"/>
					</div>

					<div className={`${styles.btn__showRoom}`}>
						<Button title="Raum anzeigen" type="back" iconName="showRoom" iconColor="#fff" clickFn={showRoomClick}/>
					</div>

					<div className={`${styles.btn__primary} ${currentRoom !== 'kitchen-type' && styles.btn__next}`}>
						<Button 
							title={currentRoom === 'kitchen-type' ? 'Wahl bestätigen' : nextLink.title}
							href={nextLink.link}
							type="primary" 
							iconName={currentRoom === 'kitchen-type' ? 'confirm' : 'arrow'} 
							iconColor="#fff" 
							iconRight={true}
							clickFn={styleTypeSet}/>
					</div>
				</>  
			</div>
		</div>
  )
}
