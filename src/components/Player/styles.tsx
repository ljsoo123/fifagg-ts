import styled, { createGlobalStyle } from "styled-components";

export const Nickname = styled.div`
  font-size: 50px;
  text-align: center;
`;

export const Level = styled.div`
  font-size: 30px;
  text-align: center;
`;

export const Main = styled.div`
  margin: 0;
  width: 100vw;
  height: 100vh;
`;

export const Global = createGlobalStyle`
    body {
        margin : 0;
    }
`;

export const Info = styled.div`
  margin-bottom: 50px;
  margin-top: 50px;
`;
