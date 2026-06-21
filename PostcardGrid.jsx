
import PodcastCard from "./PodcastCard";


function PodcastGrid({podcasts,open}){


return (

<div className="grid">


{
podcasts.map(p=>

<PodcastCard

key={p.id}

podcast={p}

open={open}

/>

)

}


</div>

)

}

export default PodcastGrid;
