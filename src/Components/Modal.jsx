

function Modal({podcast,close}){


return (

<div className="modal">


<button onClick={close}>
X
</button>


<img src={podcast.image}/>


<h1>
{podcast.title}
</h1>


<p>

{podcast.description}

</p>


<h3>

Genres:

</h3>


<p>

{
podcast.genres.join(", ")

}

</p>


</div>

)

}


export default Modal;