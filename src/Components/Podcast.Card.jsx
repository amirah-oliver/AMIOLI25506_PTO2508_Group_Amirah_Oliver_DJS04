
function PodcastCard({podcast,open}){


return (

<div

className="card"

onClick={()=>open(podcast)}

>


<img

src={podcast.image}

/>


<h2>
{podcast.title}
</h2>


<p>
{podcast.seasons} seasons
</p>


<small>

Updated:

{
new Date(
podcast.updated
)
.toDateString()

}

</small>


</div>

)

}


export default PodcastCard;
