import Image from 'next/image';

import styles from './image.module.scss';

export default function FullImage({src}) {
    return (
        // <div className="row">
            <div className={[styles.image__wrapper, styles.full].join(' ')} style={{position:"relative", width: "100vw", height: "100vh"}}>
                <Image className={styles.full} priority={true} src={src} layout="fill" alt="Image"/>
            </div>
        // </div>
    )
}
