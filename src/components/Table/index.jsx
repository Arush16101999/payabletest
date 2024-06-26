import React from "react";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const TaskTable = (props) => {
  const { handleDeleteTask, filteredTasks } = props;
  return (
    <div className="table-responsive">
      <Table responsive bordered hover variant="dark">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.task}</td>
              <td>{task.description}</td>
              <td>
                <Badge
                  bg={
                    task.status === "Done"
                      ? "info"
                      : task.status === "Active"
                      ? "success"
                      : "warning"
                  }
                >
                  {task.status}
                </Badge>
              </td>

              <td>
                <Link to={`/updateTask/${task.id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>{" "}
                &nbsp;
                <Button
                  variant="danger"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskTable;
