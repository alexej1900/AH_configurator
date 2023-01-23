export default function CollapseIcon({close, changeCLose}) {

  return (
    <>
      <div style={{marginRight: '1rem', cursor: 'pointer'}} onClick={() => changeCLose()}>
        {close ? 
          <svg width="20" height="20" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3L31 2" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M31 2L25 11" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.0469 26L2.05295 27.0647" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.05273 27.0645L7.99971 18.0293" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        : 
          <svg width="20" height="20" viewBox="0 0 33 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 20L13 19" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 19L7 28" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30.7329 10.874L19.739 11.9387" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.7388 11.9385L25.6857 2.90335" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        }
      </div>
    </>
  )
}
