import React, { useLayoutEffect, useState } from "react";
import { useAccount } from "wagmi";
import TaskItem from "./TaskItem";
import { getAssign, getTasks } from "../modules/Notion.mjs";

const Tasks = (props) => {
  const { address } = useAccount();
  const [taskData, setTaskData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [nextCursor, setNextCursor] = useState("");

  const [isInLoadingProcess, setIsInLoadingProcess] = useState(true);

  useLayoutEffect(() => {
    const initializeTaskData = async () => {
      setIsInLoadingProcess(true);
      const result = await getTasks();
      const assignResult = await getAssign(address);
      for (const assign of assignResult.tasks) {
        const targetIndex = result.tasks.findIndex(
          (item) => item.id === assign.id
        );
        if (targetIndex > -1) {
          for (const index of assign.taskIndexes) {
            result.tasks[targetIndex].tasks[index].checked = true;
          }
        }
      }
      setTaskData([...result.tasks]);
      setDisplayData([...result.tasks]);
      setNextCursor(result.nextCursor);
      setIsInLoadingProcess(false);
    };
    initializeTaskData();
  }, []);

  useLayoutEffect(() => {
    setDisplayData((prev) => []);
    const initializeTaskData = async () => {
      setIsInLoadingProcess(true);
      const result = await getTasks();
      const assignResult = await getAssign(address);
      for (const assign of assignResult.tasks) {
        const targetIndex = result.tasks.findIndex(
          (item) => item.id === assign.id
        );
        if (targetIndex > -1) {
          for (const index of assign.taskIndexes) {
            result.tasks[targetIndex].tasks[index].checked = true;
          }
        }
      }

      setTaskData(result.tasks);
      setDisplayData(result.tasks);
      setNextCursor(result.nextCursor);
      setIsInLoadingProcess(false);
    };
    initializeTaskData();
  }, [address]);

  useLayoutEffect(() => {
    const getNextTasks = async () => {
      setIsInLoadingProcess(true);
      const result = await getTasks(nextCursor);
      setTaskData((prevTasks) => [...prevTasks, ...result.tasks]);
      setDisplayData((prevTasks) => [...prevTasks, ...result.tasks]);
      setNextCursor(result.nextCursor);
      setIsInLoadingProcess(false);
    };

    if (props.needNextTasks && nextCursor) {
      getNextTasks();
    }
  }, [props.needNextTasks]);

  useLayoutEffect(() => {
    const guildFilterd = taskData.filter((data) => {
      const isGuildChecked = props.filters[0].options.some(
        (item) =>
          data.guildId === item.value &&
          item.checked &&
          data.summary.toLowerCase().includes(props.searchText.toLowerCase())
      );
      return isGuildChecked;
    });

    const channelFilterd = guildFilterd.filter((data) => {
      const ischannleChecked = props.filters[1].options.some(
        (item) => data.channelId === item.value && item.checked
      );
      return ischannleChecked;
    });

    const typeFiltered = channelFilterd.filter((data) => {
      const isTypeChecked = props.filters[2].options.some((item) =>
        data.tasks.some((task) => {
          return item.value == task.type && item.checked;
        })
      );
      return isTypeChecked;
    });

    const filteredTaskItem = typeFiltered;

    let sortedData;
    if (props.sortOptions[0].current) {
      sortedData = [...filteredTaskItem].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (props.sortOptions[1].current) {
      sortedData = [...filteredTaskItem].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      sortedData = [...filteredTaskItem];
    }
    setDisplayData(sortedData);
  }, [props, taskData]);

  return (
    <div className="flex h-full justify-center items-center">
      <div
        className={
          isInLoadingProcess
            ? "relative flex justify-center"
            : "relative hidden justify-center h-0 top-3"
        }
        aria-label="読み込み中"
      >
        <div className="animate-spin h-8 w-8 border-4 border-blue-400 rounded-full border-t-transparent"></div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {[...displayData].map((data, index) => {
          return (
            <TaskItem
              key={`${data.channelId}-${data.date}-${index}`}
              id={data.id}
              guildId={data.guildId}
              channel={data.channelId}
              messageId={data.messageId}
              summary={data.summary}
              tasks={data.tasks}
              date={data.date}
              status={data.status}
              assigns={data.assigns}
              skips={data.skips}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
