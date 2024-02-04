"use client";

import { use, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function Quiz() {

  
  const [currentQ, setCurrentQ] = useState(1);
  const [error, setError] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([
    {
      answer: "",
      isCorrect: false,
    },
  ]);
  const [choosen, setChoosen] = useState({
    answer: "",
    isCorrect: false,
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
    });
  };


  const nextQ = () => {
    if (result.isScore) {
      router.push("/");
    }
    if (choosen.answer.length) {
      selectedOptions.push(choosen);
      setShowAns(true);
      setTimeout(() => {
        setError(false);
        setShowAns(false);
        setChoosen({
          answer: "",
          isCorrect: false,
        });
        if (currentQ === totalQ) {
          let score = 0;
          selectedOptions.map((item) => {
            if (item.isCorrect) score++;
          });
          setResult({
            value: score,
            isScore: true,
          });
        }
        setCurrentQ(currentQ + 1);
      }, 1000);
    } else if (!result.isScore) {
      setError(true);
    }
  };


  const fetchdata = async () => {
    const { data } = await axios.get("/api/question");
    setList(data.questions);
    setTotalQ(data.questions.length);
  };


  useEffect(() => {
    fetchdata();
  }, []);



  return (
    <>
      {!result.isScore && (
        <Typography placeholder={""} className="pt-14 text-2xl font-medium">
          Questions {currentQ} / {totalQ}
        </Typography>
      )}
      <Card className="mt-6 w-96 bg-white" placeholder={""}>
        <CardBody placeholder={""}>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={""}
          >
            {list[currentQ - 1]?.question}
            {result.isScore && `Your Score is ${result.value} / ${totalQ}`}
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
                      showAns && item?.isCorrect && "border-green-600 border-4"
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
              onClick={nextQ}
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
    </>
  );
}
