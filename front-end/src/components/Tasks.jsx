import React, { useEffect, useState } from "react";
import { getTasks } from "../modules/Notion.mjs";

const Tasks = (props) => {
  const [taskData, setTaskData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const result = await getTasks();
      setTaskData(result);
      setDisplayData(result);
    };
    init();
  }, []);

  useEffect(() => {
    console.log("Call props Change Effect");
    const filteredData = taskData
      .map((data) => {
        const isChecked = props.filters.find(
          (item) => data.channelId === item.value && item.checked
        );
        return isChecked ? data : null;
      })
      .filter(Boolean);

    if (props.sortOptions[0].current) {
      console.log("call Newest");
      const results = filteredData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setDisplayData([...results]);
    } else if (props.sortOptions[1].current) {
      console.log("call Oldest");
      const results = filteredData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setDisplayData([...results]);
    }
  }, [props]);

  return (
    <div>
      {displayData.length > 0 ? (
        <pre>{JSON.stringify(displayData, null, 2)}</pre>
      ) : null}
    </div>
  );
};

export default Tasks;
