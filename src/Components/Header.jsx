
function Header({search,setSearch}){


return (

<header className="header">


<h1>
🎙 PodcastApp
</h1>


<input

placeholder="Search podcasts..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>


</header>

)

}


export default Header;
