"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Capacity } from "../types";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter =
    (searchParams.get("capacity") as Capacity) ?? Capacity.all;

  const handleFilter = (filter: Capacity) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex border border-primary-800">
      <Button
        filter={Capacity.all}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All cabins
      </Button>
      <Button
        filter={Capacity.small}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter={Capacity.medium}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;6 guests
      </Button>
      <Button
        filter={Capacity.large}
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        7&mdash;8 guests
      </Button>
    </div>
  );
};

const Button = ({
  children,
  filter,
  activeFilter,
  handleFilter,
}: {
  children: string;
  filter: Capacity;
  activeFilter: Capacity;
  handleFilter: (filter: Capacity) => void;
}) => {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
};

export default Filter;
