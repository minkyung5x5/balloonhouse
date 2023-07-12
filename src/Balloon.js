import "./Balloon.css"
import styled from "styled-components";
import { useState } from 'react';

function Balloon(){
    // const balloonNumber = 5;
    const balloonColorArr = ['red', '#F2F24B', '#20B1A3', 'dodgerblue', 'orange'];
    const [balloonArr, setBalloonArr] = useState([
        {
            balloonColor: balloonColorArr[Math.floor(Math.random() * balloonColorArr.length)],
            hilightColor: 'white',
            topInitial: '40px',
            leftInitial: '-40px',
            stringAngle: '-20deg',
        },
        {
            balloonColor: balloonColorArr[Math.floor(Math.random() * balloonColorArr.length)],
            hilightColor: 'white',
            topInitial: '80px',
            leftInitial: '50px',
            stringAngle: '-8deg',
        },
        {
            balloonColor: balloonColorArr[Math.floor(Math.random() * balloonColorArr.length)],
            hilightColor: 'white',
            topInitial: '5px',
            leftInitial: '80px',
            stringAngle: '1deg',
        },
        {
            balloonColor: balloonColorArr[Math.floor(Math.random() * balloonColorArr.length)],
            hilightColor: 'white',
            topInitial: '100px',
            leftInitial: '110px',
            stringAngle: '10deg',
        },
        {
            balloonColor: balloonColorArr[Math.floor(Math.random() * balloonColorArr.length)],
            hilightColor: 'white',
            topInitial: '140px',
            leftInitial: '50px',
            stringAngle: '18deg',
        },
    ]);

    const balloonSet = () => {
        const result = [];
        for (let i = 0; i < balloonArr.length; i++) {
            result.push(
                <BalloonWrapper key={i} onClick={()=>removeBalloon(i)}
                $leftInitial={balloonArr[i].leftInitial} $topInitial={balloonArr[i].topInitial}>
                    <String $angle={balloonArr[i].stringAngle}></String>
                    <BalloonDiv $balloonColor={balloonArr[i].balloonColor} $hilightColor={balloonArr[i].hilightColor}></BalloonDiv>
                </BalloonWrapper>
            );
        }
        return result;
    };

    function removeBalloon(index) {
        const newBalloonArr = balloonArr.filter((_, i) => i !== index);
        setBalloonArr(newBalloonArr);
    };

    return (
        <Box>
            {balloonSet()}
        </Box>
    );
}

const Box = styled.div`
    position: relative;
    display: block;
    width: max-content;
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
    height: 250px;
    background: #50535E;
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

export default Balloon;