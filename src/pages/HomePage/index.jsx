import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { SeatPicker } from '../../components/SeatPicker';

import { useNavigate } from "react-router-dom";


export const HomePage = () => {
  const [journey, setJourney] = useState(null);
  const navigate = useNavigate();

  const handleJourneyChange = (data) => {
    console.log(data);
    setJourney(data);
  }

  const handleBuy = () => {
    const postReservation = async () => {
      const response = await fetch('https://apps.kodim.cz/daweb/leviexpress/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          seat: journey.autoSeat,
          journeyId: journey.journeyId,
        }),
      });
      const data = await response.json();

      navigate(`/reservation/${data.results.reservationId}`);
    }

    postReservation();
  }


  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />

      { journey !== null
        ? <>
            <JourneyDetail journey={journey} />
            <SeatPicker
              journeyId={journey.journeyId}
              seats={journey.seats}
              selectedSeat={journey.autoSeat}
            />

            <div className="controls container">
              <button className="btn btn--big" type="button" onClick={handleBuy}>Rezervovat</button>
            </div>
          </>
        : null
      }
    </main>
  );
};
