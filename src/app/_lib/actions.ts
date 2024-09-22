"use server";

import { UserWithGuestId } from "../types";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export const updateGuest = async (formData: FormData) => {
  console.log("Form data: ", formData);

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

  return data;
};

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};
