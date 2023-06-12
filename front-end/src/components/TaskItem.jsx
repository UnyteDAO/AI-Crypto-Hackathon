import { EnvelopeIcon, PhoneIcon,HandRaisedIcon,PlayIcon,TrophyIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const defaultTaskItem = {
  channel: "",
  summary: "",
  tasks: [],
  date: "2023-06-02T10:00:00",
};

const TaskItem = (props) => {
  const [taskItem, setTaskItem] = useState(defaultTaskItem);

  useEffect(() => {
    setTaskItem((prev) => ({ ...prev, ...props }));
  }, []);

  return (
    <div className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
      <div className="flex flex-1 flex-col p-6">
        <div className="mt-2 text-sm font-medium text-gray-900 text-left">
          {taskItem.summary}
        </div>
        <div className="mt-4 text-sm font-medium text-gray-900 text-left">
          {taskItem.tasks.map((task,index)=>{
            return (
            <div key={index}>
              <input className="mr-2 mb-2" type="checkbox" name="tasks"/>
              <label htmlFor="tasks">{task}</label>
            </div>              
            )
          })}
        </div>
      </div>
      <div className=" divide-y divide-none p-1">
        <div className="sr-only">Channel</div>
        <div className="flex text-sm text-gray-500 items-end justify-end">
          {taskItem.channel}
        </div>
        <div className="sr-only">Date</div>
        <div className="flex text-sm text-gray-500 items-end justify-end">
          {new Date(taskItem.date).toLocaleString()}
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href="#"
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
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
            >
              <PlayIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              お願い！
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href="#"
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <TrophyIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              ありがとう！
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
