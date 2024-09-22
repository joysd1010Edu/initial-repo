import React, { useState, useEffect } from "react";

const Timer = () => {
  const initialDays = 250;
  const serverStartDate = new Date("2024-06-07T00:00:00Z"); // Set your desired start date

  const calculateTimeRemaining = () => {
    const currentDate = new Date();
    const timeDifference = currentDate - serverStartDate;

    const totalSeconds = Math.floor(timeDifference / 1000);
    const remainingSeconds = initialDays * 24 * 60 * 60 - totalSeconds;

    if (remainingSeconds <= 0) {
      clearInterval(intervalId);
      console.log("Timer reached 0. Event triggered!");
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const newDays = Math.floor(remainingSeconds / (24 * 60 * 60));
    const newHours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const newMinutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const newSeconds = remainingSeconds % 60;

    return { days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds };
  };

  const [time, setTime] = useState(calculateTimeRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(calculateTimeRemaining);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); // Run the effect only once after the initial render

  return (
    <div>
      <div className=" border-3 border-blue-700 rounded-md flex gap-2">
        <div>
          <h1 className=" text-center rounded-md text-xl py-2 mb-2 px-4 md:px-7 bg-blue-600 w-full text-white">
            Days
          </h1>

          <h1 className=" text-center rounded-md text-3xl md:text-4xl py-2 mb-2 bg-blue-600 w-full text-white">{time.days}</h1>
        </div>
        <div>
          <h1 className=" text-center rounded-md text-xl py-2 mb-2 px-4 md:px-7 bg-blue-600 w-full text-white">
            Hours
          </h1>

          <h1 className=" text-center rounded-md text-3xl md:text-4xl py-2 mb-2 bg-blue-600 w-full text-white">{time.hours}</h1>
        </div>
        <div>
          <h1 className=" text-center rounded-md text-xl py-2 mb-2 px-3 bg-blue-600 w-full text-white">
            Minutes
          </h1>

          <h1 className=" text-center rounded-md text-3xl md:text-4xl py-2 mb-2 bg-blue-600 w-full text-white">{time.minutes}</h1>
        </div>
        <div>
          <h1 className=" text-center rounded-md text-xl py-2 mb-2 px-3 bg-blue-600 w-full text-white">
Seconds          </h1>

          <h1 className=" text-center rounded-md text-3xl md:text-4xl py-2 mb-2 bg-blue-600 w-full text-white">{time.seconds}</h1>
        </div>
      </div>
      
    </div>
  );
};

export default Timer;
