import React, { useEffect, useState } from "react";
import { getTasks } from "../modules/Notion.mjs";

const Tasks = (props) => {
  const [taskData, setTaskData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [nextCursor, setNextCursor] = useState("");

  useEffect(() => {
    const initializeTaskData = async () => {
      const result = await getTasks();
      setTaskData(result.tasks);
      setDisplayData(result.tasks);
      setNextCursor(result.nextCursor);
      console.log(result);
    };
    initializeTaskData();
  }, []);

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
        (item) => data.channelId === item.value && item.checked && data.summary.toLowerCase().includes(props.searchText.toLowerCase())
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
    <div>
      {displayData.length > 0 ? (
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      ) : null}
    </div>
  );
};

export default Tasks;
