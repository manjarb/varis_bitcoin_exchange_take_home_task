import { format } from "date-fns";
import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { ExchangeRate } from "../../../interfaces/exchange.interface";

interface BitcoinExchangeTableProps {
  data: ExchangeRate[];
}

export function BitcoinExchangeTable({ data }: BitcoinExchangeTableProps) {
  const columns: GridColDef[] = [
    { field: "symbol", flex: 1, headerName: "Symbol" },
    { field: "rate", flex: 1, headerName: "Rate" },
    // TODO New Api do not have time so need to comment out
    // {
    //   field: "time",
    //   headerName: "Time",
    //   minWidth: 200,
    //   valueGetter: (params: GridValueGetterParams) => {
    //     const date = new Date(params.row.time);
    //     return format(date, "dd MMMM yyyy H:mma");
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      minWidth: 160,
      renderCell: (params) => {
        return (
          <Link to={`exchange/${params.row.symbol}`}>
            <Button variant="contained">Detail</Button>
          </Link>
        );
      },
    },
  ];

  return (
    <DataGrid
      autoHeight
      rows={data}
      columns={columns}
      pageSize={20}
      rowsPerPageOptions={[20]}
      getRowId={(row) => `exchange-table-${row.symbol}`}
    />
  );
}
