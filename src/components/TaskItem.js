import React from 'react';

function TaskItem(props) {
    return (
        <div>
            <h5>{props.task.name}</h5>
            <div>
                <button onClick={()=>props.editTask(props.task)}>Modifier</button>
                <button onClick={()=>props.deleteTask(props.task)}>Supprimer</button>
            </div>
        </div>
    );
}

export default TaskItem;