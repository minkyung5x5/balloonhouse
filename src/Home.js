import styled from "styled-components";
import { useState } from 'react';

function Balloon(){
    const balloonNumber = 5;
    const balloonColorArr = ['red', '#F2F24B', '#20B1A3', 'dodgerblue', 'orange'];
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

    function calcStringAngle(balloon){
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const left1 = parseInt(balloon.leftInitial, 10) + parseInt(balloon.width, 10)/2;
        const top1 = parseInt(balloon.topInitial, 10) + parseInt(balloon.height, 10) - 5;
        const left2 = vw/2;
        const top2 = vh - 140;
        const dx = left2-left1;
        const dy = top2-top1;

        return -Math.round(Math.atan(dx/dy) * 180 / Math.PI) + 'deg'
    };

    function calcStringHeight(balloon){
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const left1 = parseInt(balloon.leftInitial, 10) + parseInt(balloon.width, 10)/2;
        const top1 = parseInt(balloon.topInitial, 10) + parseInt(balloon.height, 10) - 5;
        const left2 = vw/2;
        const top2 = vh - 140;
        const dx = left2-left1;
        const dy = top2-top1;
        return Math.sqrt(dx*dx + dy*dy)
    };

    function randomInt(min, max) {
        if (max == null) { max = min; min = 0; }
        if (min > max) { var tmp = min; min = max; max = tmp; }
        return Math.floor(min + (max - min + 1) * Math.random());
    }

    return (
        <Sky>
            <Box>
                {balloonArr.map((b, i) =>
                <BalloonWrapper key={i} onClick={() => removeBalloon(i)} $leftInitial={b.leftInitial} $topInitial={b.topInitial}>
                    <String $angle={calcStringAngle(b)} $height={calcStringHeight(b)}></String>
                    <BalloonDiv $balloonColor={b.balloonColor} $hilightColor={b.hilightColor}></BalloonDiv>
                </BalloonWrapper>
                )}
            </Box>
            <StyledHouse onClick={() => addBalloon()}></StyledHouse>
        </Sky>
    );
}

const Sky = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgb(255, 141, 141), rgb(33, 59, 255));
`;

const Box = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 600px;
    margin-left: auto;
    margin-right: auto;
`;

const BalloonWrapper = styled.div`
    position: absolute;
    left: ${props => props.$leftInitial};
    top: ${props => props.$topInitial};
    width: 85px;
`;

const String = styled.div`
    position: absolute;
    top: 110px;
    left: 42px;
    transform: rotate(${props => props.$angle});
    transform-origin: top left;
    width: 2px;
    height: ${props => props.$height}px;
    background: #252525;
`;

const BalloonDiv = styled.div`
    position: absolute;
    width: 90px;
    height: 100px;
    background: ${props => props.$balloonColor};
    border-radius: 50%;

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
        width: 10px;
        height: 10px;
        background: ${props => props.$balloonColor};
        clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
      }

`;

const StyledHouse = styled.div`
    align-self: flex-end;
    background: rgb(5, 16, 44);
    display: block;
    height: 100px;
    bottom: 0px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    position: relative;
    width: 200px;

    &:before {
        border-bottom: 80px solid rgb(5, 16, 44);
        border-left: 100px solid transparent;
        border-right: 100px solid transparent;
        content: "";
        height: 0;
        left: 0;
        position: absolute;
        top: -80px;
        width: 0;
    }

    &:hover {
        background: rgb(107, 133, 198);
    }
`;

const Sample = styled.div`
    background: rgb(255, 255, 255);
    display: block;
    margin-left: 234px;
    margin-top: 514px;
    height: 10px;
    width: 10px;
`;

export default Balloon;