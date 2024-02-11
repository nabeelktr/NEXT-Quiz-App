"use client";

import { useState } from "react";
import { Button, Card, CardBody, CardFooter, Option, Select } from "@material-tailwind/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function Category() {
    const router = useRouter()
  const [numOfQuestions, setNumOfQuestions] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleclick = () => {

    if(!numOfQuestions.length || !difficulty.length ){
        toast.warning('Please select all the fields',{
            position: 'top-center',
          })
    }else{
        router.replace(`/quiz?total=${numOfQuestions}&difficulty=${difficulty}`)
    }
  }

  return (
    <Card
      className="animate-slidein300 opacity-0 mt-20 w-4/12 bg-white"
      placeholder={""}
    >
      <CardBody placeholder={""}>
        <div className="w-full gap-4 flex flex-col text-black">
          <div className="flex flex-col gap-3">
            <label >1. Total Number of questions?</label>
            <Select
            label="Select number.."
            placeholder={""}
            value={numOfQuestions}
            onChange={(value : any) =>
                setNumOfQuestions(value)}
          >
              <Option value="5">5</Option>
              <Option value="6">6</Option>
              <Option value="7">7</Option>
              <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="">2. Difficulty?</label>
            <Select
            label="Select difficulty level.."
            placeholder={""}
            value={difficulty}
            onChange={(value : any) => setDifficulty(value)}
          >
              <Option value="Easy">Easy</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Hard">Hard</Option>
            </Select>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0 " placeholder={""}>
            <a href="#" className="inline-block float-right">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2"
                placeholder={""}
                onClick={handleclick}

              >
                Continue
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
            </a>

          </CardFooter>
    </Card>
  );
}
