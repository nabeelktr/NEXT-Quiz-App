"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddQuestion from "../component/AddQuestion";

export default function Questions() {
  const [list, setList] = useState([
    {
      _id: "",
      question: "",
      answerOptions: [{ answer: "", isCorrect: false }],
    },
  ]);

  const [modal, setModal] = useState(false);

  const router = useRouter();

  const fetchdata = async () => {
    const { data } = await axios.get("/api/question");
    setList(data.questions);
  };

  const signout = async () => {
    await axios.get("/api/signout");
    router.push("/instructor");
  };

  const deleteQ = async (id: any, i: any) => {
    let deleted = list.splice(i, 1);
    let filtered = list.filter((list) => {
      return list !== deleted[0];
    });
    setList(filtered);
    await axios.delete(`/api/question/${id}`);
  };

  const addQuestion = () => {
    setModal(true);
  };

  useEffect(() => {
    fetchdata();
  }, [modal]);

  return (
    <>
      <div className="w-full max-w-2xl p-6 mt-10 bg-white border border-gray-200 rounded-xl  sm:p-6 dark:bg-white dark:border-white shadow-2xl">
        <div className="justify-between flex">
          <h1 className="mb-3 text-base font-bold text-gray-900 md:text-2xl dark:text-zinc-800">
            📝 Questions List
          </h1>
          <button
            onClick={signout}
            className="bg-transparent hover:bg-black text-black font-semibold hover:text-white -py-[4rem] px-4 border border-gray-500 hover:border-transparent rounded text-xs"
          >
            Sign Out
          </button>
        </div>

        <ul className="my-4 space-y-1 p-6   sortable-list text-xs ">
          {list.map((item, i) => (
            <div key={item.question}>
              <li className=" opacity-100  ">
                <p className="flex p-4 text-base font-bold text-gray-800 rounded-lg overflow-hidden   group hover:shadow  dark:bg-gray-700 dark:hover:bg-zinc-300 dark:text-white dark:hover:text-black justify-between">
                  <span className="flex text-sm">
                    {i + 1}. <span className="ml-2 ">{item.question}</span>
                  </span>

                  <span
                    className="svg-icon svg-icon-primary svg-icon-2x "
                    title="Delete"
                    onClick={() => {
                      var result = confirm("Want to delete?");
                      if (result) {
                        deleteQ(item._id, i);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <path
                          d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z"
                          fill="#dc3545"
                          className="hover:fill-slate-300 cursor-pointer  "
                          fillRule="nonzero"
                        />

                        <path
                          d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z"
                          fill="#dc3545"
                          className=" hover:fill-slate-300 cursor-pointer "
                          fillRule="nonzero"
                        />
                      </g>
                    </svg>
                  </span>
                </p>
              </li>
            </div>
          ))}
        </ul>
        <div>{modal && <AddQuestion modal={modal} setModal={setModal} />}</div>

        <button
          onClick={addQuestion}
          type="button"
          className="mt-6 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          ADD Question
        </button>
      </div>
    </>
  );
}
