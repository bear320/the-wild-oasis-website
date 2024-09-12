import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export const GET = async (
  request: Request,
  { params }: { params: { cabinId: string } },
) => {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(+cabinId),
      getBookedDatesByCabinId(+cabinId),
    ]);

    return Response.json({
      cabin,
      bookedDates,
    });
  } catch {
    return Response.json({ message: "Cabin not found" }, { status: 404 });
  }
};

export const POST = async () => {};
