import { getSettings, getBookedDatesByCabinId } from "../_lib/data-service";
import { ICabin } from "../types";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

const Reservation = async ({ cabin }: { cabin: ICabin }) => {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector
        cabin={cabin}
        bookedDates={bookedDates}
        settings={settings}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservation;
