import {useEffect,useState} from "react";

import {getPodcasts} from "./api";

import Header from "./components/Header";
import Filters from "./components/Filters";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";


function App(){

const [podcasts,setPodcasts]=useState([]);

const [search,setSearch]=useState("");

const [genre,setGenre]=useState("all");

const [sort,setSort]=useState("updated");

const [page,setPage]=useState(1);

const [selected,setSelected]=useState(null);


const itemsPerPage=12;



useEffect(()=>{

getPodcasts()
.then(data=>setPodcasts(data))

},[]);



let filtered=[...podcasts];


// SEARCH

filtered = filtered.filter(item=>

item.title
.toLowerCase()
.includes(search.toLowerCase())

);



// FILTER

if(genre !== "all"){

filtered=filtered.filter(item=>

item.genres.includes(Number(genre))

);

}



// SORT

if(sort==="updated"){

filtered.sort((a,b)=>
new Date(b.updated)-new Date(a.updated)
);

}


if(sort==="az"){

filtered.sort((a,b)=>
a.title.localeCompare(b.title)
);

}


if(sort==="za"){

filtered.sort((a,b)=>
b.title.localeCompare(a.title)
);

}



// PAGINATION


const start=(page-1)*itemsPerPage;


const visible =
filtered.slice(start,start+itemsPerPage);



return (

<>


<Header 
search={search}
setSearch={setSearch}
/>


<Filters

genre={genre}

setGenre={setGenre}

sort={sort}

setSort={setSort}

setPage={setPage}

/>


<PodcastGrid

podcasts={visible}

open={setSelected}

/>


<Pagination

total={filtered.length}

page={page}

setPage={setPage}

items={itemsPerPage}

/>


{
selected &&

<Modal

podcast={selected}

close={()=>setSelected(null)}

/>

}


</>

)

}


export default App;
