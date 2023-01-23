import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

import { changeRoomVisibility} from '/redux/actions/index';

import styles from './styleChooseButtons.module.scss';

export default function StyleChooseButtons({room, styleTypeSet, activeStyle, styleId, stylesAmount}) {
  const dispatch = useDispatch();

	const [currentStyleId, setCurrentStyleId] = useState(styleId);

	const { rooms } = useSelector((state) => state.generalStates);

	useEffect(() => {
		setCurrentStyleId(styleId)
	},[styleId])
	
	let nextLink, prevLink;

	if (room === 'type') {
		nextLink = {link: '/'+rooms[0].toLowerCase(), title: rooms[0], icon: 'nextRoom'};
		prevLink = '/';
	} else {
		for (let i = 0; i < rooms.length; i++) {   
			if (rooms[i].toLowerCase() === room) {
				nextLink = rooms[i+1] 
					?  {link: '/'+rooms[i+1].toLowerCase(), title: rooms[i+1], icon: 'nextRoom'}
					:  {link: '/summary', title: 'Abschliessen', icon: 'checkIcon'};

				prevLink = rooms[i-1] ? rooms[i-1].toLowerCase() : '/type';
			}
		}
	}

	const changeStyle = () => {
		activeStyle(++currentStyleId%stylesAmount);  //Last number depends on amount of style lines
	}

  const nextStepClick = () => {
    room === 'type' ?  changeStyle(): dispatch(changeRoomVisibility(false));
  }

	const nextLinkIcon = nextLink?.icon;
			
	return (
		<div className={styles.style__button}>
			<div className={styles.btn__wrapper}>
				{nextLink && 
					<>
						<Link href={`${nextLink.link}`}>
							<a className={`${styles.btn} ${styles.btn__primary} ${styles.btn__next} ${styles[nextLinkIcon]} center`} onClick={styleTypeSet}>
								{nextLink.title}
							</a>
						</Link>   
            <div className={`${styles.btn} ${styles.btn__primary} ${styles.btn__back} center`} onClick={nextStepClick}>
              {room === 'type' ? 'Nächster Stil': 'Ausstattung'}
            </div>
					</>
				}
			</div>
	</div>
  )
}
