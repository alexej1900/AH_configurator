
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from "react-qr-code";

import Image from 'next/image';
import { changePdfLoadingState } from '../../redux/actions/index';

import { formatNumber } from './../../utils/utilities';
import getPrices from '../../pages/api/getPrices';
 
import styles from './finalRoomToPdf.module.scss';
import FinalRoomToPdf from './finalRoomToPdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PdfPageNew ({ trigger }) {
	const dispatch = useDispatch();

  const { apartStyle, apartSize, roomType, generalStates } = useSelector(state => state);
	const link = generalStates.link;

	const rooms = [
    'Wohnzimmer', 
		'Küche',
		'Badezimmer', 
    'Dusche', 
    'Schlafzimmer', 
    // 'Gang'
  ];

	if (!apartSize.badewanne) rooms.splice(2, 1);
	if (!apartSize.dusche) rooms.splice(3, 1);

  const price = apartSize.price;

	const { OptionsPrice, IndividualPrice } = getPrices();

	const logoImage = document.getElementById('logoImage');
	const mainImage = document.getElementById('apartmentImage');
	const finalData = document.getElementById('stats');
	const finalRooms = rooms.map((room) => document.getElementById(room));
	const qrCode = document.getElementById('qrCode');
	// console.log(finalRooms)

	useEffect(async() => {
		if (trigger > 0) {
			saveAsPdfHandler();
		}
	}, [trigger])
	
	const saveAsPdfHandler = async() => {
    dispatch(changePdfLoadingState(false));

    const pdfDOC = new jsPDF({
			orientation: 'p',
			// unit: 'mm',
			format: 'a4',
			compress: true,
		 }); 

		pdfDOC.setFontSize(12);
		dispatch(changePdfLoadingState(true));
		await addElementToPdf(logoImage, 80, 10, 2, 4, 4, pdfDOC, false);
		await addElementToPdf(mainImage, 10, 70, 3, 1.5, 1.5, pdfDOC, false);


		await addElementToPdf(finalData, 110, 70, 3, 2.5, 2.5, pdfDOC, false);

		for (let i = 0; i < finalRooms.length; i++) {
      await addElementToPdf(finalRooms[i], 10, 10, 1, 1, 1, pdfDOC, true);
    }

		await addElementToPdf(logoImage, 80, 10, 2, 4, 4, pdfDOC, true);

		pdfDOC.setFont('helvetica', "bold");
		pdfDOC.text(`HERZLICHEN GLÜCKWUNSCH!`, 10, 70);

		pdfDOC.setFont('helvetica', "normal");
		pdfDOC.text(`SIE SIND IHRER TRAUMWOHNUNG`, 10, 75);
		pdfDOC.text(`EINEN SCHRITT NÄHER.`, 10, 80);

		pdfDOC.text(`Sie können immer die Wohnung Ihrer Träume bekommen:`, 10, 100);
		pdfDOC.text(`Link Konfigurator:`, 10, 110);
		pdfDOC.text(`${link}`, 70, 110);
		pdfDOC.text(`QR-code`, 10, 120);
		await addElementToPdf(qrCode, 70, 120, 2, 1.5, 1.2, pdfDOC, false);

		pdfDOC.text('Jan Group AG', 10, 265);
		pdfDOC.text('Dorfstrasse 29, 9108 Gonten', 10, 270);
		pdfDOC.text('T +41 71 510 95 95', 10, 275);
		pdfDOC.text('verkauf@appenzeller-huus.ch', 10, 280);

		pdfDOC.setFont('helvetica', "bold");
		pdfDOC.text('appenzellerhuus-wohnen.ch', 135, 280);

		//Download the rendered PDF.
		pdfDOC.save('summary.pdf', { returnPromise: true }).then(() => {
			dispatch(changePdfLoadingState(false));
		});
  }

	const addElementToPdf = async(element, x, y, quality, scaleX, scaleY, pdfDOC, newPage) => {
		await html2canvas(element, { scale: quality,  }).then((canvas) => {
			newPage && pdfDOC.addPage();
			const imgData = canvas.toDataURL('image/png');
			const divHeight = element.clientHeight;
			const divWidth = element.clientWidth;
			const ratio = divHeight / divWidth;
		
			const width = pdfDOC.internal.pageSize.getWidth();
			let height = pdfDOC.internal.pageSize.getHeight();
			height = ratio * width;
			pdfDOC.addImage(imgData, 'JPEG', x, y, (width - 20)/scaleX, (height - 20)/scaleY);
		})  
	}

  return (
		<>
			<div className={styles.summary}>

				<div className={`${styles.container} ${styles.mainImage}`} >
					<img className={styles.logo} src='./AHLogo.svg' alt="Logo" id="logoImage"/>		
				</div>

				<div className={`${styles.container} finalData`}>
					<section className={`${styles.summary__overview}`} id="overview">

						<div  className={`${styles.summary__overview_content}`} id="stats">
							<h1 className={`${styles.title}`}> Ihre Wohnung</h1>

							<div className={`${styles.subtitle} ${styles.subtitle__uppercase}`}> HUUS   {apartSize.buildingsName} </div>

							<div className={`${styles.subtitle } ${styles.subtitle__bold}`}> {apartSize.roomsCount}-Zimmer-Wohnung</div>
							
							<div className={`${styles.stats}`} id="stats">
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Wohnungs-Nr.</div>
									<div className="col-4">{apartSize.apartmentId}</div>
								</div>
								
								<div className={`${styles.summary__overview_line} row`}>
									<div className="col-8">Etage</div>
									<div className="col-4">{apartSize.floor}</div>
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
							</div>
						</div>
					</section>
				</div>

				<div className={`${styles.container}`} >
					{rooms.map((room, index) => <FinalRoomToPdf room={roomType[`${room}`]} roomName={room} key={index} style={apartStyle.title}/>)}
				</div> 
				<div id="qrCode">
					<QRCode value={link} />
				</div> 
				<div onClick={saveAsPdfHandler}>Load</div>

			</div>
		</>
  )
}
