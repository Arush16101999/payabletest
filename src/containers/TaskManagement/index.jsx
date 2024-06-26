import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import TaskTable from "../../components/Table";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    try {
      const data = await axios.get("http://localhost:5000/tasks");
      if (data) {
        console.log(data);
        setTasks(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/delete/${id}`);
      toast.success("Successfully Deleted!");
      getAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks = tasks.filter((track) => {
    return track.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  const handleChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Container>
      <br />
      <Row>
        <Col>
          <h3>TODO TASK Management System</h3>
        </Col>
      </Row>
      <br />
      <Row>
        <Col />
        <Col md={2}>
          <b>Track By Status </b>
        </Col>
        <Col md={2}>
          <Form.Select
            name="status"
            size="lg"
            required
            onChange={handleChange}
            value={filterStatus}
          >
            <option value="">All </option>
            <option value="Active">Active</option>
            <option value="Done">Done</option>
            <option value="Backlog">Backlog</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Link to="/addTask">
            <Button variant="outline-light" size="lg">
              Add Task
            </Button>
          </Link>
        </Col>
      </Row>
      <br />

      <Row>
        <TaskTable
          filteredTasks={filteredTasks}
          handleDeleteTask={handleDeleteTask}
        />
      </Row>
    </Container>
  );
};

export default TaskManagement;
