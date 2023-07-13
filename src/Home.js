import styled from "styled-components";
import { useState } from 'react';
import houseImg from "./assets/house.png";


function Home(){
    const balloonNumber = 5;
    const balloonColorArr = ['#ff93aa', '#ff3e39', '#fdcc22', '#3b25cb', '#c7dd25'];
    const [balloonArr, setBalloonArr] = useState(()=>initBalloonArr());

    function initBalloonArr() {
        const result = [];
        for(let i = 0; i < balloonNumber; i++){
            result.push(createBalloon());
        }
        return result;
    }

    function createBalloon() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const balloonWidth = 90;
        const balloonHeight = 100;
        const pad = 10;

        const newBalloon = {
            width: balloonWidth + 'px',
            height: balloonHeight + 'px',
            balloonColor: balloonColorArr[Math.floor(Math.random() * balloonColorArr.length)],
            hilightColor: 'white',
            leftInitial: randomInt(pad, vw - (balloonWidth + pad)) + 'px',
            topInitial: randomInt(pad, vh - 140 - (balloonHeight + pad)) + 'px',
            stringAngle: '0deg',
        }
        return newBalloon;
    }

    function addBalloon() {
        const newBalloon = createBalloon();
        setBalloonArr([...balloonArr, newBalloon]);
    };

    function removeBalloon(index) {
        const newBalloonArr = balloonArr.filter((_, i) => i !== index);
        setBalloonArr(newBalloonArr);
    };

    function calcBalloonProps(balloon){
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const bw = parseInt(balloon.width, 10);
        const bh = parseInt(balloon.height, 10);

        const left1 = parseInt(balloon.leftInitial, 10) + bw/2;
        const top1 = parseInt(balloon.topInitial, 10) + bh/2;
        const left2 = vw/2;
        const top2 = vh - 140;
        const dx = left2-left1;
        const dy = top2-top1;

        const angle = Math.round(Math.atan(dx/dy) * 180 / Math.PI);
        const height = Math.sqrt(dx*dx + dy*dy);
        const top = bh/2 + (bh/2+10) * Math.cos(angle * (Math.PI / 180));
        const left = bw/2 + (bh/2+10) * Math.sin(angle * (Math.PI / 180));

        return { angle: -angle+'deg', height, top, left }
    }

    function randomInt(min, max) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { var tmp = min; min = max; max = tmp; }
        return Math.floor(min + (max - min + 1) * Math.random());
    }

    const balloonSet = () => {
        const result = [];
        for (let i = 0; i < balloonArr.length; i++) {
            const b = balloonArr[i];
            const balloonProps = calcBalloonProps(b);
            result.push(
                <BalloonWrapper key={i} onClick={() => removeBalloon(i)} $leftInitial={b.leftInitial} $topInitial={b.topInitial}>
                    <BalloonDiv $balloonColor={b.balloonColor} $hilightColor={b.hilightColor} $angle={balloonProps.angle}></BalloonDiv>
                    <String $top={balloonProps.top} $left={balloonProps.left} $angle={balloonProps.angle} $height={balloonProps.height}></String>
                </BalloonWrapper>
            );
        }
        return result;
    }


    return (
        <Sky>
            <Box>
                {balloonSet()}
            </Box>
            <House onClick={() => addBalloon()} src={houseImg} />
        </Sky>
    );
}

const Sky = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: linear-gradient(#00ebff, #0074f9);
`;

const Box = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: ${window.innerHeight - 193}px;
    margin-left: auto;
    margin-right: auto;
`;

const BalloonWrapper = styled.div`
    background-color: red;
    position: absolute;
    left: ${props => props.$leftInitial};
    top: ${props => props.$topInitial};
    width: 85px;
`;

const String = styled.div`
    position: absolute;
    top:  ${props => props.$top}px;
    left: ${props => props.$left}px;
    transform: rotate(${props => props.$angle});
    transform-origin: top left;
    width: 2px;
    height: ${props => props.$height}px;
    background: #000000ff;
    opacity: 0.5;
`;

const BalloonDiv = styled.div`
    position: absolute;
    width: 90px;
    height: 100px;
    background: ${props => props.$balloonColor};
    border-radius: 50%;
    border: 1px solid black;
    transform: rotate(${props => props.$angle});
    
    &:before {
        content: '';
        position: absolute;
        right: 20px;
        top: 15px;
        width: 15px;
        height: 35px;
        box-shadow: 5px 0 0 ${props => props.$hilightColor};
        border-radius: 50%;
        transform: rotate(-30deg);
    }

    &:after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -10px;
        width: 12px;
        height: 10px;
        background: ${props => props.$balloonColor};
        clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
        border-radius: 20%;
        border-bottom: 1px solid black;
      }
`;

const House = styled.img`
    position: relative;
    aspect-ratio: auto;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    transition: width 0.5s, height 0.5s;

    &:hover {
        width: 330px;
    }
`;

export default Home;