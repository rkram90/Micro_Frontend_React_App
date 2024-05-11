import React, { Suspense } from "react";
import "./App.scss";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import DetailsPage from "./components/DetailsPage/DetailsPage.jsx";
import Homepage from "./components/Homepage/Homepage.jsx";
import BookPage from "./components/BookPage/BookPage.jsx";
const HomePageApp = React.lazy(()=> import("homepage/HomePage"));
const DetailPagePageApp = React.lazy(()=> import("detailpage/DetailPage"));
const SeatSelectionPageApp = React.lazy(()=> import("seatselectionpage/SeatSelectionApp"));

const App = () => {

  const history = useHistory();
  const location = useLocation();

  const movieClick = (item) => {
    console.log("From Booking app",item);
    history.push(`details/${item.id}`);
  }

  return (
    <Switch>
      <Route path="/details">
      <Suspense fallback={null}>
          <DetailPagePageApp location={location}></DetailPagePageApp>
        </Suspense>
      </Route>
      <Route path="/book">
      <Suspense fallback={null}>
          <SeatSelectionPageApp></SeatSelectionPageApp>
        </Suspense>
      </Route>
      <Route path="/">
        <Suspense fallback={null}>
          <HomePageApp movieClicked={movieClick} routing={{history, location}}></HomePageApp>
        </Suspense>
      </Route>
    </Switch>
  );
};

export default App;
