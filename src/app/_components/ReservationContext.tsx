"use client";

import { createContext, useContext, useState } from "react";
import { IRange, IReservationContext } from "../types";

const ReservationContext = createContext({} as IReservationContext);

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
  const [range, setRange] = useState<IRange>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};

const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context)
    throw new Error("useReservation must be used within ReservationProvider");
  return context;
};

export { ReservationProvider, useReservation };
