import styled from "styled-components";

const LoadWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    margin: auto;
    justify-content: center;
`;

const LoaderContainer = styled.div`
    /* @keyframes animateBg {
        0%{
            filter: hue-rotate(0deg);
        }
        100%{
            filter: hue-rotate(360deg);
        }
    } */

    display: flex;
    justify-content: center;
    align-items: center;
    height: ${(props) => String(props.size) + "px"};
    width: ${(props) => String(props.size) + "px"};
    /* animation: animateBg 10s linear infinite; */
`;

const Loader = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(calc(18deg * var(--i)));
    }

    span::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 15px;
        background: ${(props) => props.color};

        border-radius: 50%;
        box-shadow: 0 0 ${(props) => props.s1} ${(props) => props.color}, 0 0 ${(props) => props.s2} ${(props) => props.color},
            0 0 ${(props) => props.s3} ${(props) => props.color}, 0 0 ${(props) => props.s4} ${(props) => props.color},
            0 0 ${(props) => props.s5} ${(props) => props.color}, 0 0 ${(props) => props.s6} ${(props) => props.color};

        animation: animate 2s linear infinite;
        animation-delay: calc(0.1s * var(--i));

        @keyframes animate {
            0% {
                transform: scale(1);
            }
            80%,
            100% {
                transform: scale(0);
            }
        }
    }
`;

const LoadingRing = ({ size, color }) => {
    const s1 = String(Math.ceil(size / 12)) + "px";
    const s2 = String(Math.ceil(size / 6)) + "px";
    const s3 = String(Math.ceil(size / 3)) + "px";
    const s4 = String(Math.ceil(size / 2)) + "px";
    const s5 = String(Math.ceil((2 * size) / 3)) + "px";
    const s6 = String(Math.ceil((10 * size) / 12)) + "px";
    return (
        <LoadWrapper>
            <LoaderContainer size={size}>
                <Loader color={color} s1={s1} s2={s2} s3={s3} s4={s4} s5={s5} s6={s6}>
                    <span style={{ "--i": 1 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 3 }}></span>
                    <span style={{ "--i": 4 }}></span>
                    <span style={{ "--i": 5 }}></span>
                    <span style={{ "--i": 6 }}></span>
                    <span style={{ "--i": 7 }}></span>
                    <span style={{ "--i": 8 }}></span>
                    <span style={{ "--i": 9 }}></span>
                    <span style={{ "--i": 10 }}></span>
                    <span style={{ "--i": 11 }}></span>
                    <span style={{ "--i": 12 }}></span>
                    <span style={{ "--i": 13 }}></span>
                    <span style={{ "--i": 14 }}></span>
                    <span style={{ "--i": 15 }}></span>
                    <span style={{ "--i": 16 }}></span>
                    <span style={{ "--i": 17 }}></span>
                    <span style={{ "--i": 18 }}></span>
                    <span style={{ "--i": 19 }}></span>
                    <span style={{ "--i": 20 }}></span>
                </Loader>
            </LoaderContainer>
        </LoadWrapper>
    );
};

export default LoadingRing;
