import React,{useState , useEffect} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [users,setUsers] = useState([]);
  const [text,setText] = useState("");
  const [suggestions , setSuggestions] = useState([]);
  useEffect(()=>{
   const loadUsers = async ()=>{
    const res= await axios.get(`https://reqres.in/api/users`);
    console.log(res)
    setUsers(res.data.data)
   }
   loadUsers()

  },[])
  const handleChange = (text)=>{
    let matches = [];
    if(text.length > 0){
     
      const regex = new RegExp(`${text}`,"gi")
     matches = users.filter((user)=>{
        return user.email.match(regex)
      })
    }
    console.log(matches)
    setSuggestions(matches)
    setText(text);
  }
  const onSuggestHandler = (text)=>{
    setText(text);
    setSuggestions([])
  }
  return (
    <div className="container">
     
      <div className='group  my-3'>
        
    <input className='input w-100' placeholder = "search" type="text"
     onChange={(event)=>handleChange(event.target.value)} 
     value={text}
     onBlur={()=>{
       setTimeout(()=>{
        setSuggestions([])
       },300)
     }}
     />

    {suggestions && suggestions.map((s,i)=>{
      return(
      <div key={i} onClick={()=>onSuggestHandler(s.email)} className="suggestion">{s.email}</div>
      )
    })}
      </div>
    </div>
  );
}

export default App;
