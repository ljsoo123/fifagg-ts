import React, { useState, useRef } from "react";
import * as S from "./styles";

const Home = (prop: { history: any }) => {
  const inputRef = useRef(null);
  const { history } = prop;
  const onBtnClick = () => {
    history.push(`/Profile/${inputRef.current.value}`);
  };
  return (
    <S.Main>
      <S.InputDiv>
        <input ref={inputRef} placeholder={"닉네임을 입력하세요"} />
      </S.InputDiv>
      <S.BtnDiv>
        <button onClick={onBtnClick} id="button">
          검색
        </button>
      </S.BtnDiv>
    </S.Main>
  );
};

export default Home;
