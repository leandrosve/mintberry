import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/actions/task';
import TaskList from '../components/task/TaskList';
 
const TasksContainer = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchTasks());
    })
    return (
        <TaskList/>
    );
}
 
TasksContainer.propTypes = {};
 
export default TasksContainer;