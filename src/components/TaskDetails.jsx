import PropTypes from 'prop-types';
import { useState } from 'react';
import { format, formatDistance } from 'date-fns';
import { useStartProgress, useStopProgress, useCloseTask, useReopenTask } from '../services/queries';

const TaskDetails = ({ task }) => {
    const [edit, setEdit] = useState(false);
    // const [taskData, setTaskData] = useState(task);

    const dueText = format(new Date(task.due_date), "iiii, dd MMMM yyyy 'at' h:mm aa"); // e.g., "Monday, 23 May 2024 at 9:30 AM"    
    const datetimeInputValue = format(new Date(task.due_date), "yyyy-MM-dd'T'HH:mm");
    // console.log(datetimeInputValue);


    const now = new Date(+new Date() + 2000); // Now + 2s offset
    // const now = new Date();
    // console.log('Now: ', now);
    const updatedText = formatDistance(new Date(task.updated_at), now, { addSuffix: true });
    const createdText = formatDistance(new Date(task.created_at), now, { addSuffix: true })

    // Functions to update task status
    const { mutateAsync: startProgress } = useStartProgress(task.id);
    const { mutateAsync: stopProgress } = useStopProgress(task.id);
    const { mutateAsync: closeTask } = useCloseTask(task.id);
    const { mutateAsync: reopenTask } = useReopenTask(task.id);

    // Handlers will disable buttons on click to prevent multiple clicks
    // Problem: while the clicked button will be disabled, other buttons can still be clicked
    // before a previous query is completed, possibly leading to a 409 (conflict)
    // Solution: disable clicks on all buttons using CSS pointer-events: none

    const handleStartProgress = (e) => {
        e.target.disabled = true;
        startProgress();
    } 
    
    const handleStopProgress = (e) => {
        e.target.disabled = true;
        stopProgress();
    }
    
    const handleCloseTask = (e) => {
        e.target.disabled = true;
        closeTask();
    }
    
    const handleReopenTask = (e) => {
        e.target.disabled = true;
        reopenTask();
    }

    const status = task.status_id;
    const [statusText, statusIcon] = { // [displayText, materialSymbolName]
        open: ['Open', 'circle'],
        in_progress: ['In Progress', 'pace'],
        closed: ['Closed', 'task_alt'],
    }[task.status_id];

    const [priorityText, priorityIcon]  = { // [displayText, materialSymbolName]
        high: ['High', 'priority_high'],
        // high: ['High Priority', 'priority_high'],
        normal: ['Normal', 'priority'],
        low: ['Low', 'low_priority'],
    }[task.task_priority];

    const updatedTask = {};

    const updateDueDate = (e) => {
        let date = new Date(e.target.value).toISOString();
        updatedTask.due_date = date;
        console.log(date);
    }

    return (
        <div className='wrapper'>
            <div className='tasklist-container main-container'>
                <h2 style={{ margin: '30px 0 -30px' }}>Task Details</h2>
                <p className='intro'>View, update or delete this task here.</p>

                {!edit &&
                    <>
                        <div className='task-details view'>
                            <p className='key'>Subject</p>
                            <p style={{ marginRight: 100 }}>{task.subject}</p>

                            <p className='key'>Description</p>
                            <p>{task.description}</p>

                            <p className='key'>Due on</p>
                            <time dateTime={task.due_date}>{dueText}</time>

                            <p className='key'>Priority</p>
                            <p>{priorityText}</p>

                            <div className='status-container'>
                                <p className={`status ${task.status_id}`}>
                                    {/* <span className={`status ${task.status_id}`}>{statusText}</span> */}
                                    <span className='status-icon material-symbols-rounded'>{statusIcon}</span>
                                    <span className='status-text'>{statusText}</span>
                                </p>
                            </div>

                            <div className='time-summary'>
                                Created {createdText} <span style={{padding: '0 10px'}}>&middot;</span> Updated {updatedText}
                            </div>
                        </div>

                        <div className='task-detail-controls'>
                            {status == 'open' &&
                                <button type='button' icon='start' className='action-button' onClick={handleStartProgress}>Start Progress</button>
                            }

                            {status == 'in_progress' &&
                                <button type='button' icon='circle' className='action-button' onClick={handleStopProgress}>Stop Progress</button>
                            }

                            {(status == 'open' || status == 'in_progress') &&
                                <button type='button' icon='task_alt' className='action-button' onClick={handleCloseTask}>Close</button>
                            }

                            {status == 'closed' &&
                                <button type='button' icon='restart_alt' className='action-button' onClick={handleReopenTask}>Reopen</button>
                            }

                            <div className='spacer'/>

                            <button type='button' icon='edit' className='action-button' onClick={() => setEdit(true)}>Edit</button>
                            <button type='button' icon='delete' className='action-button danger' onClick={() => setEdit(true)}>Delete</button>
                        </div>
                    </>
                }


                {edit &&
                    <>
                        <div className='task-details edit'>
                            <label className='key'>Subject</label>
                            <input className="input-box" onChange={(val) => val} type="text" value={task.subject} />

                            <label className='key'>Description</label>
                            <input className="input-box" onChange={(val) => val} type="text" value={task.description} />

                            <label className='key'>Priority</label>
                            <p className="input-box">{task.task_priority}</p>

                            <label className='key'>Due on</label>
                            <input className="input-box" onChange={updateDueDate} type='datetime-local' defaultValue={datetimeInputValue} />

                        </div>

                        <div className='task-detail-controls'>
                            <button type='button' icon='done' className='action-button' onClick={() => setEdit(false)}>Update</button>
                            <button type='button' icon='close' className='action-button' onClick={() => setEdit(false)}>Cancel</button>
                        </div>
                    </>
                }

            </div>
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