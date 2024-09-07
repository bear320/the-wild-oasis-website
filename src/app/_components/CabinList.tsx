import { unstable_noStore as noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import { ICabin } from "../types";
import CabinCard from "./CabinCard";

const CabinList = async ({ filter }: { filter: string }) => {
  noStore();

  const cabins: Partial<ICabin>[] = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins: Partial<ICabin>[] = [];

  if (filter === "all") displayedCabins = [...cabins];
  else if (filter === "small")
    displayedCabins = [...cabins.filter((cabin) => cabin.maxCapacity! <= 3)];
  else if (filter === "medium")
    displayedCabins = [
      ...cabins.filter(
        (cabin) => cabin.maxCapacity! >= 4 && cabin.maxCapacity! <= 6,
      ),
    ];
  else if (filter === "large")
    displayedCabins = [
      ...cabins.filter(
        (cabin) => cabin.maxCapacity! >= 7 && cabin.maxCapacity! <= 8,
      ),
    ];

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
