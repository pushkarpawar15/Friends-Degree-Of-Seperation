import React from 'react'

export default function PersonCard(props) {
  return (
    <div class="rounded-lg md:w-1/6 w-1/3 mx-2 bg-slate-600 flex-col flex">
	    <div class="bottom-2 flex justify-center text-xl p-2">
		    {props.obj.name}
	    </div>
	    <div class="h-1 bg-slate-800 w-full"/>
	    <div class="flex justify-center">
		<div class="p-1 flex-col">
			<h1>Friends</h1>
			{props.obj.friends.map((item)=>{return (<div>{item}</div>)})}
		</div>
	    </div>
	    <div class="bottom-2 flex justify-center text-lg mt-auto">
		    <button class="bg-fuchsia-400 rounded-lg w-full h-8 m-1 hover:text-fuchsia-400 hover:bg-black hover:text-xl"
		    		onClick={()=>props.handleAddFriend(props.obj)}
				    >
			    Add Friend
		    </button>
	    </div>
    </div>
  )
}
