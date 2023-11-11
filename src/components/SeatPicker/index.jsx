import { useEffect, useState } from 'react';
import SeatRow from '../SeatRow';
import './style.css';

export const SeatPicker = ({journeyId, seats, selectedSeat}) => {
  return (
    <div className="seat-picker container">
      <h2>Vyberte sedadlo</h2>
      <div className="seats">
        {seats.map((row, index) =>
          <SeatRow
            key={index}
            row={row}
            rowSelectedSeat={selectedSeat}
          />
        )}
      </div>
    </div>
  );
}

export default SeatPicker;