import React from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { Item } from "../../types";

dayjs.extend(jalaliday);

type Props = {
  tableItems: Item[];
};

type TableField = {
  id: number;
  name: string;
  value: keyof Item;
};

function Table({ tableItems }: Props) {
  const tableField: TableField[] = [
    {
      id: 1,
      name: "ID",
      value: "id",
    },
    {
      id: 2,
      name: "Title",
      value: "title",
    },
    {
      id: 3,
      name: "Description",
      value: "description",
    },
    {
      id: 4,
      name: "Created At",
      value: "createdAt",
    },
  ];

  const renderField = (
    item: Item,
    field: TableField
  ) => {
    if (field.value === "createdAt") {
      return dayjs(item.createdAt)
        .calendar("jalali")
        .locale("fa")
        .format("YYYY/MM/DD HH:mm");
    }
    return item[field.value];
  };

  return (
    <table
      className="min-w-[700px] w-full p-10 border border-[#E5E5E5] border-collapse"
    >
      <thead className="border border-[#E6E6E6]">
        <tr>
          {tableField.map((field) => (
            <th key={field.id} className="items-center justify-center p-4 border border-[#E6E6E6] text-lg">
              {field.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border border-[#E6E6E6]">
        {tableItems.map((item) => (
          <tr key={item.id} className="items-center justify-center text-center m-auto border border-[#E6E6E6] hover:bg-[#eee]">
            {tableField.map((field) => (
              <td key={field.id} className="border border-[#E6E6E6] p-3 text-base whitespace-nowrap">
                {renderField(item, field)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;