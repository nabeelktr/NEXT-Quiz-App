"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { RiseLoader } from "react-spinners";
import Router from "next/router";
import { useBeforeUnload } from "react-use";
import { toast } from "sonner";

export default function Quiz(
  isConfirm = true,
  message = "Are you sure want to leave this page?"
) {
  const [timer, setTimer] = useState<number>(0);
  const [timerval, setTimerval] = useState(0);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(1);
  const [error, setError] = useState(false);
  const [diffLevel, setDiffLevel] = useState("")
  const [selectedOptions, setSelectedOptions] = useState([
    {
      answer: "",
      isCorrect: false,
      time: timerval,
    },
  ]);
  const [choosen, setChoosen] = useState({
    answer: "",
    isCorrect: false,
    time: timerval,
  });
  const [showAns, setShowAns] = useState(false);
  const [result, setResult] = useState({
    value: 0,
    isScore: false,
  });
  const [list, setList] = useState([
    {
      question: "",
      answerOptions: [{ answer: "", isCorrect: false }],
    },
  ]);
  const [totalQ, setTotalQ] = useState(0);
  const router = useRouter();

  const qChoosen = ({
    answer,
    isCorrect = false,
  }: {
    answer: string;
    isCorrect?: boolean;
  }) => {
    setChoosen({
      answer: answer,
      isCorrect: isCorrect,
      time: timerval - timer,
    });
  };

  const nextQ = (val = false) => {
    if (result.isScore) {
      router.push("/");
    }
    if (choosen.answer.length || val) {
      const answerObject =
        val === true
          ? { answer: "not attempted", isCorrect: false, time: timerval }
          : choosen;
      selectedOptions.push(answerObject);
      val === true && toast.warning("Not attempted");

      setShowAns(true);
      setTimeout(() => {
        setError(false);
        setShowAns(false);
        setChoosen({
          answer: "",
          isCorrect: false,
          time: timerval,
        });
        if (currentQ === totalQ) {
          calculateScore();
        }
        setCurrentQ(currentQ + 1);

        setTimer(timerval);
      }, 2000);
    } else if (!result.isScore) {
      setError(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    let time = 0;
    selectedOptions.map((item) => {
      if (item.isCorrect) score++;
      time += item.time;
    });
    console.log(selectedOptions);
    setResult({
      value: score,
      isScore: true,
    });
    const difficulty = searchParams.get("difficulty");
    router.push(
      `/score-sheet?score=${score}&total=${totalQ}&time=${time}&difficulty=${difficulty}`
    );
    // setCurrentQ(currentQ + 1);
  };

  const fetchdata = async () => {
    const total = searchParams.get("total");
    const difficulty = searchParams.get("difficulty");
    setDiffLevel(difficulty ? difficulty : '')
    setLoading(true);
    const { data } = await axios.get(
      `/api/question?total=${total}&difficulty=${difficulty}`
    );
    const timer =
      difficulty === "Easy" ? 30 : difficulty === "Medium" ? 20 : 10;
    setTimerval(timer);
    setTimer(timer);
    setList(data.questions);
    setLoading(false);
    setTotalQ(data.questions.length);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  useEffect(() => {
    let interval: any;
    if (list.length !== 1) {
      interval = setInterval(() => {
        if (timer !== 0 && !showAns && !result.isScore) {
          setTimer((prev): any => prev - 1);
        }

        // else if(!choosen.answer.length ){
        //   selectedOptions.push({answer: "", isCorrect: false, time: timerval - timer})
        //   if (currentQ === totalQ) {
        //     calculateScore()
        //    }else{
        //     setShowAns(true)
        //     setTimeout(()=> {
        //       setShowAns(false)
        //       setCurrentQ(currentQ + 1);
        //       setTimer(timerval)

        //     },2000)
        //     setChoosen({
        //       answer: "",
        //       isCorrect: false,
        //       time: timerval - timer
        //     });
        //    }
        // }
        else if (!choosen.answer.length) {
          clearInterval(interval);
          nextQ(true);
          
        } else if (!showAns && timer === 0) {
          clearInterval(interval);
          nextQ();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useBeforeUnload(isConfirm, message);

  useEffect(() => {
    const confirmUnload = (event: any) => {
      if (isConfirm && !window.confirm(message)) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    const handleRouteChangeStart = (url: any) => {
      if (isConfirm && !window.confirm(message)) {
        Router.events.emit("routeChangeError", new Error("Route Canceled"));
        throw "Route Canceled";
      }
    };

    window.addEventListener("beforeunload", confirmUnload);
    Router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      window.removeEventListener("beforeunload", confirmUnload);
      Router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [isConfirm, message]);

  if(currentQ > totalQ){
    return(
      <RiseLoader color="#000000" className="pt-20" size={15} />
    )
  }
  return (
    <>
      {!result.isScore && !loading && (
        <Typography
          placeholder={""}
          className="animate-slidein700 opacity-0 pt-14 text-2xl font-medium"
        >
          Questions {currentQ} / {totalQ}
        </Typography>
      )}
      {loading ? (
        <RiseLoader color="#000000" className="pt-20" size={15} />
      ) : (
        <div className="flex gap-6">
          <Card
            className="animate-slidein300 opacity-0 mt-6 w-96 bg-white"
            placeholder={""}
          >
            <CardBody placeholder={""}>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2"
                placeholder={""}
              >
                {list[currentQ - 1]?.question ?? ""}
              </Typography>
              <div className="pt-3">
                <form className="grid   grid-cols-1 gap-2 items-center p-2">
                  {error && !choosen.answer.length && (
                    <p className="text-red-400 text-xs">
                      Please Choose an option.{" "}
                    </p>
                  )}
                  {list[currentQ - 1]?.answerOptions.map((item, i) => (
                    <div
                      className="relative md:shadow-sm md:mb-2"
                      key={i}
                      onClick={() => qChoosen(item)}
                    >
                      <input
                        className="peer hidden"
                        id={`radio_${i}`}
                        type="radio"
                        name="address"
                      />
                      {/* <span className="absolute right-4 top-1/2 box-content block md:h-1 md:w-1 -translate-y-1/2 rounded-full md:border-8  border-gray-300 bg-white peer-checked:border-[#ff3c67] "></span> */}
                      <label
                        className={`flex cursor-pointer flex-col rounded-lg border border-gray-300 md:p-4 p-2  ${
                          choosen.answer === item.answer &&
                          "border-gray-600 border-4"
                        } ${
                          choosen.answer === item.answer &&
                          showAns &&
                          !item?.isCorrect &&
                          "border-red-400 border-4"
                        } ${
                          showAns &&
                          item?.isCorrect &&
                          "border-green-600 border-4"
                        }`}
                        htmlFor={`radio_${i}`}
                      >
                        <span className="md:text-xs text-[0.5rem] font-semibold uppercase text-black ">
                          {item.answer}
                        </span>
                      </label>
                    </div>
                  ))}
                </form>
              </div>
            </CardBody>
            <CardFooter className="pt-0 " placeholder={""}>
              <a href="#" className="inline-block float-right">
                <Button
                  size="sm"
                  variant="text"
                  className="flex items-center gap-2"
                  placeholder={""}
                  onClick={() => nextQ()}
                  disabled={showAns}
                >
                  {currentQ < totalQ
                    ? "Next"
                    : currentQ === totalQ
                    ? "Submit"
                    : "Home"}
                  {currentQ !== totalQ && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  )}
                </Button>
              </a>
            </CardFooter>
          </Card>
          <div>

          <Card
              className="animate-slidein300 opacity-0 w-32 mt-6  bg-white"
              placeholder={""}
            >
              <CardBody placeholder={""}>
                <div className="items-center justify-center flex ">
                  <p className={`text-xl font-medium uppercase  ${diffLevel.toLocaleLowerCase() === "hard" ? "text-red-400" :diffLevel === "Medium" ? 'text-orange-400' : 'text-green-400' }`}>{diffLevel}</p>
                </div>
              </CardBody>
            </Card>

            <Card
              className="animate-slidein300 opacity-0 w-32 mt-6 h-36 bg-white"
              placeholder={""}
            >
              <CardBody placeholder={""}>
                <div className="items-center justify-center flex flex-col">
                  <p className="text-xl font-medium pb-4 text-black ">Timer</p>
                  <span className="countdown font-mono text-6xl">
                    <span
                      className={
                        timer <= 5
                          ? "text-red-400"
                          : timer <= 10
                          ? "text-orange-400"
                          : ""
                      }
                      style={{ "--value": timer - 1 } as React.CSSProperties}
                    >
                      {timer}
                    </span>
                  </span>
                </div>
              </CardBody>
            </Card>

          </div>
        </div>
      )}
    </>
  );
}
