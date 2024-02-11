"use client";

import React, { Fragment, useRef, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { Option, Select } from "@material-tailwind/react";
import { Toaster, toast } from "sonner";

const AddQuestion = ({
  modal,
  setModal,
}: {
  modal: boolean;

  setModal: Function;
}) => {
  const [option, setOption] = useState(0);
  const cancelButtonRef = useRef(null);


  const [creds, setcreds] = useState({
    question: "",
    answerOptions: [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    difficulty : "Easy"
  });

  const addQ = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        !creds.question.trim().length ||
        !creds.answerOptions[0].answer.trim().length ||
        !creds.answerOptions[1].answer.trim().length ||
        !creds.answerOptions[2].answer.trim().length ||
        !creds.answerOptions[3].answer.trim().length
      ) {
        toast.warning("fill all the fields");
      } else {
        const set = new Set(creds.answerOptions.map((option) => option.answer));
        if (set.size < 4) {
          toast.warning("avoid duplicate answers");
        } else {
          creds.answerOptions[option].isCorrect = true;
          await axios.post("/api/question", creds);
          setModal(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
 
      <Transition.Root show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Question
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={addQ}>
                            <div className="mb-4">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Question
                              </label>
                              <input
                                type="text"
                                value={creds.question}
                                onChange={(e) =>
                                  setcreds({
                                    ...creds,
                                    question: e.target.value,
                                  })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              />
                            </div>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  1. Option
                                </label>
                                <input
                                  type="text"
                                  value={creds.answerOptions[0].answer}
                                  onChange={(e) =>
                                    setcreds({
                                      ...creds,
                                      answerOptions: [
                                        {
                                          ...creds.answerOptions[0],
                                          answer: e.target.value,
                                        },
                                        ...creds.answerOptions.slice(1),
                                      ],
                                    })
                                  }
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 
                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                              </div>

                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  2. Option
                                </label>
                                <input
                                  type="text"
                                  value={creds.answerOptions[1].answer}
                                  onChange={(e) =>
                                    setcreds({
                                      ...creds,
                                      answerOptions: [
                                        ...creds.answerOptions.slice(0, 1),
                                        {
                                          ...creds.answerOptions[1],
                                          answer: e.target.value,
                                        },
                                        ...creds.answerOptions.slice(2),
                                      ],
                                    })
                                  }
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                              </div>
                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  3. Option
                                </label>
                                <input
                                  type="text"
                                  value={creds.answerOptions[2].answer}
                                  onChange={(e) =>
                                    setcreds({
                                      ...creds,
                                      answerOptions: [
                                        ...creds.answerOptions.slice(0, 2),
                                        {
                                          ...creds.answerOptions[2],
                                          answer: e.target.value,
                                        },
                                        ...creds.answerOptions.slice(3),
                                      ],
                                    })
                                  }
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                              </div>
                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                  4. Option
                                </label>
                                <input
                                  type="text"
                                  value={creds.answerOptions[3].answer}
                                  onChange={(e) =>
                                    setcreds({
                                      ...creds,
                                      answerOptions: [
                                        ...creds.answerOptions.slice(0, 3),
                                        {
                                          ...creds.answerOptions[3],
                                          answer: e.target.value,
                                        },
                                      ],
                                    })
                                  }
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                />
                              </div>
                            </div>

                            <div className="pb-4 w-1/2 pr-2">
                            <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Difficulty?</label>
                              <Select
                                label="Select difficulty level.."
                                placeholder={""}
                                value={creds.difficulty}
                                onChange={(value: any) => setcreds({...creds, difficulty:value})}
                              >
                                <Option value="Easy">Easy</Option>
                                <Option value="Medium">Medium</Option>
                                <Option value="Hard">Hard</Option>
                              </Select>
                            </div>

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Select Correct Option
                            </label>
                            <div className="grid  place-items-center">
                              <div className="grid w-[40rem] grid-cols-4 gap-2 rounded-xl bg-gray-200 p-1">
                                <div onClick={() => setOption(0)}>
                                  <input
                                    type="radio"
                                    name="option"
                                    id="1"
                                    value="1"
                                    className="peer hidden"
                                    checked={option === 0 ? true : false}
                                    readOnly
                                  />
                                  <label
                                    htmlFor="1"
                                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                                  >
                                    1
                                  </label>
                                </div>

                                <div onClick={() => setOption(1)}>
                                  <input
                                    type="radio"
                                    name="option"
                                    id="2"
                                    value="2"
                                    className="peer hidden"
                                    checked={option === 1 ? true : false}
                                    readOnly
                                  />
                                  <label
                                    htmlFor="2"
                                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                                  >
                                    2
                                  </label>
                                </div>

                                <div onClick={() => setOption(2)}>
                                  <input
                                    type="radio"
                                    name="option"
                                    id="3"
                                    value="3"
                                    className="peer hidden"
                                    checked={option === 2 ? true : false}
                                    readOnly
                                  />
                                  <label
                                    htmlFor="3"
                                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                                  >
                                    3
                                  </label>
                                </div>

                                <div onClick={() => setOption(3)}>
                                  <input
                                    type="radio"
                                    name="option"
                                    id="4"
                                    value="3"
                                    className="peer hidden"
                                    checked={option === 3 ? true : false}
                                    readOnly
                                  />
                                  <label
                                    htmlFor="4"
                                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                                  >
                                    4
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                type="submit"
                                className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                              >
                                ADD
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddQuestion;
