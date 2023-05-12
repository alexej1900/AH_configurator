
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { mainSettings } from '../gql/index';

import { changeSidebarState, setInitialState, setLink } from '../redux/actions/index';

import madeShortUrl from '../utils/madeShortUrl';
import { formatNumber } from './../utils/utilities';
import setVariables from './../utils/setVariables';
import getSettings from './api/getSettings';
import getPrices from './api/getPrices';
import PdfPageNew from '../components/ui/pdfPageNew';

import FinalRoom from '../components/ui/finalRoom';
import FinalFormNew from '../components/ui/finalFormNew';
import Footer from '../components/layout/footer';
 
import styles from './summary.module.scss';

export default function Summary () {
	const dispatch = useDispatch();
	const [trigger, setTrigger] = useState(0);
	const [pdfDataTrigger, setPdfDataTrigger] = useState(0);
	const [pdfUrl, setPdfUrl] = useState('');

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

		window.location.href = location.pathname
	}

  const { apartStyle, apartSize, roomType, generalStates } = useSelector(state => state);
	// const rooms = generalStates.rooms

	const rooms = [
    'Wohnzimmer', 
		'Küche',
		'Badezimmer', 
    'Dusche', 
    'Schlafzimmer', 
    // 'Gang'
  ].filter((room) => room !== null);

	if (!apartSize.badewanne) rooms.splice(2, 1);
	if (!apartSize.dusche) rooms.splice(3, 1);

  const price = apartSize.price;

	const { OptionsPrice, IndividualPrice } = getPrices();

  const settings = getSettings();

  useEffect(() => {
    settings.then((data) => {
      setVariables(data.settings);
    })
  }, [settings]);

  // useEffect(() => {
  //   dispatch(changeSidebarState(false));
  //   return () => dispatch(changeSidebarState(true));
  // }, []);

	useEffect(async () => {
    const shortURl = await madeShortUrl(window.location.href);
    dispatch(setLink(shortURl));
  }, []);

	const savePdfClick = () => {
		setTrigger(1);
		setTimeout(() => {
			setTrigger(0);
		}, 500)
	}

	const changePdfDataTrigger = () => {
		setPdfDataTrigger(1);
		setTimeout(() => {
			setPdfDataTrigger(0);
		}, 500)
	}

	// console.log('generalStates.pdfData', generalStates.pdfLoading)
	
  return (
		<>
			<div className={styles.summary} id="summary">
				<div className={`${styles.pdfData}`}>
					<PdfPageNew saveTrigger={trigger} pdfDataTrigger={pdfDataTrigger} setPdfUrl={setPdfUrl}/>
				</div>

				{apartStyle.image && 
					<div className={`${styles.container} ${styles.mainImage}`} id="mainImage">
						<Image src={apartStyle.image.url} layout='fill' priority="true" alt="Image of choosed style"/>				
					</div>
				} 

				<div className={`${styles.container} `}>
					<section className={`${styles.summary__overview}`} id="overview">
						<h1 className={`${styles.title} center`}> Ihre Wohnung</h1>

						<div  className={`${styles.summary__overview_content}`}>
							<div className={`${styles.summary__overview_image}`} id="apartmentImage">
								<Image src={apartSize.image.url} width={`${apartSize.image.width}`} height={`${apartSize.image.height}`} alt="Isometry"/>
							</div>
							<div className={`${styles.stats}`} >
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Haus</div>
									<div className="col-4">{apartSize.buildingsName}</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Wohnung</div>
									<div className="col-4">{apartSize.apartmentId}</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Etage</div>
									<div className="col-4">{apartSize.floor}</div>
								</div>
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Zimmer</div>
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
									<div className="col-8">Grundkosten</div>
									<div className="col-4">{apartSize.basePrice} CHF</div>
								</div>
								{/* <div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Individuelle Lösungen</div>
									<div className="col-4">{IndividualPrice ? `-${formatNumber(IndividualPrice)}`: 0}</div>
								</div> */}
								{/* <div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Zusatzpreis Optionen</div>
									<div className="col-4">{OptionsPrice ? `${formatNumber(OptionsPrice)}`: 0}</div>
								</div> */}
								{/* <div className={`${styles.summary__overview_line} ${styles.summary__overview_line_heighlite} row`}>
									<div className="col-6">Kaufpreis</div>
									<div className="col-6">CHF {formatNumber(parseInt(price) + OptionsPrice - IndividualPrice)}</div>
								</div> */}
							</div>
							<div className={`${styles.container} ${styles.notice}`}>
								<p> Ihr individuelles Eigenheim wird mit folgenden Materialen für Sie erstellt. </p>
								<p>	Bitte prüfen Sie alle Angaben auf deren Korrektheit und nehmen Sie bei Bedarf direkt in der Übersicht Anpassungen über das Stift Symbol vor.</p>
							</div>
						</div>
					</section>
				</div>

				<div className={`${styles.container}`} id="finalRooms">
					{rooms.map((room, index) => <FinalRoom room={roomType[`${room}`]} roomName={room} key={index} style={apartStyle.title}/>)}
				</div> 

				<FinalFormNew 
					rooms={roomType} 
					isometry={apartSize.image.url} 
					roomId={apartSize.apartmentId} 
					savePdf={savePdfClick}
					changePdfDataTrigger={changePdfDataTrigger}
					pdfUrl={pdfUrl}
				/> 
			</div>
			<Footer/>
		</>
  )
}
