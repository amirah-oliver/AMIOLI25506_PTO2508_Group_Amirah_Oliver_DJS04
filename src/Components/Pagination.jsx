
function Pagination({
total,
page,
setPage,
items
}){


const pages=Math.ceil(total/items);



return (

<div className="pagination">


{

Array.from(
{length:pages}
)
.map((_,i)=>

<button

key={i}

onClick={()=>setPage(i+1)}

className={
page===i+1?
"active":
""
}

>

{i+1}

</button>

)


}


</div>

)

}


export default Pagination;
