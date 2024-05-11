import React, { Suspense, useEffect, useState } from "react";
import QuickBooking from "../QuickBooking/QuickBooking.jsx";
import "./HomeContent.scss";
const MovieCard = React.lazy(()=> import("uiComponent/MoveCard"));

import  historyContext  from "../../utils/RoutingProvider";

const dummyItem = [{name:"Dummy Movie"}];

const HomeContent = (props) => {
  const [movies, setMovies] = useState(dummyItem);

  useEffect(async () => {
    // Add the logic to load the movies from server and set to the state
    const response = await getMovie();
    const data = await response.json();
    setMovies(data);
     console.log(data); 
  }, []);

  const movieClicked = (item) => {
    if (typeof props.movieClicked === "function") {
      props.movieClicked(item);
    }
    console.log("Home content movie clicked", item);
  };

  const renderMovieList = () => {
    let items = movies.map((item) => {
      return (
        <div onClick={() => movieClicked(item)} key={item.name}>
            <MovieCard title={item.name} imageUrl={item.imageUrl}></MovieCard>
        </div>
      );
    });

    return items;
  };

  return (
    <div className="home-content-container">
      <historyContext.Provider value={props.routing}>
        <QuickBooking></QuickBooking>
        <div className="movies-container">
        <Suspense fallback={null}>
          {renderMovieList()}
        </Suspense>
        </div>
      </historyContext.Provider>
    </div>
  );
};

async function getMovie(){
  return await fetch("http://localhost:5555/movies/");
}

export default HomeContent;
