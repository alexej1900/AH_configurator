import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { changeRoomVisibility, changeStyleVisibility } from '../../../redux/actions/index';

import styles from './sidebar.module.scss';

export default function SidebarButtons({ currentRoom, styleTypeSet, roomId }) {
	const dispatch = useDispatch();

	const { rooms } = useSelector((state) => state.generalStates);


	// console.log('currentRoom', currentRoom)
	let nextLink, prevLink;

	if (currentRoom === 'type') {
		nextLink = {link: `/${rooms[0].toLowerCase()}`, title: rooms[0], icon: 'nextRoom'};
		prevLink = `/?id=${roomId}`;
	} else if (currentRoom === 'kitchen-type') {
		nextLink = {link: `/küche1`, title: 'Küche 1', icon: 'nextRoom'}
		prevLink = '/raumtrenner';
	} else {
		for (let i = 0; i < rooms.length; i++) {   
			if (rooms[i].toLowerCase() === currentRoom) {
				nextLink = rooms[i+1] 
					?  {link: `/${rooms[i+1].toLowerCase()}`, title: rooms[i+1], icon: 'nextRoom'}
					:  {link: '/summary', title: 'Abschliessen', icon: 'checkIcon'};

				prevLink = rooms[i-1] ? rooms[i-1].toLowerCase() : '/type';

				if (currentRoom.toLowerCase() === 'raumtrenner') {
					nextLink = {link: `/kitchen-type`, title: 'Küchendesign', icon: 'nextRoom'}
					prevLink = '/type';
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
							<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__back} center`}>
								Zurück
							</a>
						</Link> 

						<div className={`${styles.btn} ${styles.btn__primary} ${styles.btn__showRoom} center`} onClick={showRoomClick}>
							Raum anzeigen
						</div>

						<Link href={`${nextLink.link}`}>
							<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__next} ${styles[nextLinkIcon]} center`} onClick={styleTypeSet}>
								{nextLink.title}
							</a>
						</Link>    
					</>
				}
			</div>
	</div>
  )
}
