import { connect } from 'react-redux'
import {addTodo} from '../actions'
import TodoList from '../components/AddTodo.jsx'

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: (text) => {
      dispatch(addTodo(text))
    }
  }
}

const AddTodo = connect(
  undefined,
  mapDispatchToProps
)(TodoList)

export default AddTodo
// import React from 'react'
// import {connect} from 'react-redux'
// import {addTodo} from '../actions'
//
// let AddTodo = ({dispatch}) => {
//     let input
//
//     return (
//         <div>
//             <form onSubmit={e => {
//                 e.preventDefault();if (!input.value.trim()) {
//                     return
//                 }
//                 dispatch(addTodo(input.value));input.value = '';
//             }}>
//                 <input ref={node => {
//                     input = node
//                 }}/>
//                 <button type="submit">
//                     Add Todo
//                 </button>
//             </form>
//         </div>
//     )
// }
// AddTodo = connect()(AddTodo)
//
// export default AddTodo
