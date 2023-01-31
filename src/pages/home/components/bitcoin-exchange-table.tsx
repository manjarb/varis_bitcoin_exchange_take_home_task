import { format } from "date-fns";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ExchangeRate } from "../../../hooks/use-bitcoin-exchange-rate";

interface BitcoinExchangeTableProps {
  data: ExchangeRate[];
}

export function BitcoinExchangeTable({ data }: BitcoinExchangeTableProps) {
  const columns: GridColDef[] = [
    { field: "asset_id_quote", flex: 1, headerName: "Asset Id" },
    { field: "rate", flex: 1, headerName: "Rate" },
    {
      field: "time",
      headerName: "Time",
      minWidth: 200,
      valueGetter: (params: GridValueGetterParams) => {
        const date = new Date(params.row.time);
        return format(date, "dd MMMM yyyy H:mma");
      },
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        getRowId={(row) => row.asset_id_quote}
      />
    </div>
  );
}
