import React, { useState } from "react";
import "./Drag.css";

const Drag = () => {
  const [tasks, setTasks] = useState({
    todo: [
      { id: "todotarget1", text: "Details of Task", project: "Project Name" },
      { id: "todotarget2", text: "Details of Task", project: "Project Name" },
      { id: "todotarget3", text: "Details of Task", project: "Project Name" },
    ],
    progress: [
      { id: "inprogresstarget1", text: "Details of Task", project: "Project Name" },
      { id: "inprogresstarget2", text: "Details of Task", project: "Project Name" },
    ],
    completed: [
      { id: "completedtarget1", text: "Details of Task", project: "Project Name" },
    ],
  });

  const onDragStart = (event, taskId) => {
    event.dataTransfer.setData("taskId", taskId);
  };

  const onDrop = (event, category) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("taskId");

    const sourceCategory = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === taskId)
    );

    const task = tasks[sourceCategory].find((task) => task.id === taskId);

    setTasks((prevState) => {
      const updatedSource = prevState[sourceCategory].filter(
        (task) => task.id !== taskId
      );

      return {
        ...prevState,
        [sourceCategory]: updatedSource,
        [category]: [...prevState[category], task],
      };
    });
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <section className="mt-3">
      <h5 className="text-center">Task Management (Drag and Drop)</h5>
      <div className="container position-relative">
        <div className="container my-3 my-lg-5">
          <div className="row justify-content-center vh-100">
            {Object.keys(tasks).map((category) => (
              <div
                key={category}
                className={`col-3 shadow-sm mx-2 bg-light py-2`}
                id={category}
                onDrop={(event) => onDrop(event, category)}
                onDragOver={allowDrop}
              >
                <h5>{category.toUpperCase()}</h5>
                <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                  {tasks[category].map((task) => (
                    <div
                      key={task.id}
                      id={task.id}
                      draggable="true"
                      onDragStart={(event) => onDragStart(event, task.id)}
                      className={`card rounded-0 w-100 mb-3 border-0 border-start border-$
                        {category === "todo" ? "primary" : category === "progress" ? "warning" : "success"} border-3 shadow-sm`}
                    >
                      <div className="card-body px-3 py-3">
                        <div className="card-text mb-2">{task.text}</div>
                        <div
                          className={`bg-$
                            {category === "todo" ? "primary" : category === "progress" ? "warning" : "success"} d-inline p-1 fw-semibold small text-white project-name`}
                        >
                          {task.project}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Drag;