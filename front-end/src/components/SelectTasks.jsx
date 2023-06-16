import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import cloneDeep from "lodash/cloneDeep";
import { useAccount } from "wagmi";

import Notification from "./Notification";
import { mintAssignToken } from "../modules/Notion.mjs";

const TaskStatus = Object.freeze({
  active: 1,
  fixed: 2,
  completed: 3,
});

const defaultTaskItem = {
  id: "",
  guildId: "",
  channel: "",
  messageId: "",
  summary: "",
  tasks: [],
  date: "",
  status: TaskStatus.active,
};

const SelectTasks = (props) => {
  const { address, isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const [mintTaskItem, setMintTaskItem] = useState(defaultTaskItem);
  const [notification, setNotification] = useState({
    header: "",
    context: "",
    isShow: false,
  });
  const [isInMintAssignTokenProcess, setIsInMintAssignTokenProcess] = useState(false);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(props.isOpen);
    const results = cloneDeep(props.taskItem);
    for (const task of results.tasks) {
      task.checked = true;
    }
    setMintTaskItem(results);
  }, [props.isOpen]);

  useEffect(() =>{
    if(!open){
      props.callback(open);
    }
  },[open])

  const checkHandler = (index) => {
    const results = { ...mintTaskItem };
    results.tasks[index].checked = !results.tasks[index].checked;
    setMintTaskItem(results);
  };

  const mintButtonClickHandler = async () => {
    setIsInMintAssignTokenProcess(true);
    const result = await mintAssignToken(address, mintTaskItem);
    if (result.txHash) {
      console.log(`explorer: https://mumbai.polygonscan.com/tx/${result.txHash}`);
    }

    setIsInMintAssignTokenProcess(false);
    if (result.status === "success") {
      props.updateStatus(TaskStatus.fixed);
      setNotification({
        header: "発行完了",
        context: "アサインNFTが発行されました。",
        txHash: result.txHash,
        isShow: true,
        isSuccess: true,
        callback: setNotification,
      });
    } else {
      setNotification({
        header: "アサインNFTの発行に失敗しました。。",
        context: result.message,
        txHash: "",
        isShow: true,
        isSuccess: false,
        callback: setNotification,
      });
    }
    setOpen(false);
  };

  const cancelButtonClickHandler = () => {
    setOpen(false);
  };

  return (
    <div className="z-50 border border-none">
      <Notification {...notification} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
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

          <div className="fixed inset-0 z-10 overflow-y-auto">
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
                  <div
                    className={
                      isInMintAssignTokenProcess
                        ? "relative flex justify-center h-0 top-3"
                        : "relative hidden justify-center h-0 top-3"
                    }
                    aria-label="読み込み中"
                  >
                    <div className="animate-spin h-8 w-8 border-4 border-blue-400 rounded-full border-t-transparent"></div>
                  </div>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <QuestionMarkCircleIcon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-semibold leading-6 text-gray-900"
                        >
                          Select Tasks
                        </Dialog.Title>
                        <p className=" text-left text-sm text-gray-700">
                          NFT化するTaskを選択してください。
                        </p>
                        <div className="mt-4 text-sm font-medium text-gray-900 text-left">
                          {mintTaskItem.tasks.map((task, index) => {
                            return (
                              <div
                                className="relative flex items-start"
                                key={`SelectTasks-${mintTaskItem.id}-dev-${index}`}
                              >
                                <div className="flex h-6 items-center">
                                  <input
                                    id={`SelectTasks-${mintTaskItem.id}-checkbox-${index}`}
                                    aria-describedby="comments-description"
                                    name={`SelectTasks-${mintTaskItem.id}-checkbox-${index}`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    onChange={() => checkHandler(index)}
                                    checked={task.checked}
                                  />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                  <label
                                    htmlFor={`SelectTasks-${mintTaskItem.id}-checkbox-${index}`}
                                    className="font-medium text-gray-900"
                                  >
                                    {task.name}
                                  </label>{" "}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={mintButtonClickHandler}
                    >
                      Mint
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={cancelButtonClickHandler}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default SelectTasks;
