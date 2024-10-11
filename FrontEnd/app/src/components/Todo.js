import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import {faDeleteLeft} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'


export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
  return (
    <div className="Todo">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.title}</p>
        <div>
          {task.status == false?
          <FontAwesomeIcon className="edit-icon" icon={faSpinner}  onClick={() => toggleComplete(task.id,task.status)} />
          :
          <FontAwesomeIcon className="edit-icon" icon={faCheck}  onClick={() => toggleComplete(task.id,task.status)} />
          }
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faDeleteLeft} onClick={() => deleteTodo(task.id)} />
        </div>
    </div>
  )
}