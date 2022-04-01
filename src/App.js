import { useState } from "react";
import PersonCard from "./PersonCard";
import data from "./data.json"
export default function App() {
  const [peopleList,setPeopleList] = useState(data);
  const [optionList,setOptionList] = useState({first:peopleList[0].name,second:peopleList[0].name})
  const [relationList,setRelationList] = useState([]);
  const findObjFromName = (name) => {
    const [a] = peopleList.filter(e => e.name === name)
    return a;
  }
  const findRelationList = (a,b) => {
    let finalList = []
    let relList = []
    let visited = new Map();
    let flag = true;

    const DFS = (v) => {
      visited.set(v.name,true);
      relList.push(v.name);
      if(v.name === b.name)
      {
        flag = false
        if(relList.length>0) finalList.push([...relList])
      }
      else{
      v.friends
        .filter(e => !visited.get(e))
        .forEach(e => {
          DFS(findObjFromName(e));
        })
      }
      relList.pop();
      visited.set(v.name,false)
    }
    DFS(a)
    /*
    while(s.length>0)
    {
      let tmp = s.pop();
      if(tmp.name == b.name) flag = true
      relList.push(tmp.name)
      if(!flag)
      {
        tmp.friends
        .filter(e => !visited.includes(e))
        .forEach(e => {
          visited.push(e)
          s.push(findObjFromName(e))
        })
      }
    }*/
    if(flag) return []
    const z = finalList;
    console.log(z)
    return z;
  }


  

  const handleClick = () => {
    const p = prompt("Enter name")
    if(p=="")
    {
      alert("Enter valid name")
      return
    }
    setPeopleList([...peopleList,{name:p,friends:[]}])
  }
  const handleRelationClick = () => {
    const lst = findRelationList(findObjFromName(optionList.first),findObjFromName(optionList.second)).reverse();
    setRelationList(lst);
  }

  const handleAddFriend = (a) => {
    const f = prompt("Enter friend name")
    if(!findObjFromName(f))
    {
      alert("Your friend is not present in people DB");
      return
    }
    const newlist = peopleList.filter(i => i.name != a.name)
    setPeopleList([{name:a.name,friends:[...a.friends,f]},...newlist])
  }

  const handleOptionFirstClick = (name) => {
    setOptionList({...optionList,first:name})
  }

  const handleOptionSecondClick = (name) => {
    setOptionList({...optionList,second:name})
  }

  const relationOutput = () => {
    if(relationList.length < 1) return <div>No relation</div>
    else
    {
      return relationList.map((lst)=>{
        let cnt = lst.length
        return <div>
          {lst.map((i)=>{
            cnt--;
            return <i>{i}{(cnt !== 0)?" > ":" "}</i>
          })}
        </div>
      })
    }
  }

  return (
    <div class="w-screen h-screen flex flex-col bg-slate-800 justify-evenly">
      <div class="flex justify-center">
        <button class="bg-fuchsia-500 w-40 h-14 rounded-xl text-xl my-4 hover:text-fuchsia-400 hover:bg-black hover:text-2xl"
                onClick={handleClick}>
          Add Person
        </button>
      </div>
      <div class="p-4 flex justify-center flex-col md:flex-row">
        {peopleList.map((item)=>{
          return <PersonCard obj={item} handleAddFriend={(a)=>{handleAddFriend(a)}}/>
        })}
      </div>
      <div class="flex justify-around h-20 flex-col md:flex-row">
        <select class="h-14 rounded-xl my-4">
          {peopleList.map((i) => {
            return <option value={i.name} onClick={()=>handleOptionFirstClick(i.name)}>{i.name}</option>
          })}
        </select>
        <select class="h-14 rounded-xl my-4">
          {peopleList.map((i) => {
            return <option value={i.name} onClick={()=>handleOptionSecondClick(i.name)}>{i.name}</option>
          })}
        </select>

        <button class="bg-fuchsia-500 w-40 h-14 rounded-xl text-xl my-4 hover:text-fuchsia-400 hover:bg-black hover:text-2xl"
                  onClick={handleRelationClick}>
            Find Relation
        </button>

       
      </div>
       <div class="flex justify-center">
          <div class="w-fit rounded-xl text-xl text-white mt-6 flex-col flex align-middle">
            <i class="text-2xl text-white">Relations</i>
            {relationOutput()}
          </div>
        </div>
    </div>
  )
}
