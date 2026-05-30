import React , { useEffect, useState } from "react";
import "./style.css";
import jalaliday from "jalaliday";
import dayjs from "dayjs";
import { Item } from "./types";
import { fetchItems } from "./api";
import Table from "./components/Table/Table";
import TableControler from "./components/Table/TableControler";
import { Loading } from "./components/Loading/Loading";
import PageSizeSelector from "./components/Table/TablePageSizeSelector";

dayjs.extend(jalaliday);

function App() {
  const [page, setPage] = useState(() => Number(localStorage.getItem("page")) || 1);
  const [pageSize, setPageSize] = useState(() => Number(localStorage.getItem("pageSize" )) || 5);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [total, setTotal] = useState(0);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    const controller = new AbortController();

    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const skip =(page - 1) * pageSize;
        const response =
          await fetchItems(
            skip,
            pageSize,
            controller.signal
          );

        setItems(response.data);
        setTotal(response.total);
      } catch (err) {
        if ( err instanceof Error && err.name === "CanceledError" ) {
          return;
        }

        setError( err instanceof Error  ? err.message  : "Something went wrong!!!" );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    localStorage.setItem(
      "page",
      page.toString()
    );

    localStorage.setItem(
      "pageSize",
      pageSize.toString()
    );

    loadItems();

    return () => {
      controller.abort();
    };
  }, [page, pageSize]);


  const handlePageSizeChange = ( e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  const nextPage = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  const prevPage = () => {
    setPage((p) => Math.max(p - 1, 1));
  };


  return (
    <div className="px-4 py-10 md:px-8 xl:p-16 flex flex-col gap-y-4 overflow-x-hidden overflow-y-auto scroll-smooth w-full xl:w-5/6 mx-auto">
      {!error && <h1 className="w-fit mx-auto text-2xl font-bold mb-4 ">Items Table</h1>}

      {loading && <Loading/>}

      {error && (
        <p className="flex text-red-700 text-xl p-20 font-semibold m-auto w-full h-full justify-center items-center border border-red-500">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="flex flex-col-reverse gap-2 sm:flex-row justify-between items-center">
            <PageSizeSelector
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
            <TableControler
            page={page}
            totalPages={totalPages}
            hasNextPage={page * pageSize < total}
            onPrevPage={prevPage}
            onNextPage={nextPage}
            />
          </div>
          <div className="w-full overflow-x-auto">
            <Table tableItems={items}/>
          </div>
        </>
      )}
    </div>
  );
}

export default App;