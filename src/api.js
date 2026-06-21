export async function getPodcasts(){

const response = await fetch(
"https://podcast-api.netlify.app"
);

return await response.json();

}
