const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
}
export default getters
