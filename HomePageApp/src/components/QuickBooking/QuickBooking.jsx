import React, { Suspense, useContext, useState } from "react";
import  routingContext  from "../../utils/RoutingProvider";
import "./QuickBooking.scss";

const Typography = React.lazy(()=> import("uiComponent/Typography"));

const QuickBooking = () => {

  const [movie, setMovie] = useState("1");
  const [date, setDate] = useState("01/02/2022");
  const [time, setTime] = useState("10 Am");

  const routerContext = useContext(routingContext);

  const bookMovie = () => {
    const booking = {
      movie,
      date,
      time,
    };
    import("movie_booking_app/MovieData").then((module)=>{
      const movieStore = module.default;
      movieStore.next(booking);
      console.log("quick booking", booking);
    })
    routerContext.history.push("book");
  };

  return (
    <div className="quick-booking-container">
      <Suspense fallback={null}>
        <Typography type={"title"} text={"Quick Booking"}></Typography>
      </Suspense>
      <div className="spacer"></div>
      <div className="mr-1">
        <span>Select Movie</span>
        <select onChange={(e) => setMovie(e.target.value)} value={movie}>
          <option value="1">Avengers End Game</option>
          <option value="2">Black Panther</option>
          <option value="3">Black Widow</option>
          <option value="4">Captain America</option>
          <option value="5">Doctor Strange</option>
          <option value="6">Ethernals</option>
          <option value="7">IronMan</option>
          <option value="8">Spiderman</option>
          <option value="9">Thor</option>
          <option value="10">Venom</option>
        </select>
      </div>
      <div className="mr-1">
        <span>Select Date: </span>
        <select onChange={(e) => setDate(e.target.value)} value={date}>
          <option value="01/02/2022">01/02/2022</option>
          <option value="02/02/2022">02/02/2022</option>
          <option value="03/02/2022">03/02/2022</option>
          <option value="04/02/2022">04/02/2022</option>
          <option value="05/02/2022">05/02/2022</option>
        </select>
      </div>

      <div className="mr-1">
        <span>Select Time: </span>
        <select onChange={(e) => setTime(e.target.value)} value={time}>
          <option value="10 Am">10 Am</option>
          <option value="12:30 PM">12:30 PM</option>
          <option value="4 PM">4 PM</option>
          <option value="8 PM">8 PM</option>
          <option value="9:30 PM">9:30 PM</option>
        </select>
      </div>
      <button onClick={() => bookMovie()}>Book</button>
    </div>
  );
};

export default QuickBooking;
