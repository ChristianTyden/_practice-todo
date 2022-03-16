import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list'),
        txtInput  = document.querySelector('.new-todo'),
        btBorrar  = document.querySelector('.clear-completed'),
        ulFiltros = document.querySelector('.filters'),
        aFiltros  = document.querySelectorAll('.filtro');

export const crearTodoHTML = ( todo ) =>{
    const htmlTodo = `
        <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

txtInput.addEventListener('keyup', ( event ) => {
    if ( event.keyCode === 13 && txtInput.value.length > 0){
        const newTodo = new Todo( txtInput.value );
        todoList.nuevoTodo(newTodo);
        crearTodoHTML( newTodo );
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', ( event ) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    switch (nombreElemento){
        case 'input':
            todoList.cambiarEstado( todoId );
            todoElemento.classList.toggle('completed');
            break;
        case 'button':
            todoList.eliminarTodo( todoId );
            divTodoList.removeChild( todoElemento );
            break;
    }
});

btBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')){
            divTodoList.removeChild( elemento );
        }
    }
});

ulFiltros.addEventListener('click', ( event ) =>{
    const filtro = event.target.text; 
    if ( !filtro ) return;

    aFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');   
        
        switch (filtro){
            case 'Pendientes':
                if ( completado ) elemento.classList.add('hidden');
                break;
            case 'Completados':
                if ( !completado ) elemento.classList.add('hidden');
                break;
        }
    }
})