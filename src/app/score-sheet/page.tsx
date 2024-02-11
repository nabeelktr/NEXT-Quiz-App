"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ScoreSheet() {
  const searchParams = useSearchParams();
  const [record, SetRecord] = useState({
    score: "",
    totalScore: "",
    time: "",
    difficulty: "Hard"
  });

  const fetchdata = () => {
    const score = searchParams.get("score");
    const totalScore = searchParams.get("total");
    const difficulty = searchParams.get("difficulty");
    const time = searchParams.get("time");

    SetRecord({
      ...record,
      score: score ? score : "",
      totalScore: totalScore ? totalScore : "",
      time: time ? time : "",
      difficulty : difficulty ? difficulty : 'Hard'
    });
    console.log(score, totalScore, record);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
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
          Your Score is : {record?.score} / {record?.totalScore}
        </Typography>

        <div className="pt-3 flex gap-4">
          <div className="text-black ">
            <p>Correct answer </p>
            <p>Wrong answer </p>
            <p>Total time taken </p>
            <p>Difficulty </p>
          </div>
          <div className="text-black font-medium">
            <p>: &nbsp;{record.score}</p>

            <p>
              : &nbsp;
              {parseInt(record?.totalScore || "0", 10) -
                parseInt(record?.score || "0", 10)}
            </p>
            <p>: &nbsp;{record?.time || ""}s</p>
            <p>: &nbsp;{record?.difficulty || ""}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-5 justify-between flex" placeholder={""}>
        <Link href={`/quiz?total=${record.totalScore}&difficulty=${record.difficulty}`}>
          <span className="inline-block float-right">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2"
              placeholder={""}
            >
              Restart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </Button>
          </span>
        </Link>

        <Link href="/">
          <span className="inline-block float-right">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2"
              placeholder={""}
            >
              Home
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
            </Button>
          </span>
        </Link>
       
      </CardFooter>
    </Card>
  );
}
