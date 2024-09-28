import { AdapterUser } from "next-auth/adapters";

export interface IBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
}

export interface IBookingRowProps
  extends Omit<
    IBooking,
    | "cabinPrice"
    | "extrasPrice"
    | "hasBreakfast"
    | "isPaid"
    | "observations"
    | "cabinId"
    | "guestId"
  > {
  guests: Pick<IGuest, "fullName" | "email">;
  cabins: Pick<ICabin, "name">;
}

export interface IBookingDetailsProps extends IBooking {
  cabins: ICabin;
  guests: IGuest;
}

export interface ICabin {
  id: number;
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: File | string;
  created_at: string;
}

export type ICabinMutation = Omit<ICabin, "id" | "created_at">;

export interface IGuest {
  id: number;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  nationalFlag: string;
  created_at: string;
}

export enum Setting {
  minBookingLength = "minBookingLength",
  maxBookingLength = "maxBookingLength",
  maxGuestsPerBooking = "maxGuestsPerBooking",
  breakfastPrice = "breakfastPrice",
}

export interface ISetting {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  avatar: File | string;
  password: string;
}

export enum Capacity {
  all = "all",
  small = "small",
  medium = "medium",
  large = "large",
}

export interface UserWithGuestId extends AdapterUser {
  guestId: number;
}

export interface IRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface IReservationContext {
  range: IRange;
  setRange: React.Dispatch<React.SetStateAction<IRange>>;
  resetRange: () => void;
}
