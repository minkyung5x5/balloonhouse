import styled, {keyframes} from 'styled-components';

function Background(){

  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const cloudArr = [
    { multi: 1.7, top: vh - 70, left: vw/6, rotate: 5 },
    { multi: 0.7, top: vh - 150, left: vw * 3/5, rotate: -5 },
    { multi: 1.8, top: vh - 300, left: 50, rotate: 5 },
    { multi: 1.7, top: vh - 70, left: vw * 2/3, rotate: -5 },
    { multi: 0.7, top: vh - 150, left: vw * 1/3, rotate: 5 },
    { multi: 1.8, top: vh - 320, left: vw - 300, rotate: -5 },
    { multi: 1, top: vh - 350, left: vw - 500, rotate: -5 },
  ];

  const cloudSet = () => {
    const result = [];
    const isMobile = vw < 768;
    const cloudNumber = isMobile ? 3 : 7;
    if(!isMobile){
      result.push(<Rainbow></Rainbow>)
    }
    for (let i = 0; i < cloudNumber; i++) {
        const c = cloudArr[i]
        result.push(
          <Cloud key={i} $multi={c.multi} $top={c.top} $left={c.left} $rotate={c.rotate}></Cloud>
        );
    }
    return result;
}

    return (
      <Sky>
        {cloudSet()}
      </Sky>
    );
}

const Sky = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(#00f2ff, #0074f9);
`;


const swell = keyframes`
  from {
    scale: 1;
  }
  50% {
    scale: 1.1;
  }
  to {
    scale: 1;
  }
`;

const bob = keyframes`
  from {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10%);
  }
  to {
    transform: translateY(0);
  }
`;

const Cloud = styled.div`
    background: #FFFFFF;
    border-radius: 50%;
    box-shadow: 
      #FFFFFF  ${props => props.$multi*65}px ${props => props.$multi*(-15)}px 0 ${props => props.$multi*(-5)}px, 
      #FFFFFF ${props => props.$multi*30}px ${props => props.$multi*(-25)}px, 
      #FFFFFF ${props => props.$multi*30}px ${props => props.$multi*10}px, 
      #FFFFFF ${props => props.$multi*60}px ${props => props.$multi*15}px 0 ${props => props.$multi*(-10)}px, 
      #FFFFFF ${props => props.$multi*85}px ${props => props.$multi*5}px 0 ${props => props.$multi*(-5)}px;
    height: ${props => props.$multi*50}px;
    width: ${props => props.$multi*55}px; 
    position: absolute;
    left: ${props => props.$left}px;
    top: ${props => props.$top}px; 
    rotate: ${props => props.$rotate}deg;
    animation: 10s infinite ${swell}, 4s infinite ${bob};
`;

const rainbow = keyframes`
  50% { transform: rotate(50deg); }
`;

const Rainbow = styled.div`
  animation: ${rainbow} 5s ease-in-out infinite;
  border-radius: 170px 0 0 0;
  box-shadow: 
    #FB323C -4px -4px 0 1px,
    #F99716 -8px -8px 0 3px,
    #FEE124 -12px -12px 0 5px,
    #AFDF2E -16px -16px 0 7px,
    #6AD7F8 -20px -20px 0 9px,
    #60B1F5 -24px -24px 0 11px,
    #A3459B -28px -28px 0 13px;
  height: 150px;
  width: 150px;
  margin-left: -40px;
  position: absolute;
  left: ${window.innerWidth-350}px;
  top: ${window.innerHeight-390}px;
    transform: rotate(40deg);
`;

export default Background;