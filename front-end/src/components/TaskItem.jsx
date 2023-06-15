import { useEffect, useState } from "react";
import {
  HandRaisedIcon,
  PlayIcon,
  TrophyIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useAccount } from "wagmi";

import {
  addAssign,
  mintAssignToken,
  mintCompletionToken,
} from "../modules/Notion.mjs";

const defaultTaskItem = {
  id: "",
  guildId: "",
  channel: "",
  messageId: "",
  summary: "",
  tasks: [],
  date: "",
};

import Notification from "./Notification";

const TaskItem = (props) => {
  const { address, isConnected } = useAccount();
  const [taskItem, setTaskItem] = useState(defaultTaskItem);
  const [notification, setNotification] = useState({
    header: "",
    context: "",
    isShow: false,
  });
  const [isInProcess, setIsInProcess] = useState(false);

  useEffect(() => {
    setTaskItem((prev) => ({ ...prev, ...props }));
  }, []);

  const checkHandler = (index) => {
    const results = {...taskItem};
    results.tasks[index].checked = !results.tasks[index].checked;
    setTaskItem(results);
  };

  const assignHandler = async (event) => {
    event.preventDefault();
    if (!isConnected) {
      showRequestConnectWallet();
      return;
    }

    try {
      setIsInProcess(true);
      await addAssign(address, taskItem);
      setIsInProcess(false);
      setNotification({
        header: "登録が完了しました。",
        context:
          "後ほどアサイントークンが発行されます。活動へのご協力ありがとうございます。",
        isShow: true,
        isSuccess: true,
        callback: setNotification,
      });
    } catch (error) {
      setNotification({
        header: "登録に失敗しました。",
        context: error.message,
        isShow: true,
        isSuccess: false,
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

    try {
      setIsInProcess(true);
      await mintAssignToken(address, taskItem);
      setIsInProcess(false);
      setNotification({
        header: "Mintが完了しました。",
        context:
          "後ほどアサイントークンが発行されます。活動へのご協力ありがとうございます。",
        isShow: true,
        isSuccess: true,
        callback: setNotification,
      });
    } catch (error) {
      setNotification({
        header: "Mintに失敗しました。",
        context: error.message,
        isShow: true,
        isSuccess: false,
        callback: setNotification,
      });
    }
  };

  const mintCompletionTokenHandler = async (event) => {
    event.preventDefault();
    if (!isConnected) {
      showRequestConnectWallet();
      return;
    }

    try {
      setIsInProcess(true);
      await mintCompletionToken(address, taskItem);
      setIsInProcess(false);
      setNotification({
        header: "Mintが完了しました。",
        context:
          "後ほどアサイントークンが発行されます。活動へのご協力ありがとうございます。",
        isShow: true,
        isSuccess: true,
        callback: setNotification,
      });
    } catch (error) {
      setNotification({
        header: "Mintに失敗しました。",
        context: error.message,
        isShow: true,
        isSuccess: false,
        callback: setNotification,
      });
    }
  };

  const showRequestConnectWallet = () => {
    setNotification({
      header: "ウォレットの接続が必要です。",
      context: "右上の [ Connect Wallet ] から接続してください。",
      isShow: true,
      isSuccess: false,
      callback: setNotification,
    });
  };

  return (
    <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      <Notification {...notification} />
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
                  <input
                    id={`taskitem-${taskItem.id}-checkbox-${index}`}
                    aria-describedby="comments-description"
                    name={`taskitem-${taskItem.id}-checkbox-${index}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={() => checkHandler(index)}
                    checked={task.checked}
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label
                    htmlFor={`taskitem-${taskItem.id}-checkbox-${index}`}
                    className="font-medium text-gray-900"
                  >
                    {task.name}
                  </label>{" "}
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
        <div
          className={
            isInProcess
              ? "relative flex justify-center h-0 top-3"
              : "relative hidden justify-center h-0 top-3"
          }
          aria-label="読み込み中"
        >
          <div className="animate-spin h-8 w-8 border-4 border-blue-400 rounded-full border-t-transparent"></div>
        </div>

        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href="#"
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              onClick={assignHandler}
            >
              <HandRaisedIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              やるよ！
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href="#"
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              onClick={mintAssignTokenHandler}
            >
              <PlayIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              お願い！
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href="#"
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
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
