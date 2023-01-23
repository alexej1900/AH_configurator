import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState, useEffect, useLayoutEffect, useRef} from 'react';

import getSettings from '../../pages/api/getSettings';
import setVariables from '../../utils/setVariables';

import { changeMenuState } from "../../redux/actions/index";
import { useSelector, useDispatch } from "react-redux";

import checkIsStylePageExist from '../../pages/api/checkIsStylePageExist';

import Fade from 'react-reveal/Fade';

import style from './header.module.scss';

export default function Header () {
  const [isStylePageExist, setIStylePageExist] = useState(false);

  const [listSize, setListSize] = useState(0);
  const [wrapperSize, setWrapperSize] = useState(0);
  const [shift, setShift] = useState(0);
  const [shiftSize, setShiftSize] = useState(0);

  const checkStylePage = checkIsStylePageExist();
  const settings = getSettings();
  const listRef = useRef(null);

  const dispatch = useDispatch();
  const { pathname, asPath, query } = useRouter();

  const generalStates = useSelector((state) => state.generalStates);

  const { menu, open, logo, headerImage, headerBg, rooms }  = generalStates;

  useEffect(() => {
    checkStylePage.then((isExist) => {
      setIStylePageExist(isExist)
    });
  }, [checkStylePage]);

  useEffect(() => {
    updateSize();
  });

  useEffect(() => {
    settings.then((data) => {
      setVariables(data.settings);
    })
  }, [settings]);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const updateSize = () => {  // Comparing width of list with rooms and wisible wrapper. If width of list > than width of wrapper will appears button

    const listWrapper = document.getElementById('listWrapper');
    const menuList = document.getElementById('menuList');
    setListSize(menuList?.offsetWidth);
    setWrapperSize(listWrapper?.offsetWidth);
    
    window.innerWidth <= 1300 && setShift(0);
  }

  const closeMenuHandler = () => dispatch(changeMenuState(!menu));

  const background = headerImage ? `no-repeat url("${headerImage}")` : `${headerBg}`;

  const moveRightClickHandler = () => {
    (shift < 10 && shift < rooms.length) && setShift(++shift);
    setShiftSize((50 / rooms.length) * shift); //shifting should be not more than 50%
  }
  
  const moveLeftClickHandler = () => {
    shift > 0 && setShift(--shift);
    setShiftSize((50 / rooms.length) * shift); 
  }

  const openStyle = menu ? {background: background, backgroundSize: "100%"} : {background: 'transparent'};

  return (
    


    <header 
      className={[style.header, open & pathname !== '/' && style.compressed].join(' ')} 
      style={openStyle}
    >
      {logo &&
        <>
          <div className={style.header__wrapper}>
            {logo && 
              <Link href='/'>
                <div className={style.logo}>
                  <Image src={logo} height={'30px'} width={'150px'} layout="fixed" alt="Logo"/>
                </div>
              </Link>
            }

            <div className={style.menu}>
              <div className={style.menu__item}>
                <img 
                  src={menu ? "/close-black.svg" : "/hamburger.svg"} 
                  width="24" 
                  height="24" 
                  className={style.menu__open} 
                  onClick={() => closeMenuHandler()}
                  alt="Menu"
                />
              </div>
              {pathname !== '/' && pathname !== '/summary' &&
                <Link href='/summary'>
                  <a className={`${style.finish}`} title="To the summary page">
                    <img src='./summaryList.svg' alt="summary" />
                    <span className={`${style.finish__btn_descr}`}>Fertigstellen</span>
                  </a>
                </Link> 
              } 

              {pathname !== '/' &&
                <Link href='https://www.nightnurse.ch/share/22G09%20Calydo/221102/'>
                  <a className={`${style.virtual}`} title="To the virtual tour" target="_blank">
                    <img src='./virtual.svg' alt="virtual" />
                  </a>
                </Link> 
              }     
            </div>
          </div>

          {menu &&
            <Fade duration={150} top className={style.header__menu_block} >
              <div className={style.header__menu} id='listWrapper'>
                <div className={style.header__menu__wrapper} >
                  <ul className={style.header__menu__list} ref={listRef} id='menuList'>
              
                    {shift > 0 && 
                      <div className={`${style.moveLeftButton}`} onClick={moveLeftClickHandler}> 
                        <img src="/arrowRight.svg"/> 
                      </div>
                    }

                    <div className={style.header__menu__internalList}>
                      <div className={`${style.header__menu__internalList_wrapper} `} style={{transform: `translateX(-${shiftSize}%)`}}>
                        
                        <Link activeClassName='active' exact={true} href='/'>
                          <a className={`${asPath === '/' ? style.active : ''} ${style.welcomeItem}`} onClick={() => closeMenuHandler()}>Grundrisse</a>
                        </Link>

                        {isStylePageExist && 
                          <Link href='/type'>
                            <a className={`${asPath === '/type' ? style.active : ''} ${style.typeItem}`} onClick={() => closeMenuHandler()}>Interieurstil</a>
                          </Link>
                        }

                        {rooms?.map((room) => {
                      
                          if (room) {
                            const currentRoom = `/${room.toLowerCase()}`;
                            return (
                            <Link href={currentRoom} key={room}>
                              <a className={`${query.room === currentRoom.slice(1) ? style.active : ''} ${style.roomItem}`} onClick={() => closeMenuHandler()}>{room}</a>
                            </Link>
                            )}
                        })}
                        </div>
                      </div>
                    </ul>
                  </div>

                  {listSize > wrapperSize && //Button appears if the list of rooms longer than the wrapper
                    <div className={`${style.moveRightButton}`} onClick={moveRightClickHandler}> 
                      <img src="/arrowRight.svg"/> 
                    </div>
                  }
                  
                </div>
              </Fade>
            }
        </>
      }
    </header>
  )
}
