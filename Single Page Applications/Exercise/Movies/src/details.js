import { e, showView } from "./dom.js";
import { showHome } from "./home.js";

// initialization
// - find the relevan section
// - detach the section

const section = document.getElementById("movie-details");
section.remove();

// display logic
export function showDetails(movieId) {
  console.log(movieId);
  showView(section);
  getMovieById(movieId);
}

async function getMovieById(id) {
  section.replaceChildren(e("p", {}, "Loading..."));

  /*pravim 2ve paralelni zaqvki: za edin movie spored id-to my i kolko 'likes' ima to */
  const requests = [
    fetch("http://localhost:3030/data/movies/" + id),
    fetch(
      `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
    ),
  ];
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData != null) {
    requests.push(
      fetch(
        `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userData.id}%22`
      )
    );
  }
  const [movieRes, likesRes, hasLikedRes] = await Promise.all(requests);
  const [movieData, likes, hasLiked] = await Promise.all([
    movieRes.json(),
    likesRes.json(),
    /* ako hasLikedRes == false -> to sledvashtata chast nqma da se izpulni i nqma da ydarim greshka pri zaqvkata*/
    hasLikedRes && hasLikedRes.json(),
  ]);
  section.replaceChildren(createDetails(movieData, likes, hasLiked));
}
// window.getMovieById = getMovieById;

// suzadavme edna carta za movie s function e();
function createDetails(movie, likes, hasLiked) {
  // console.log(hasLiked);
  const controls = e(
    "div",
    { className: "col-md-4 text-center" },
    e("h3", { className: "my-3" }, "Movie Description"),
    e("p", {}, movie.description)
  );
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const deleteBtn = e("a",{ className: "btn btn-danger", href: "#", onClick: onDelete },"Delete");
  const editBtn = e("a",{ className: "btn btn-warning", href: "#", onClick: onEdit },"Edit");
  const likeBtn = e("a",{ className: "btn btn-primary", href: "#", onClick: onLike },"Like");
  const unlikeBtn = e("a",{ className: "btn btn-primary", href: "#", onClick: onUnlike },"Unlike");

  /* proverqvame dali ima lognat user*/
  if (userData != null) {
    /* proverqvame dali lognatiq user e suzdatel na film 
    (userData.id == movie._ownerId - owenrId-to e suhtoto kato id-to na user-a)*/
    if (userData.id == movie._ownerId) {
      controls.appendChild(deleteBtn);
      controls.appendChild(editBtn);
    } else {
      if (hasLiked.length > 0) {
        controls.appendChild(unlikeBtn);
      } else {
        controls.appendChild(likeBtn);
      }
    }
  }
  /* bezyslovno shte pokazva kolko 'likes' ima edin film */
  controls.appendChild(
    e("span", { className: "enrolled-span" }, `Liked ${likes}`)
  );

  const element = e(
    "div",
    { className: "contaioner" },
    e(
      "div",
      { className: "row bg-light text-dark" },
      e("h1", {}, `Movie title: ${movie.title}`),
      e(
        "div",
        { className: "col-md-8" },
        e("img", { className: "img-thumbnail", src: movie.img, alt: "Movie" })
      ),
      controls
    )
  );

  return element;

  async function onLike() {
    // console.log('liked');
    /*ne ni interesyva otgovora ot request-a i za tova ne await-vame res.json() */
    const res = await fetch("http://localhost:3030/data/likes", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": userData.token,
      },
      body: JSON.stringify({ movieId: movie._id }),
    });
    if (res.ok == false) {
      const err = await res.json();
      throw new Error(err.message);
    }
    showDetails(movie._id);
  }

  async function onUnlike() {
    /*vzemame id-to na like koito sme napravili predi ot 'hasLiked' (koito e masiv), i taka si iztrivame like koito sme napravili */
    const likeId = hasLiked[0]._id;
    await fetch("http://localhost:3030/data/likes/" + likeId, {
      method: "delete",
      headers: {
        "X-Authorization": userData.token,
      },
    });
    showDetails(movie._id);
  }

  async function onEdit() {
    console.log("edit clicked");
  }

  async function onDelete() {
    // console.log('delete clicked');
    const confirmed = confirm("Are you sure you want to delete this movie?");
    if (confirmed) {
      await fetch("http://localhost:3030/data/movies/" + movie._id,{
          method: "delete",
          headers: {
            "X-Authorization": userData.token,
          },
        }
      );
      location.reload();
      showHome();
    }
  }
}
