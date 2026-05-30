import React from "react";

type Props = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
};

function TableControler({
  page,
  totalPages,
  hasNextPage,
  onPrevPage,
  onNextPage,
}: Props) {
  return (
    <div
     className="flex w-fit flex-row justify-center items-center m-0 gap-4"
    >
      <button
        className={"p-1 border text-sm border-black rounded hover:bg-[#EDEDED] hover:border-[#E5E5E5] cursor-pointer " + (page === 1 ? 'opacity-25 cursor-default ' : 'opacity-100 ')}
        disabled={page === 1}
        onClick={onPrevPage}
      >
        Previous
      </button>

      <span className="p-1 border text-sm border-[#E5E5E5] rounded">
        Page {page} of {totalPages}
      </span>

      <button
        className={"p-1 border text-sm border-black rounded hover:bg-[#EDEDED] hover:border-[#E5E5E5] cursor-pointer " + (!hasNextPage ? 'opacity-25 cursor-default ' : 'opacity-100 ')}
        disabled={!hasNextPage}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  );
}

export default TableControler;