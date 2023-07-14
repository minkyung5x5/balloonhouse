import styled, {keyframes} from 'styled-components';
import { useState } from 'react';
import mojs from '@mojs/core'
import MojsExample from "./Mojsexample";



function Pop(){

  const [particleArr, setParticleArr] = useState(Array);
  const burst = new mojs.Burst();

  const burst2 = new mojs.Burst({
    radius:   { 10 : 90 },
    count:    10,
    duration: 3000,
    children: {
      shape: [ 'circle', 'polygon', 'rect'],
      fill:  [ '#333', 'magenta', 'purple' ],
      angle: { 0: 180 },
      degreeShift: 'rand(-360, 360)',
      delay: 'stagger(0, 50)',
    }
  });
  

  function popBalloon(e) {
    burst2.replay();
    // new MojsPlayer({ add: burst, isPlaying: true, isRepeat: true });
    // for (let i = 0; i < 30; i++) {
    //   createParticle(e.clientX, e.clientY, i);
    // }
  }

  function createParticle(x, y, i) {
    const size = Math.floor(Math.random() * 20 + 5);
    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;
    setParticleArr(oldArr => [...oldArr, {size, x, y, destinationX, destinationY}]);
  }


    return (
        <Sky2>
            <Button onClick={(e) => popBalloon(e)}> Plz
            </Button>
            {particleArr.map((p,i)=>(
              <Particle key={i} onAnimationEnd={() => console.log(this)}
              $size={p.size} $x={p.x} $y={p.y} $destinationX={p.destinationX} $destinationY={p.destinationY}></Particle>
            ))}
            {/* <MojsExample></MojsExample> */}
        </Sky2>
    );
}


const Sky2 = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(#dd00ff, #0074f9);
`;

const Button = styled.button`
  margin: 100px;
  padding: 10px;
`;

const Particle = styled.div`
  position: fixed;
  left: 100px;
  top: 100px;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  background: black;//hsl(${Math.random() * 90 + 180}, 70%, 60%);
  animation-name: ${props => pop(props.$x, props.$y, props.$destinationX, props.$destinationY)};
  animation-duration: ${Math.random() * 1000 + 500}ms;
  animation-timing-function: cubic-bezier(0, .9, .57, 1);
  animation-delay: ${Math.random() * 200}ms;
`;

const pop =  (x, y, destinationX, destinationY) => keyframes`
  from {
    transform: translate(-50%, -50%) translate(${x}px, ${y}px);
    opacity: 1;
  }
  to {
    transform: translate(${destinationX}px, ${destinationY}px);
    opacity: 0;
  }
`;

export default Pop;