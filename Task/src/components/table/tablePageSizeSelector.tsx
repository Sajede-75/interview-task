import React from "react";

type Props = {
  pageSize: number;
  onPageSizeChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

function PageSizeSelector({
  pageSize,
  onPageSizeChange,
}: Props) {

  const pageSizeOptions = [5, 10, 15, 20];
  return (
    <div
      className="flex flex-row gap-x-2 h-fit w-fit"
    >
      <label htmlFor="page-size">
        Page Size:
      </label>

      <select
        id="page-size"
        value={pageSize}
        onChange={onPageSizeChange}
        className="border border-[#E5E5E5] min-w-10"
      >
        {pageSizeOptions.map((size) => (
          <option
            key={size}
            value={size}
          >
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PageSizeSelector;