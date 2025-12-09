import { getMovieReviewData } from "./data.js";

function init() {
  const movieReviewData = getMovieReviewData();
  paintStatistics(movieReviewData);
  paintMovieData(movieReviewData);
}

function paintStatistics(movieReviewData) {

  const flatReviewData = movieReviewData.flat();  //multi dimentional to single dimentional array

  const totalMovies = movieReviewData.length;
  const totalReviews = flatReviewData.length;
  const totalRating = flatReviewData.reduce((acc, item) => {  // calculating sum of ratings using reduce method not for loop because reduce is more functional and concise
    return acc + item.rating;
  }, 0);
  const avgRating = (totalRating/totalReviews).toFixed(2);

  const totalMoviesEl = document.getElementById("tMoviesId"); // getting element by id
  addStat(totalMoviesEl, totalMovies);

  const avgRatingEL = document.getElementById("tAvgRatingId");
  addStat(avgRatingEL, avgRating);

  const totalReviewsEl = document.getElementById("tReviewsId");
  addStat(totalReviewsEl, totalReviews);
}

function addStat(elem, value) {
  const spanEL = document.createElement("span");  // creating span element
  spanEL.classList.add("text-6xl")  // adding single class to span element
  spanEL.innerText = value;
  elem.appendChild(spanEL);
}

function paintMovieData(movieReviewData) {
  const flatReviewData = movieReviewData.flat();
  flatReviewData.sort((a, b) => new Date(b.on) - new Date(a.on));  // sorting reviews by date in descending order
  const movieListEL = document.querySelector("#movieListId UL"); // getting ul element inside movieListId div

  console.log(movieListEL);

  flatReviewData.map((movie) => {
    console.log(movie);

    const liElem = document.createElement("li");  // creating li element
    liElem.classList.add("card", "p-2", "my-2"); // adding multiple classes to li element

    const titleElem = document.createElement("p");
    titleElem.classList.add("text-xl", "mb-2");
    titleElem.innerText = `${movie.title} - ${movie.rating}`;  // template string
    liElem.appendChild(titleElem);  // appending title element to li element

    const reviewElem = document.createElement("p"); // creating p element for review content
    reviewElem.classList.add("mx-2", "mb-2");
    reviewElem.innerText = movie.content;
    liElem.appendChild(reviewElem);

    const byEleme = document.createElement("p");
    byEleme.classList.add("mx-2", "mb-2");
    byEleme.innerText = `By ${movie.by} on ${new Intl.DateTimeFormat('en-BD').format(movie.on)}`;
    liElem.appendChild(byEleme);

    movieListEL.appendChild(liElem);
  })
}

init();
