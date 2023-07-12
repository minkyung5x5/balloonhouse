import styled from 'styled-components';

function House(){
    return (
        <StyledHouse></StyledHouse>
    );
}

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
`;

export default House;