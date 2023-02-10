import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { changeRoomVisibility, changeStyleVisibility } from '../../../redux/actions/index';

import IconComponent from '../Components/iconComponent';

import styles from './sidebar.module.scss';

export default function SidebarButtons({ currentRoom, styleTypeSet, roomId }) {
	const dispatch = useDispatch();

	const { roomsTitle, roomsSlug } = useSelector((state) => state.generalStates);
  const apartStyle = useSelector((state) => state.apartStyle);

	
	let nextLink, prevLink;
	// let kitchenLink = currentRoom.slice(0, -1) === 'küche' ? currentRoom : `/kitchen-type`;
	// console.log('kitchenLink', kitchenLink)
	// if (currentRoom === 'type') {
	// 	nextLink = {link: `/${roomsSlug[0].toLowerCase()}`, title: roomsTitle[0], icon: 'nextRoom'};
	// 	prevLink = `/?id=${roomId}`;
	// } else 
	if (currentRoom === 'kitchen-type') {
		nextLink = {link: `/küche${apartStyle.kitchenStyle + 1}`, title: `Linie ${apartStyle.kitchenStyle + 1}`, icon: 'nextRoom'}
		prevLink = '/raumtrenner';
	} else if (currentRoom.slice(0, -1) === 'küche') {
		nextLink = {link: `/badewanne`, title: `Badewanne`, icon: 'nextRoom'}
		prevLink = '/kitchen-type';
	} else {
		for (let i = 0; i < roomsTitle.length; i++) {   
			if (roomsSlug[i].toLowerCase() === currentRoom) {
				nextLink = roomsTitle[i+1] 
					?  {link: `/${roomsSlug[i+1].toLowerCase()}`, title: roomsTitle[i+1], icon: 'nextRoom'}
					:  {link: '/summary', title: 'Abschliessen', icon: 'checkIcon'};

				prevLink = roomsSlug[i-1] ? roomsSlug[i-1].toLowerCase() : '/type';

				if (currentRoom.toLowerCase() === 'raumtrenner') {
					nextLink = {link: `/kitchen-type`, title: 'Küchendesign', icon: 'nextRoom'}
					prevLink = '/wohnzimmer';
				}

				if (currentRoom.toLowerCase() === 'badewanne') {
					prevLink = `/kitchen-type`;
				}
				
				if (currentRoom.toLowerCase() === 'wohnzimmer') {
					prevLink = `/?id=${roomId}`;
				}
			}
		}
	}

	const showRoomClick = () => {
		dispatch(changeRoomVisibility(true))
		dispatch(changeStyleVisibility(true));
	}

	const nextLinkIcon = nextLink?.icon;
			
	return (
		<div className={`${styles.sidebar__button} ${currentRoom === 'type' && styles.sidebar__typeRoomButtons}`}>
			<div className={styles.btn__wrapper}>
				{nextLink && 
					<>
						<Link href={`${prevLink}`} >
							<a className={`${styles.btn} ${styles.btn__back} center`}>
								<IconComponent name="arrow" color="#fff"/> Zurück
							</a>
						</Link> 

						<div className={`${styles.btn} ${styles.btn__showRoom} center`} onClick={showRoomClick}>
							Raum anzeigen
						</div>

						<Link href={`${nextLink.link}`}>
							<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__next} center`} onClick={styleTypeSet}>
								{nextLink.title} <IconComponent name="arrow" color="#fff"/>
							</a>
						</Link>    
					</>
				}
			</div>
	</div>
  )
}
