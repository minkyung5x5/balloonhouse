import styled, { keyframes } from "styled-components";
import { useState } from 'react';
import houseImg from "./assets/house.png";
import Background from "./Background"


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
            topInitial: randomInt(pad, vh - 300 - (balloonHeight + pad)) + 'px',
            stringAngle: '0deg',
        }
        return newBalloon;
    }

    function addBalloon() {
        const newBalloon = createBalloon();
        setBalloonArr([...balloonArr, newBalloon]);
    };

    function removeBalloon(index) {
        document.getElementById(`${index}`).remove();
    };

    function calcBalloonProps(balloon){
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const bw = parseInt(balloon.width, 10);
        const bh = parseInt(balloon.height, 10);

        const initialX = parseInt(balloon.leftInitial, 10);
        const initialY = parseInt(balloon.topInitial, 10);
        const centerX = initialX + bw/2;
        const centerY = initialY + bh/2;
        const houseX = vw/2;
        const houseY = vh - 140;
        const dx = houseX - centerX;
        const dy = houseY - centerY;

        const angle = Math.round(Math.atan(dx/dy) * 180 / Math.PI);
        const height = Math.sqrt(dx*dx + dy*dy);
        const top = bh/2 + (bh/2+10) * Math.cos(angle * (Math.PI / 180));
        const left = bw/2 + (bh/2+10) * Math.sin(angle * (Math.PI / 180));

        return { angle: -angle+'deg', top, left, height, initialX, initialY, houseX, houseY}
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
                <BalloonWrapper id={i} key={i} onClick={() => removeBalloon(i)} 
                $topInitial={b.topInitial} $leftInitial={b.leftInitial} $initialX={balloonProps.initialX} $initialY={balloonProps.initialY} $houseX={balloonProps.houseX} $houseY={balloonProps.houseY}>
                    <BalloonDiv $balloonColor={b.balloonColor} $hilightColor={b.hilightColor} $angle={balloonProps.angle}></BalloonDiv>
                    <String $top={balloonProps.top} $left={balloonProps.left} $angle={balloonProps.angle} $height={balloonProps.height}></String>
                </BalloonWrapper>
            );
        }
        return result;
    }

    return (
        <Bg>
            <Background></Background>
            <Objects>
                <Box>
                    {balloonSet()}
                </Box>
                <House onClick={() => addBalloon()} src={houseImg} />
            </Objects>
        </Bg>
    );
}

const Bg = styled.div`
    position: static;
    width: 100%;
    height: 100vh;
`

const Objects = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
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
    position: absolute;
    left: ${props => props.$leftInitial};
    top: ${props => props.$topInitial};
    width: 85px;
    animation: ${props => float(props.$houseX, props.$houseY, props.$initialX, props.$initialY)} 1s;
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
    opacity: 0.7;
    animation: ${props => stringHeight(props.$height)} 1s;
`;

const BalloonDiv = styled.div`
    position: absolute;
    width: 90px;
    height: 100px;
    background: radial-gradient(#e5e7ff 1%, ${props => props.$balloonColor} 80%);
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

    &:hover {
        opacity: 0.5;
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

const float = (left1, top1, left2, top2) => keyframes`
    0% {
        opacity: 0;
        left: ${left1}px;
        top: ${top1}px;
        transform: translate3d(0, 100%, 0);
    }
    to {
        opacity: 1;
        left: ${left2}px;
        top: ${top2}px;
        transform: translateZ(0);
    }
`;

const stringHeight = (height) => keyframes`
    0% {
        opacity: 0;
        height: 0px;
    }
    to {
        opacity: 0.7;
        height: ${height}px;
    }
`;

export default Home;