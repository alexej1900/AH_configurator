
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { mainSettings } from '../gql/index';

import { changeSidebarState, setInitialState } from '../redux/actions/index';

import { formatNumber } from './../utils/utilities';
import setVariables from './../utils/setVariables';
import getSettings from './api/getSettings';
import getPrices from './api/getPrices';

import FinalRoom from '../components/ui/finalRoom';
import FinalFormNew from '../components/ui/finalFormNew';
import Footer from '../components/layout/footer';
 
import styles from './summary.module.scss';
import generalStates from '../redux/reducers/general';

export default function Summary () {
	const dispatch = useDispatch();

	// If we recived link with state from another user
	if (window.location.hash) {

		const initState = JSON.parse(window.location.hash.slice(1)
			.replaceAll('%22', '"')
			.replaceAll('%20', ' ')
			.replaceAll('%C3%BC', 'ü')
			.replaceAll('%C3%B6', 'ö')
			.replaceAll('%C3%A4', 'ä')
		);

		dispatch(setInitialState(initState));

		// console.log('initState', initState)
		window.location.href = location.pathname
	}

  const { apartStyle, apartSize, roomType, generalStates } = useSelector(state => state);
	// const rooms = generalStates.rooms

	const rooms = [
    'Wohnzimmer', 
    'Raumtrenner', 
		'Küche',
		'Badewanne', 
    'Dusche', 
    'Schlafzimmer', 
    'Gang'
  ];

	if (apartSize.roomsCount <= 2.5) rooms.splice(3, 1);

	// console.log('rooms', rooms)
  const price = apartSize.price;

	const { OptionsPrice, IndividualPrice } = getPrices();

  const settings = getSettings();

  useEffect(() => {
    settings.then((data) => {
      setVariables(data.settings);
    })
  }, [settings]);

  useEffect(() => {
    dispatch(changeSidebarState(false));
    return () => dispatch(changeSidebarState(true));
  }, []);


console.log('apartSize', apartSize)
  return (
		<>
			<div className={styles.summary} id="summary">

				{apartStyle.image && 
					<div className={`${styles.container} ${styles.mainImage}`} id="mainImage">
						<Image src={apartStyle.image.url} layout='fill' priority="true" alt="Image of choosed style"/>				
					</div>
				} 

				<div className={`${styles.container}`}>
					<section className={`${styles.summary__overview}`} id="overview">
						<h1 className={`${styles.title} center`}> Ihre Wohnung</h1>

						<div  className={`${styles.summary__overview_content}`}>
							<div className={`${styles.summary__overview_image}`} id="apartmentImage">
								<Image src={apartSize.image.url} width={`${apartSize.image.width}`} height={`${apartSize.image.height}`} alt="Isometry"/>
							</div>
							<div className={`${styles.stats}`} id="stats">
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Wohnung</div>
									<div className="col-4">{apartSize.apartmentId}</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Grundriss</div>
									<div className="col-4">{apartSize.roomsCount} Zi.</div>
								</div>

								{apartStyle.title && 
									<div className={`${styles.summary__overview_line} row`}>
										<div className="col-8">Interieurlinie</div>
										<div className="col-4">{apartStyle.title}</div>
									</div>
								}
								
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Grundfläche</div>
									<div className="col-4">{apartSize.generalArea} m2</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Individuelle Lösungen</div>
									<div className="col-4">{IndividualPrice ? `-${formatNumber(IndividualPrice)}`: 0}</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Zusatzpreis Optionen</div>
									<div className="col-4">{OptionsPrice ? `${formatNumber(OptionsPrice)}`: 0}</div>
								</div>
								<div className={`${styles.summary__overview_line} ${styles.summary__overview_line_heighlite} row`}>
									<div className="col-6">Kaufpreis</div>
									<div className="col-6">CHF {formatNumber(parseInt(price) + OptionsPrice - IndividualPrice)}</div>
								</div>
							</div>
						</div>
					</section>
				</div>

				<div className={`${styles.container} ${styles.notice}`}>
						<p> Ihr individuelles Eigenheim wird mit folgenden Materialen für Sie erstellt. </p>
						<p>	Bitte prüfen Sie alle Angaben auf deren Korrektheit und nehmen Sie bei Bedarf direkt in der Übersicht Anpassungen über das Stift Symbol vor.</p>
				</div>

				<div className={`${styles.container}`} id="finalRooms">
					{rooms.map((room, index) => <FinalRoom room={roomType[`${room}`]} roomName={room} key={index} style={apartStyle.title}/>)}
				</div> 

				<FinalFormNew rooms={roomType}/> 
			</div>
			<Footer/>
		</>
  )
}
