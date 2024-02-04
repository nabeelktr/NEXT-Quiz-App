"use client"

import React, { Fragment, useRef, useState } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'




const AddQuestion = ({ modal, setModal } : {
    modal : boolean,

    setModal : Function

}) => {

  const cancelButtonRef = useRef(null)

  const [creds, setcreds] = useState({
    question : '',
    answerOptions : [
      {answer : ''},
      {answer : ''},
      {answer : ''},
      {answer : ''}
    ]
  })

  const addQ = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if(!creds.question.trim().length || !creds.answerOptions[0].answer.trim().length || !creds.answerOptions[1].answer.trim().length || !creds.answerOptions[2].answer.trim().length
        || !creds.answerOptions[3].answer.trim().length){
          alert('fill all fields')
        }else{
          await axios.post('/api/question', creds)
          setModal(false)
        }
    } catch (err) {
      console.log(err);
    }

  }


  return (
    <>

      <Transition.Root show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => setModal(false)}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">

                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Add Question
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={addQ}>
                              <div className='mb-4'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Question</label>
                                <input type="text"
                                  
                                  value={creds.question}
                                  onChange={(e) => setcreds({ ...creds, question: e.target.value })}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                              </div>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">1. Option</label>
                                <input type="text"
                                  
                                  value={creds.answerOptions[0].answer}
                                  onChange={(e) => setcreds({ ...creds,answerOptions: [
                                    {...creds.answerOptions[0], answer: e.target.value },
                                    ...creds.answerOptions.slice(1)
                                  ] 
                                })}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                              </div>
                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">2. Option</label>
                                <input type="text"
                                  value={creds.answerOptions[1].answer}
                                  onChange={(e) => setcreds({ ...creds,answerOptions: [
                                    ...creds.answerOptions.slice(0, 1),
                                    {...creds.answerOptions[1], answer: e.target.value },
                                    ...creds.answerOptions.slice(2)
                                  ] 
                                })}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                              </div>
                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">3. Option</label>
                                <input type="text"
                                  value={creds.answerOptions[2].answer}
                                  onChange={(e) => setcreds({ ...creds,answerOptions: [
                                    ...creds.answerOptions.slice(0, 2),
                                    {...creds.answerOptions[2], answer: e.target.value },
                                    ...creds.answerOptions.slice(3)
                                  ] 
                                })}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                              </div>
                              <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">4. Option</label>
                                <input type="text"
                                  value={creds.answerOptions[3].answer}
                                  onChange={(e) => setcreds({ ...creds,answerOptions: [
                                    ...creds.answerOptions.slice(0, 3),
                                    {...creds.answerOptions[3], answer: e.target.value },

                                  ] 
                                })}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
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
  )
}

export default AddQuestion