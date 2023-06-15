import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import TaskItem from "./TaskItem";
import { getAssign, getTasks } from "../modules/Notion.mjs";

const Tasks = (props) => {
  const { address } = useAccount();
  const [taskData, setTaskData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [nextCursor, setNextCursor] = useState("");

  useEffect(() => {
    const initializeTaskData = async () => {
      const result = await getTasks();
      const assignResult = await getAssign(address);
      for(const assign of assignResult.tasks) {
        const targetIndex = result.tasks.findIndex(
          (item) => item.id === assign.id
        );
        if (targetIndex > -1) {
          for (const index of assign.taskIndexes) {
            result.tasks[targetIndex].tasks[index].checked = true;
          }
        }
      };

      setTaskData(result.tasks);
      setDisplayData(result.tasks);
      setNextCursor(result.nextCursor);
    };
    initializeTaskData();
  }, []);

  useEffect(() => {
    setDisplayData([]);
    const initializeTaskData = async () => {
      const result = await getTasks();
      const assignResult = await getAssign(address);
      for(const assign of assignResult.tasks) {
        const targetIndex = result.tasks.findIndex(
          (item) => item.id === assign.id
        );
        if (targetIndex > -1) {
          for (const index of assign.taskIndexes) {
            result.tasks[targetIndex].tasks[index].checked = true;
          }
        }
      };

      setTaskData(result.tasks);
      setDisplayData(result.tasks);
      setNextCursor(result.nextCursor);
    };
    initializeTaskData();
  }, [address]);  


  useEffect(() => {
    const getNextTasks = async () => {
      const result = await getTasks(nextCursor);
      setTaskData((prevTasks) => [...prevTasks, ...result.tasks]);
      setDisplayData((prevTasks) => [...prevTasks, ...result.tasks]);
      setNextCursor(result.nextCursor);
      console.log(result);
    };

    if (props.needNextTasks && nextCursor) {
      getNextTasks();
    }
  }, [props.needNextTasks]);

  useEffect(() => {
    //console.log("Call props change effect");

    const filteredData = taskData.filter((data) => {
      const isChannelChecked = props.filters.some(
        (item) =>
          data.channelId === item.value &&
          item.checked &&
          data.summary.toLowerCase().includes(props.searchText.toLowerCase())
      );
      return isChannelChecked;
    });

    let sortedData;
    if (props.sortOptions[0].current) {
      //console.log("Sort by newest");
      sortedData = [...filteredData].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (props.sortOptions[1].current) {
      //console.log("Sort by oldest");
      sortedData = [...filteredData].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } else {
      sortedData = [...filteredData];
    }
    setDisplayData(sortedData);
  }, [props, taskData]);

  return (
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
          />
        );
      })}
    </div>
  );
};

export default Tasks;
