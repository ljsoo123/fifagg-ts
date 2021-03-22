import React, { useRef, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as S from "./styles";

const Match = (prop: { matchData: any; player: any }) => {
  let { player, matchData } = prop;

  //console.log(player);
  let history = useHistory();
  const inputRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [matchIn, setMatchIn] = useState<any[]>([]);
  const [matchIndex, setMatchIndex] = useState();
  //matchData = matchData[0];
  //console.log(`matchIn1 : ${matchIn}`);
  //console.log(matchIn);
  useEffect(() => {
    console.log(123);
    const data = matchData.map(
      (gameId: any) =>
        axios.get(
          `https://api.nexon.co.kr/fifaonline4/v1.0/matches/${gameId}`,
          {
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTY0NDc3NDY0MyIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2MDI2NzA3NDgsImV4cCI6MTYxODIyMjc0OCwiaWF0IjoxNjAyNjcwNzQ4fQ.bJSyiju8IDbyaKxagdpTB1bV2zMw5ExOem_L5TjTZ-Y",
            },
          }
        )
      /*.then((res: any) => {
          //console.log(res);
          setMatchIn((prev) => [...prev, res.data]);
          console.log("success");
          //console.log(1);
        })
        .catch((err: any) => {
          console.log(err);
          console.log(2);
        })*/
    );
    console.log(data);
    Promise.all(data)
      .then((res: any) => {
        //console.log("data:" + data);
        console.log(`res : ${res}`);
        console.log(res);
        //console.log("123123123");
        const gameData = res.map((res: any) => res.data);
        gameData.sort(
          (a: any, b: any) =>
            new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime()
        );
        console.log(`gameData : ${gameData}`);
        setMatchIn(gameData);
        //console.log(matchIn);
      })
      .catch((err: any) => console.log(err));
  }, []);
  const onBtnClick = useCallback((index) => {
    history.push(`/match/${index}`);
    setModal(!modal);
    console.log(modal);
    console.log(matchIn[index]);
    setMatchIndex(matchIn[index]);
    console.log(matchIndex);
  }, []);
  //console.log(matchIn);
  return (
    <>
      <S.MainDiv>
        {matchIn.length > 0 &&
          matchIn.map((match, i) => {
            //console.log(i);
            let penaltyShootOut = false;
            const firstIsWin =
              match.matchInfo[0].matchDetail.matchResult === "승";
            const result = match.matchInfo[0].matchDetail.matchResult === "무";
            if (!result) {
              if (
                match.matchInfo[0].shoot.goalTotalDisplay ==
                match.matchInfo[1].shoot.goalTotalDisplay
              )
                penaltyShootOut = true;
            }
            return (
              <S.List ref={inputRef}>
                <S.FirstPlayer>
                  <div>{result ? "무" : "승"}</div>
                  <div></div>
                  <div>
                    {firstIsWin
                      ? match.matchInfo[0].nickname
                      : match.matchInfo[1].nickname}
                  </div>
                  <div>
                    {firstIsWin
                      ? match.matchInfo[0].shoot.goalTotalDisplay
                      : match.matchInfo[1].shoot.goalTotalDisplay}
                  </div>
                  {penaltyShootOut && (
                    <div>
                      (
                      {penaltyShootOut &&
                        (firstIsWin
                          ? match.matchInfo[0].shoot.shootOutScore
                          : match.matchInfo[1].shoot.shootOutScore)}
                      )
                    </div>
                  )}
                </S.FirstPlayer>
                <S.Vs> vs </S.Vs>
                <S.SecondPlayer>
                  {penaltyShootOut && (
                    <div>
                      (
                      {penaltyShootOut &&
                        (!firstIsWin
                          ? match.matchInfo[0].shoot.shootOutScore
                          : match.matchInfo[1].shoot.shootOutScore)}
                      )
                    </div>
                  )}
                  <div>
                    {!firstIsWin
                      ? match.matchInfo[0].shoot.goalTotalDisplay
                      : match.matchInfo[1].shoot.goalTotalDisplay}
                  </div>
                  <div>
                    {!firstIsWin
                      ? match.matchInfo[0].nickname
                      : match.matchInfo[1].nickname}
                  </div>
                  <div>{result ? "무" : "패"}</div>
                </S.SecondPlayer>
                <div>
                  {match.matchDate.split("-")[0] +
                    "-" +
                    match.matchDate.split("-")[1] +
                    "-" +
                    match.matchDate.split("-")[2].substr(0, 2)}
                </div>
                <button
                  onClick={() => {
                    onBtnClick(i);
                  }}
                >
                  상세정보
                </button>
              </S.List>
            );
          })}
      </S.MainDiv>
    </>
  );
};

export default Match;
