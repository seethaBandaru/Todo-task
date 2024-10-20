import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, [])
  
  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleEdit = (e,id) => {
    let t = todos.filter(i=>i.id === id) 
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    settodos(newTodos) 
    savetoLS();
  }

  const handleDelete = (e,id) => {
    console.log(id)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    settodos(newTodos);
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("");
    savetoLS();
  }

  const handleChange = (e) => {
    settodo(e.target.value)
    savetoLS();
  }

  const handleChecked = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
  }

  const handleShowFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar />
      <div className="bg-purple-100 container p-5 mt-5 rounded-3xl mx-auto w-1/2 h-[80vh]">
        <div>
          <h1 className='text-xl font-bold'>Task Manager where you can see your Tasks!</h1>
        </div>
        <div className='text-xl mt-3 font-bold'>
          <span>Add a Task</span>
        </div>
        <div className="input flex my-3">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-2' />
          <button onClick={handleAdd} disabled = {todo.length <= 3} className='bg-purple-600 font-bold text-white p-1 rounded-full px-2'>Add</button>
        </div>
        <input type="checkbox" checked={showFinished} onChange={handleShowFinished} /> Show Finished
        <div className="yourtasks text-xl font-bold">
          Your Tasks
        </div>
        {todos.length ===0 && <div className='m-5'>No Todos to display</div> }
        {todos.map(item => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className="tasks flex mt-3 justify-between">
            <div className='flex gap-7 items-center'>
              <input type="checkbox" onChange={handleChecked}  name={item.id} id="" />
              <span className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>
            </div>
            <div className="buttons flex gap-3 ">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-purple-600 rounded-xl p-3 py-1 font-bold text-white'>Edit</button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-purple-600 rounded-xl p-3 py-1 font-bold text-white'>Delete</button>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App
