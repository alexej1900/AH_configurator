import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { changeRoomVisibility, changeStyleVisibility } from '../../../redux/actions/index';

import IconComponent from '../Components/iconComponent';

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
		nextLink = apartSize.roomsCount > 2.5 ? {link:  `/badewanne`, title: `Badewanne`} : {link:  `/dusche`, title: `Dusche`}
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
					case 'badewanne':
						prevLink = `/kitchen-type`;
						break;
					case 'dusche':
						prevLink = apartSize.roomsCount > 2.5 ? `/badewanne` : `/kitchen-type`;
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
					<Link href={`${prevLink}`} >
						<a className={`${styles.btn} ${styles.btn__back} center`}>
							<IconComponent name="arrow" color="#fff"/> Zurück
						</a>
					</Link> 

					<div className={`${styles.btn} ${styles.btn__showRoom} center`} onClick={showRoomClick}>
						<IconComponent name="showRoom" color="#fff"/> Raum anzeigen
					</div>

					{ currentRoom === 'kitchen-type' 
						? <Link href={`${nextLink.link}`}>
								<a className={`${styles.btn} ${styles.btn__primary}`} onClick={styleTypeSet}>
									Wahl bestätigen <IconComponent name="confirm" color="#fff"/> 
								</a>
							</Link>
						: <Link href={`${nextLink.link}`}>
								<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__next} center`} onClick={styleTypeSet}>
									{nextLink.title} <IconComponent name="arrow" color="#fff"/>
								</a>
							</Link>  
					}
				</>  
			</div>
		</div>
  )
}
