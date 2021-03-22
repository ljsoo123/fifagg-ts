import Axios from "axios";
import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";
import Match from "../Match/Match";

const Player = (prop: { player: any }) => {
  const [matchData, setMatchData] = useState<any[]>([]);
  const { player } = prop;

  useEffect(() => {
    axios
      .get(
        `https://api.nexon.co.kr/fifaonline4/v1.0/users/${player.accessId}/matches?matchtype=50&offset=0&limit=20`,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTY0NDc3NDY0MyIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2MDI2NzA3NDgsImV4cCI6MTYxODIyMjc0OCwiaWF0IjoxNjAyNjcwNzQ4fQ.bJSyiju8IDbyaKxagdpTB1bV2zMw5ExOem_L5TjTZ-Y",
          },
        }
      )
      .then((res) => {
        setMatchData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <S.Main>
      <S.Global />
      <S.Info>
        <S.Nickname>{player.nickname}</S.Nickname>
        <S.Level>Lv.{player.level}</S.Level>
      </S.Info>
      {matchData.length > 0 && <Match matchData={matchData} player={player} />}
    </S.Main>
  );
};

export default Player;
