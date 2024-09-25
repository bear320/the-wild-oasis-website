"use server";

import { revalidatePath } from "next/cache";
import { UserWithGuestId } from "../types";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

export const updateGuest = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const nationalID = formData.get("nationalID");
  const [nationality, nationalFlag] = formData
    .get("nationality")
    ?.toString()
    .split("%") ?? ["Unknown", ""];

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID as string))
    throw new Error("Please provide a valid national ID!");

  const updateData = { nationality, nationalFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", (session.user as UserWithGuestId)?.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
};

export const deleteReservation = async (bookingId: number) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  const guestBookings = await getBookings(
    +(session.user as UserWithGuestId).guestId!,
  );
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You can only delete your own reservations!");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
};

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};
