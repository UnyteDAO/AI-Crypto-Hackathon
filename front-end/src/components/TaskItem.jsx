import { useEffect, useState } from "react";
import {
  HandRaisedIcon,
  PlayIcon,
  TrophyIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";

import { addAssign } from "../modules/Notion.mjs";

import Notification from "./Notification";
import SelectTasks from "./SelectTasks";
import CompleteTasks from "./CompleteTasks";

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

const TaskItem = (props) => {
  const { address, isConnected } = useAccount();
  const [taskItem, setTaskItem] = useState(defaultTaskItem);
  const [notification, setNotification] = useState({
    header: "",
    context: "",
    isShow: false,
  });

  const [isInAssignProcess, setIsInAssignProcess] = useState(false);
  const [isInMintAssignTokenProcess, setIsInMintAssignTokenProcess] =
    useState(false);
  const [isInMintCompleteTokenProcess, setIsInMintCompleteTokenProcess] =
    useState(false);

  useEffect(() => {
    setTaskItem((prev) => ({ ...prev }, { ...props }));
  }, []);

  const checkHandler = (index) => {
    const results = { ...taskItem };
    results.tasks[index].checked = !results.tasks[index].checked;
    setTaskItem(results);
  };

  const assignHandler = async (event) => {
    event.preventDefault();
    if (!isConnected) {
      showRequestConnectWallet();
      return;
    }

    if (taskItem.status >= TaskStatus.fixed) {
      return;
    }

    try {
      setIsInAssignProcess(true);

      const isSomeChecked = taskItem.tasks.some((task) => {
        return task.checked;
      });

      const result = await addAssign(address, taskItem);
      const icon =
        result.length !== 0
          ? result[0].iconUrl
          : "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg";

      setTaskItem((prev) => {
        let result = { ...prev };
        const isAssigned = result.assigns.users.find((user) => {
          return user.assignUserAddress == address;
        });

        if (!isAssigned) {
          const tasksIndexes = taskItem.tasks
            .map((task, index) => {
              if (task.checked) {
                return index;
              }
            })
            .filter((item) => item != undefined);

          result.assigns.users = [
            ...prev.assigns.users,
            {
              assignUserAddress: address,
              tasksIndexes: tasksIndexes,
              iconUrl: icon
            },
          ];
        } else {
          //result.assigns.users = [];
        }


        let indexes = {};
        if (result.assigns.users) {
          result.assigns.users.forEach((item) => {
            item.tasksIndexes?.forEach((index) => {
              if (!indexes[index]) {
                indexes[index] = [];
              }
              indexes[index] = [
                ...indexes[index],
                {
                  assignUserAddress: item.assignUserAddress,
                  iconUrl: item.iconUrl,
                  name: item.name,
                },
              ];
            });
          });
        }

        result.assigns.indexes = indexes;

        if (!isSomeChecked) {
          result.assigns.users = result.assigns.users.filter(
            (item) => item.assignUserAddress != address
          );
        }
        return result;
      });

      setIsInAssignProcess(false);

      if (!isSomeChecked) {
        setNotification({
          header: "アサインが取り消されました。",
          context:
            "選択されているタスクがない為、アサインが取り消されています。",
          isShow: true,
          isSuccess: true,
          txHash: "",
          callback: setNotification,
        });
        return;
      }

      setNotification({
        header: "アサインが完了しました。",
        context:
          "後ほどアサインNFTが発行されます。活動へのご協力ありがとうございます。",
        isShow: true,
        isSuccess: true,
        txHash: "",
        callback: setNotification,
      });
    } catch (error) {
      setNotification({
        header: "アサインに失敗しました。",
        context: error.message,
        isShow: true,
        isSuccess: false,
        txHash: "",
        callback: setNotification,
      });
    }
  };

  const mintAssignTokenHandler = async (event) => {
    event.preventDefault();
    if (!isConnected) {
      showRequestConnectWallet();
      return;
    }

    if (taskItem.status >= TaskStatus.fixed) {
      return;
    }

    try {
      setIsInMintAssignTokenProcess(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const mintCompletionTokenHandler = async (event) => {
    event.preventDefault();
    if (!isConnected) {
      showRequestConnectWallet();
      return;
    }

    if (taskItem.status !== TaskStatus.fixed) {
      return;
    }

    try {
      setIsInMintCompleteTokenProcess(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const showRequestConnectWallet = () => {
    setNotification({
      header: "ウォレットの接続が必要です。",
      context: "右上の [ Connect Wallet ] から接続してください。",
      isShow: true,
      isSuccess: false,
      txHash: "",
      callback: setNotification,
    });
  };

  const updateStatus = (mintedTaskItem) => {
    const item = { ...mintedTaskItem };
    item.tasks = [...taskItem.tasks];
    setTaskItem(item);
  };

  return (
    <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-lg">
      <Notification {...notification} />
      <SelectTasks
        isOpen={isInMintAssignTokenProcess}
        callback={setIsInMintAssignTokenProcess}
        taskItem={taskItem}
        updateStatus={updateStatus}
      />
      <CompleteTasks
        isOpen={isInMintCompleteTokenProcess}
        callback={setIsInMintCompleteTokenProcess}
        taskItem={taskItem}
        updateStatus={updateStatus}
      />

      <div
        className={
          taskItem.status === TaskStatus.active
            ? "bg-blue-800 px-4 m-0"
            : taskItem.status === TaskStatus.fixed
            ? "bg-red-800 px-4 m-0"
            : taskItem.status === TaskStatus.completed
            ? "bg-green-800 px-4 m-0"
            : ""
        }
      >
        <p className="text-sm font-medium leading-6 text-gray-50">Assign</p>
        <div className="flex items-center gap-x-2">
          <div className="mb-2">
            <span className="text-4xl font-semibold text-white">
              {taskItem.assigns.users.length}
            </span>
          </div>
          <div className="items-center ml-2 break-all">
            {taskItem.assigns.users.map((user) => {
              return (
                <div
                  className="flex items-center mb-1"
                  key={`asign-p-${taskItem.id}-${user.assignUserAddress}`}
                >
                  <img
                    className={
                      address === user.assignUserAddress
                        ? "w-5 h-5 m-y-auto mr-2 rounded-full"
                        : "w-5 h-5 m-y-auto mr-2 rounded-full"
                    }
                    src={
                      user.iconUrl === ""
                        ? "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
                        : user.iconUrl
                    }
                  />
                  <p
                    className={
                      address === user.assignUserAddress
                        ? "text-left text-sm text-gray-100 break-all"
                        : "text-left text-xs text-gray-400 break-all"
                    }
                  >
                    {user.assignUserAddress}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex justify-between">
          <div className="sr-only">Channel</div>
          <div className="flex text-sm text-gray-500">{taskItem.channel}</div>
          {/* <div className="flex text-sm text-gray-500">{taskItem.guildId}</div> */}
          <div className="sr-only">Date</div>
          <div className="flex text-sm text-gray-500">
            {new Date(taskItem.date).toLocaleString()}
          </div>
        </div>

        <div className="mt-4 text-sm font-medium text-gray-900 text-left">
          {taskItem.tasks.map((task, index) => {
            return (
              <div
                className="relative flex items-start"
                key={`taskitem-${taskItem.id}-dev-${index}`}
              >
                <div className="flex h-6 items-center">
                  {taskItem.status === TaskStatus.active ? (
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      id={`taskitem-${taskItem.id}-checkbox-${index}`}
                      aria-describedby="comments-description"
                      name={`taskitem-${taskItem.id}-checkbox-${index}`}
                      type="checkbox"
                      onChange={() => checkHandler(index)}
                      checked={task.checked}
                      disabled={taskItem.status >= TaskStatus.fixed}
                    />
                  ) : taskItem.status === TaskStatus.fixed ? (
                    <PlayIcon
                      className={
                        task.checked && !taskItem.skips.includes(index)
                          ? "h-4 w-4 text-red-500"
                          : "h-4 w-4 text-transparent"
                      }
                      aria-hidden="true"
                    />
                  ) : taskItem.status === TaskStatus.completed ? (
                    <TrophyIcon
                      className={
                        task.checked && !taskItem.skips.includes(index)
                          ? "h-4 w-4 text-green-700"
                          : "h-4 w-4 text-transparent"
                      }
                      aria-hidden="true"
                    />
                  ) : null}

                  {/* <input
                    id={`taskitem-${taskItem.id}-checkbox-${index}`}
                    aria-describedby="comments-description"
                    name={`taskitem-${taskItem.id}-checkbox-${index}`}
                    type="checkbox"
                    className={
                      taskItem.status === TaskStatus.active
                        ? "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        : taskItem.status === TaskStatus.fixed
                        ? "h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                        : taskItem.status === TaskStatus.completed
                        ? "h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                        : ""
                    }
                    onChange={() => checkHandler(index)}
                    checked={task.checked}
                    disabled={taskItem.status >= TaskStatus.fixed}
                  /> */}
                </div>
                <div className="flex w-full justify-between">
                  <div className="ml-3 text-sm leading-6 w-10/12">
                    <label
                      htmlFor={`taskitem-${taskItem.id}-checkbox-${index}`}
                      className={
                        task.checked || taskItem.status == TaskStatus.active
                          ? "font-medium text-gray-900"
                          : "font-medium text-gray-400"
                      }
                    >
                      {task.name}
                    </label>{" "}
                  </div>
                  <div className="flex w-3/12 justify-end">
                    <span
                      className={
                        task.type == "開発"
                          ? "ml-3 inline-flex max-h-5 items-center rounded-lg bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600 ring-1 ring-inset ring-red-500/10"
                          : task.type == "デザイン"
                          ? "ml-3 inline-flex max-h-5 items-center rounded-lg bg-red-100 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-orange-500/10"
                          : task.type == "BizDev"
                          ? "ml-3 inline-flex max-h-5 items-center rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-500/10"
                          : task.type == "コミュニティ"
                          ? "ml-3 inline-flex max-h-5 items-center rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/10"
                          : task.type == "マーケティング"
                          ? "ml-3 inline-flex max-h-5 items-center rounded-lg bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10"
                          : task.type == "営業"
                          ? "ml-3 inline-flex max-h-5 items-center rounded-lg bg-cyan-100 px-2 py-1 text-xs font-medium text-cyan-600 ring-1 ring-inset ring-cyan-500/10"
                          : "ml-3 inline-flex max-h-5 items-center rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                      }
                    >
                      {task.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-xs font-medium text-gray-900 text-left">
          {taskItem.summary}
        </div>
      </div>

      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div
            className={
              taskItem.status === TaskStatus.active
                ? "flex w-0 flex-1"
                : taskItem.status === TaskStatus.fixed
                ? "flex w-0 flex-1 bg-gray-200"
                : taskItem.status === TaskStatus.completed
                ? "flex w-0 flex-1 bg-gray-200"
                : ""
            }
          >
            <a
              href="#"
              className={
                taskItem.status === TaskStatus.active
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  : taskItem.status === TaskStatus.fixed
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  : taskItem.status === TaskStatus.completed
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  : ""
              }
              onClick={assignHandler}
            >
              <HandRaisedIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <div className="absolute">
                <div
                  className={
                    isInAssignProcess ? "relative m-auto" : "relative hidden"
                  }
                  aria-label="読み込み中"
                >
                  <div className="animate-spin h-8 w-8 border-4 border-blue-400 rounded-full border-t-transparent"></div>
                </div>
              </div>
              やるよ！
            </a>
          </div>
          <div
            className={
              taskItem.status === TaskStatus.active
                ? "-ml-px flex w-0 flex-1"
                : taskItem.status === TaskStatus.fixed
                ? "-ml-px flex w-0 flex-1 bg-gray-200"
                : taskItem.status === TaskStatus.completed
                ? "-ml-px flex w-0 flex-1 bg-gray-200"
                : ""
            }
          >
            <a
              href="#"
              className={
                taskItem.status === TaskStatus.active
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  : taskItem.status === TaskStatus.fixed
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  : taskItem.status === TaskStatus.completed
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  : ""
              }
              onClick={mintAssignTokenHandler}
            >
              <PlayIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              お願い！
            </a>
          </div>
          <div
            className={
              taskItem.status === TaskStatus.active
                ? "-ml-px flex w-0 flex-1 bg-gray-200"
                : taskItem.status === TaskStatus.fixed
                ? "-ml-px flex w-0 flex-1"
                : taskItem.status === TaskStatus.completed
                ? "-ml-px flex w-0 flex-1 bg-gray-200"
                : ""
            }
          >
            <a
              href="#"
              className={
                taskItem.status === TaskStatus.active
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  : taskItem.status === TaskStatus.fixed
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  : taskItem.status === TaskStatus.completed
                  ? "relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-400 cursor-not-allowed"
                  : ""
              }
              onClick={mintCompletionTokenHandler}
            >
              <TrophyIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              ありがとう！
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
