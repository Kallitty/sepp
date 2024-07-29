import React from 'react'
// import './todolist.scss'
import styles from './Todos.module.css'

const TodoList = () => {
  return (
    <div className={styles.todo}>
      <div className={styles.head}>
        <h3>Todos</h3>
        <i className='bx bx-plus'></i>
        <i className='bx bx-filter'></i>
      </div>
      <ul className={styles.todoList}>
        <li className={styles.completed}>
          <p>Todo List</p>
          <i className='bx bx-dots-vertical-rounded'></i>
          <span className='todo--action'>|</span>
        </li>
        <li className={styles.completed}>
          <p>TodoList </p>
          <i className='bx bx-dots-vertical-rounded'></i>
          <span className='todo--action'>|</span>
        </li>
        <li className={styles.notCompleted}>
          <p>Todo List</p>
          <i className='bx bx-dots-vertical-rounded'></i>
          <span className='todo--action'>|</span>
        </li>
        {/* More todos as needed */}
      </ul>
    </div>
  )
}

export default TodoList
