"use client";

import { useOptimistic } from "react";
import { IBooking } from "../types";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

const ReservationList = ({ bookings }: { bookings: IBooking[] }) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings: IBooking[], bookingId: number) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    },
  );

  const handleDelete = async (bookingId: number) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
