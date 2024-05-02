import PropTypes from 'prop-types';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

const TaskDetailsView = ({ task }) => {
    <div className='tasklist-item view'>
        <h3>{task.subject}</h3>
        <p>{task.description}</p>
        <button>Edit Task</button>
        <div className='task-info'>
            <div>
                Status: <span>{task.status_id}</span>
            </div>
            <div>
                Priority: <span>{task.task_priority}</span>
            </div>
            <div>
                Due: <span>{task.due_date}</span>
            </div>
        </div>
    </div>
}

const TaskDetailsEdit = ({ task }) => {
    <div className='tasklist-item edit'>
        <h3>{task.subject}</h3>
        <label>
            <span>Subject</span>
            <input type="text" value={task.subject} />
        </label>
        <label>
            <span>Description</span>
            <input type="text" value={task.subject} />
        </label>
        <p>{task.description}</p>
        <button>View Details</button>
        <div className='task-info'>
            <div>
                Status: <span>{task.status_id}</span>
            </div>
            <div>
                Priority: <span>{task.task_priority}</span>
            </div>
            <div>
                Due: <span>{task.due_date}</span>
            </div>
            <label>
                <span>Due Date</span>
                <input type='datetime-local' value={task.due_date} />
            </label>
        </div>
        <button>Save Changes</button>
    </div>


}

const TaskDetails = ({ task }) => {
    const [ edit, setEdit ] = useState(false);
    const [taskData, setTaskData] = useState(task);

    return (
        <div className='wrapper'>
            {!edit &&
                <div className='tasklist-item view'>
                    <h3>{task.subject}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => setEdit(true)}>Edit Task</button>
                    <div className='task-info'>
                        <div>
                            Status: <span>{task.status_id}</span>
                        </div>
                        <div>
                            Priority: <span>{task.task_priority}</span>
                        </div>
                        <div>
                            Due: <span>{task.due_date}</span>
                        </div>
                    </div>
                </div>
            }


            {edit &&
                <div className='tasklist-item edit'>
                    <h3>{task.subject}</h3>
                    <label>
                        <span>Subject</span>
                        <input type="text" value={task.subject} />
                    </label>
                    <label>
                        <span>Description</span>
                        <input type="text" value={task.description} />
                    </label>
                    <div className='task-info'>
                        <div>
                            Status: <span>{task.status_id}</span>
                        </div>
                        <div>
                            Priority: <span>{task.task_priority}</span>
                        </div>
                        <div>
                            Due: <span>{task.due_date}</span>
                        </div>
                        <label>
                            <span>Due Date</span>
                            <input type='datetime-local' value={task.due_date} />
                        </label>
                    </div>
                    <button onClick={()=> setEdit(false)}>Save Changes</button>
                </div>
            }
        </div>
    );
}

TaskDetails.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        object: PropTypes.string.isRequired,
        task_priority: PropTypes.string.isRequired,
        status_id: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        due_date: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired
    }).isRequired
};

export default TaskDetails;