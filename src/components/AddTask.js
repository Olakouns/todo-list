import React, { useEffect, useState } from 'react';
import { STATUS_ENUM } from '../payload/SatusEnum';
import { v4 as uuidv4 } from 'uuid';

function AddTask(props) {

    const [taskName, setTaskName] = useState('');


    const addNewTask = () => {
        let task = {
            id: uuidv4(),
            name : taskName,
            status : STATUS_ENUM.TO_DO
        }
        props.handleAdd(task);
        setTaskName('');        
    }

    const updateTask = () => {
        let task = {
            id: props.defaultTask.id,
            name : taskName,
            status : props.defaultTask.status
        }
        
        props.handleUpdate(task);

        setTaskName(''); 
    }

    useEffect(()=>{
        if (props.defaultTask.id !== '') {
            setTaskName(props.defaultTask.name);
        }
    }, [props.defaultTask])
    
    return (
        <div>
            <input value={taskName} onChange={(element)=> setTaskName(element.target.value)}/>
            <button 
                disabled={taskName.trim() === ''} 
                onClick={()=> props.defaultTask.id !== '' ? updateTask() : addNewTask()}>
                {props.defaultTask.id === '' ? 'Add task' : 'Update Task'}
            </button>
        </div>
    );
}

export default AddTask;