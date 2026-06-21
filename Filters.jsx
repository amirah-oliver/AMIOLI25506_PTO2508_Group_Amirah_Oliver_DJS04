import {genres} from "../data/genres";


function Filters({
genre,
setGenre,
sort,
setSort,
setPage
}){


return (

<div className="filters">


<select

value={genre}

onChange={(e)=>{

setGenre(e.target.value);

setPage(1);

}}

>


<option value="all">
All Genres
</option>


{
genres.map(g=>

<option

key={g.id}

value={g.id}

>

{g.title}

</option>

)

}


</select>



<select

value={sort}

onChange={(e)=>setSort(e.target.value)}

>


<option value="updated">
Newest
</option>


<option value="az">
Title A-Z
</option>


<option value="za">
Title Z-A
</option>


</select>


</div>

)

}

export default Filters;
