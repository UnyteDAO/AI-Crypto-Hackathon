import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import cloneDeep from "lodash/cloneDeep";
import { useAccount } from "wagmi";

import Notification from "./Notification";
import { mintCompletionToken } from "../modules/Notion.mjs";

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
  assigns: { users: [], indexes: [] },
  skips: [],
};

const CompleteTasks = (props) => {
  const { address, isConnected } = useAccount();
  const [open, setOpen] = useState(false);
  const [mintTaskItem, setMintTaskItem] = useState(defaultTaskItem);
  const [notification, setNotification] = useState({
    header: "",
    context: "",
    isShow: false,
  });
  const [isInMintCompleteTokenProcess, setIsInMintCompleteTokenProcess] =
    useState(false);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(props.isOpen);
    const results = cloneDeep(props.taskItem);
    for (const task of results.tasks) {
      task.checked = true;
    }
    setMintTaskItem(results);
  }, [props.isOpen]);

  useEffect(() => {
    if (!open) {
      props.callback(open);
    }
  }, [open]);

  const checkHandler = (index) => {
    const results = { ...mintTaskItem };
    results.tasks[index].checked = !results.tasks[index].checked;
    setMintTaskItem(results);
  };

  const mintButtonClickHandler = async () => {
    setIsInMintCompleteTokenProcess(true);
    const result = await mintCompletionToken(address, mintTaskItem);
    if (result.txHash) {
      console.log(
        `explorer: https://mumbai.polygonscan.com/tx/${result.txHash}`
      );
    }

    setIsInMintCompleteTokenProcess(false);
    if (result.status === "success") {
      const mintedTaskItem = {...mintTaskItem};
      mintedTaskItem.status = TaskStatus.completed;
      mintedTaskItem.skips = result.skips;
      mintedTaskItem.tasks.map((task, index) => {
        console.log(index,result.skips)
        if (result.skips.includes(index)) {
          console.log("skips")
          mintedTaskItem.tasks[index].checked = false;
        }
      });

      
      props.updateStatus(mintedTaskItem);
      setNotification({
        header: "発行完了",
        context: "CompleteNFTが発行されました。",
        txHash: result.txHash,
        isShow: true,
        isSuccess: true,
        callback: setNotification,
      });
    } else {
      setNotification({
        header: "CompleteNFTの発行に失敗しました。。",
        context: result.message,
        txHash: "",
        isShow: true,
        isSuccess: false,
        callback: setNotification,
      });
    }
    props.callback(false);
    setOpen(false);
  };

  const trashClickHandler = (index, userIndex) => {
    setMintTaskItem((prev) => {
      const users = prev.assigns.indexes[index].filter((_, i) => {
        return i != userIndex;
      });
      prev.assigns.indexes[index] = users;
      return { ...prev };
    });
  };

  const cancelButtonClickHandler = () => {
    setOpen(false);
    props.callback(false);
  };

  return (
    <div className="z-50 border border-none w-screen">
      <Notification {...notification} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 w-screen"
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

          <div className="fixed inset-0 z-10 overflow-y-auto w-full">
            <div className="flex min-h-full items-end justify-center p-2 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:w-full sm:max-w-lg">
                  <div
                    className={
                      isInMintCompleteTokenProcess
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
                          Complete Tasks
                        </Dialog.Title>
                        <p className=" text-left text-sm text-gray-700">
                          完了するTaskを選択してください。
                        </p>
                        <div className="flex">
                          <div className="mt-4 text-sm font-medium text-gray-900 text-left">
                            {mintTaskItem.tasks.map((task, index) => {
                              return (
                                <>
                                  <div
                                    className="relative flex items-start"
                                    key={`CompleteTasks-${mintTaskItem.id}-dev-${task.id}-${index}`}
                                  >
                                    <div className="flex h-6 items-center">
                                      <input
                                        id={`CompleteTasks-${mintTaskItem.id}-checkbox-${index}`}
                                        aria-describedby="comments-description"
                                        name={`CompleteTasks-${mintTaskItem.id}-checkbox-${index}`}
                                        type="checkbox"
                                        onChange={() => checkHandler(index)}
                                        className={
                                          mintTaskItem.assigns.indexes[index]
                                            ?.length > 0 && task.checked && !mintTaskItem.skips.includes(index)
                                            ? "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            : "h-4 w-4 rounded border-gray-200  text-transparent focus:ring-transparent"
                                        }
                                        checked={
                                          mintTaskItem.assigns.indexes[index]
                                            ?.length > 0 && task.checked && !mintTaskItem.skips.includes(index)
                                        }
                                      />
                                    </div>
                                    <div className="ml-3 text-sm leading-6">
                                      <label
                                        htmlFor={`CompleteTasks-${mintTaskItem.id}-checkbox-${index}`}
                                        className={
                                          mintTaskItem.assigns.indexes[index]
                                            ?.length > 0 && task.checked && !mintTaskItem.skips.includes(index)
                                            ? "font-medium text-gray-900"
                                            : "font-medium text-gray-300"
                                        }
                                      >
                                        {task.name}
                                      </label>{" "}
                                    </div>
                                  </div>
                                  <div className="inline-block">
                                    {mintTaskItem.assigns.indexes[index]?.map(
                                      (user, userIndex) => {
                                        return (
                                          <div
                                            className="flex mb-1 justify-between"
                                            key={`complete-${mintTaskItem.id}-${task.id}-${index}-${user.assignUserAddress}`}
                                          >
                                            <img
                                              className={
                                                task.checked
                                                  ? "h-5 w-5 mx-2 rounded-full"
                                                  : "h-5 w-5 mx-2 rounded-full grayscale"
                                              }
                                              
                                              src={user.iconUrl}
                                            />
                                            <p
                                              className={
                                                task.checked
                                                  ? "flex"
                                                  : "flex text-gray-300"
                                              }
                                            >
                                              {user.assignUserAddress}
                                            </p>
                                            <TrashIcon
                                              className="h-5 w-5 ml-1 text-gray-600"
                                              aria-hidden="true"
                                              onClick={() => {
                                                trashClickHandler(
                                                  index,
                                                  userIndex
                                                );
                                              }}
                                            />
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </>
                              );
                            })}
                          </div>
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

export default CompleteTasks;
