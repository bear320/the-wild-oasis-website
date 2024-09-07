"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter =
    (searchParams.get("capacity") as "all" | "small" | "medium" | "large") ??
    "all";

  const handleFilter = (filter: "all" | "small" | "medium" | "large") => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex border border-primary-800">
      <Button
        filter="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;6 guests
      </Button>
      <Button
        filter="large"
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
  filter: "all" | "small" | "medium" | "large";
  activeFilter: "all" | "small" | "medium" | "large";
  handleFilter: (filter: "all" | "small" | "medium" | "large") => void;
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
