import styled, { keyframes } from "styled-components";
import { useState } from 'react';
import houseImg from "../assets/house.png";
import bearImg from "../assets/bear.png";
import flowerImg from "../assets/flower.png";
import Background from "./Background";
import mojs from '@mojs/core';
import useInterval from "../function/UseInterval";

function Home(){
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const balloonColorArr = ['#ff93aa', '#ff3e39', '#fdcc22', '#3b25cb', '#6a15ba', '#c7dd25'];
    const balloonShapeArr = ['bear', 'flower', 'circle', 'circle', 'circle', 'circle'];
    const shapeWidth = {circle: 90, bear: 122, flower: 105};
    const [balloonArr, setBalloonArr] = useState(([]));

    let delay = 50;
    useInterval(() => {
        const balloonNumber = vw > 768 ? 100 : 30;
        if(balloonArr.length < balloonNumber) {
            addBalloon();
        } else {
            delay = null;
        }
    }, delay);

    function createBalloon(i) {
        const shape = balloonShapeArr[Math.floor(Math.random() * balloonShapeArr.length)];
        const balloonWidth = shapeWidth[shape];
        const balloonHeight = 100;
        const pad = 10;
        const newBalloon = {
            shape,
            width: balloonWidth + 'px',
            height: balloonHeight + 'px',
            balloonColor: findBalloonColor(shape),
            hilightColor: 'white',
            leftInitial: randomIntWidth(vw, balloonWidth, i) + 'px',
            topInitial: randomIntHeight(0, vh - 300 - (balloonHeight + pad )) + 'px',
            stringAngle: '0deg',
        }

        return newBalloon;
    };

    function addBalloon() {
        const newBalloon = createBalloon(balloonArr.length);
        setBalloonArr([...balloonArr, newBalloon]);
    };

    function removeBalloon(e, index, color) {
        document.getElementById(`${index}`).remove();
        popBalloon(e, color);
    };

    function popBalloon(e, color) {
        const burst = new mojs.Burst({
            left: 0,
            top: 0,
            radius: { 10 : 90 },
            count: 10,
            duration: 3000,
            children: {
              shape: [ 'circle', 'polygon', 'rect'],
              fill:  [ color, 'white' ],
              angle: { 0: 180 },
              degreeShift: 'rand(-360, 360)',
              delay: 'stagger(0, 50)',
            }
          });
        
        burst.el.style.zIndex = 10;
        burst
            .tune({ x: e.pageX, y: e.pageY })
            .replay();
    };

    function findBalloonColor(shape){
        switch (shape) {
            case 'circle':
                return balloonColorArr[Math.floor(Math.random() * balloonColorArr.length)];
            case 'flower':
                return '#ffd300';
            case 'bear':
                return '#fa7514';
            default:
                return 'white'
        }
    };

    function calcBalloonProps(balloon){
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
        const shapeH = (balloon.shape === 'circle') ? bh/2 + 10 : bh/2;

        const top = bh/2 + (shapeH) * Math.cos(angle * (Math.PI / 180));
        const left = bw/2 + (shapeH) * Math.sin(angle * (Math.PI / 180));

        return { angle: -angle+'deg', top, left, height, initialX, initialY, houseX, houseY}
    };

    function randomIntWidth(vw, w, balloonNum) {
        const section = balloonNum / 10;
        let min = vw/2 - (section + 1) * w;
        let max = vw/2 + section * w;
        if (min < 0) { min = 0; }
        if (max > vw - w) { max = vw - w;}
        if (max == null) { max = min; min = 0; }
        if (min > max) { var tmp = min; min = max; max = tmp; }

        return Math.floor(min + (max - min + 1) * Math.random());
    };

    function randomIntHeight(min, max) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { var tmp = min; min = max; max = tmp; }

        return Math.floor(min + (max - min + 1) * Math.random());
    };

    const balloonSet = () => {
        const result = [];
        for (let i = 0; i < balloonArr.length; i++) {
            const b = balloonArr[i];
            const balloonProps = calcBalloonProps(b);
            result.push(
                <BalloonWrapper id={i} key={'b'+i} onClick={(e) => removeBalloon(e, i, b.balloonColor)}
                $topInitial={b.topInitial} $leftInitial={b.leftInitial} $initialX={balloonProps.initialX} $initialY={balloonProps.initialY} $houseX={balloonProps.houseX} $houseY={balloonProps.houseY}>
                    {
                        b.shape === 'circle' ? <BalloonDiv $balloonColor={b.balloonColor} $hilightColor={b.hilightColor} $angle={balloonProps.angle}></BalloonDiv>
                        :b.shape === 'bear' ? <Bear $angle={balloonProps.angle} src={bearImg} />
                        :b.shape === 'flower' ? <Flower $angle={balloonProps.angle} src={flowerImg} />
                        :''
                    }
                    <String $top={balloonProps.top} $left={balloonProps.left} $angle={balloonProps.angle} $height={balloonProps.height}></String>
                </BalloonWrapper>
            );
        }
        return result;
    };

    return (
        <Window>
            <Background>
            </Background>
            <Objects>
                <Box>
                    {balloonSet()}
                </Box>
                <House onClick={() => addBalloon()} src={houseImg} />
            </Objects>
        </Window>
    );
}

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

const stretch = (height) => keyframes`
    0% {
        opacity: 0;
        height: 0px;
    }
    to {
        opacity: 0.7;
        height: ${height}px;
    }
`;

const Window = styled.div`
    position: static;
    width: 100%;
    height: 100vh;
`;

const Objects = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    overflow: hidden;
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
    transition: width 0.5s, height 0.5s;
    &:hover {
        z-index: 1;
    }
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
    animation: ${props => stretch(props.$height)} 1s;
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
        background: ${props => props.$balloonColor};
    }
`;

const Bear = styled.img`
    position: relative;
    aspect-ratio: auto;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    transition: width 0.5s, height 0.5s;
    transform: rotate(${props => props.$angle});
    &:hover {
        filter: brightness(1.2);
    }
`;

const Flower = styled.img`
    position: relative;
    aspect-ratio: auto;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    transition: width 0.5s, height 0.5s;
    transform: rotate(${props => props.$angle});
    &:hover {
        filter: saturate(3);
    }
`;

const House = styled.img`
    position: relative;
    aspect-ratio: auto;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    transition: width 0.5s, height 0.5s;
    z-index: 10;
    &:hover {
        width: 330px;
    }
`;

export default Home;