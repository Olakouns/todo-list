import React, { useEffect, useState } from 'react';
import { STATUS_ENUM } from '../payload/SatusEnum';
import AddTask from './AddTask';
import TaskItem from './TaskItem';

function GlobalTask(props) {

    const [taskList, setTaskList] = useState([]);
    const [currentList, setCurrentList] = useState([]);
    const [currentStatus, setCurrentStatus] = useState({
        status : STATUS_ENUM.TO_DO,
        description : 'a faire'
    })
    const [defaultTask, setDefaultTask] = useState(
        {
            id: '',
            name : '',
            status : ''
        }
    );

    const handleAdd  = (task) => {

        setTaskList((previous) => [...previous, task]);
        console.log(taskList.length);
        filterGlobalList(STATUS_ENUM.TO_DO, [...taskList, task]);
    }

    const handleUpdate = (task) => {
        const index = taskList.findIndex((element) => task.id ===element.id);
        if (index != -1) {
            const oldList = taskList;
            oldList[index] = task;
            setTaskList(oldList);

            filterGlobalList(currentStatus.status, oldList);
        }
    }

    const filterGlobalList = (type, tasks) => {
        
        setCurrentList(tasks.filter((task)=> task.status === type));

        switch (type) {
            case STATUS_ENUM.TO_DO:
                setCurrentStatus({
                    status : STATUS_ENUM.TO_DO,
                    description : 'a faire'
                });
                break;
            case STATUS_ENUM.DONE:
                setCurrentStatus({
                    status : STATUS_ENUM.DONE,
                    description : 'réalisée'+(currentList.length > 1 ? 's' : '')
                });
                break;
            case STATUS_ENUM.IN_PROGRESS:
                setCurrentStatus({
                    status : STATUS_ENUM.IN_PROGRESS,
                    description : 'en cours'
                });
                break; 
        }
    }

    const editTask = (task)=>{
        setDefaultTask(task);
    }

    const deleteTask = (task)=>{

    }

    useEffect(() => {
        // Update the document title using the browser API
        filterGlobalList(STATUS_ENUM.TO_DO, taskList);
    }, []);


    return (
        <div>
            <h2>TODO APP</h2>
            <div>
                <AddTask 
                    defaultTask = {defaultTask} 
                    handleAdd = {handleAdd} 
                    handleUpdate = {handleUpdate} />
            </div>
            {/* LIST OF BUTTON  */}
            <div>
                <button onClick={() => filterGlobalList(STATUS_ENUM.TO_DO, taskList)}>A faire</button>
                <button onClick={() => filterGlobalList(STATUS_ENUM.IN_PROGRESS, taskList)}>En cours</button>
                <button onClick={() => filterGlobalList(STATUS_ENUM.DONE, taskList)}>Réalisées</button>
            </div>
            {/* LIST OF TASK */}
            <div>
                <h4>{currentList.length} Tache{currentList.length > 1 ? 's' : ''} {currentStatus.description}</h4>
                {currentList.map((task)=> {
                    return <TaskItem 
                        key={task.id} 
                        editTask = {editTask}
                        deleteTask = {deleteTask}
                        task = {task} />
                })}
            </div>
        </div>
    );
}

export default GlobalTask;