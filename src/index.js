import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';
// import { TodoList } from './classes/todo-list.class';
// import { Todo } from './classes/todo.class';

export const todoList = new TodoList();
todoList.todos.forEach( crearTodoHTML );