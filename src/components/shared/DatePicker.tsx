import { useEffect, useState } from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ThemeProvider, createTheme } from "@mui/material";


interface SelectDateProps {
  isOpen?: boolean;
  onChange?: (date: Dayjs | null) => void;
  value?: Dayjs | null;
  onClose?: (state: boolean) => void;
  title?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
}

const DatePicker = ({
  isOpen,
  value,
  onChange,
  onClose,
  title,
  disablePast,
  disableFuture,
}: SelectDateProps) => {
  const [selected, setSelected] = useState<Dayjs | null>(null);

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#39CDCC",
      },
    },
  });

  useEffect(() => {
    if (isOpen) {
      const parsedValue = dayjs(value);
      if (parsedValue.isValid()) {
        setSelected(parsedValue);
      } else {
        setSelected(null);
      }
    }
  }, [isOpen, value]);

  if (!isOpen) return null;
  return (
    <ThemeProvider theme={customTheme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={{
          datePickerToolbarTitle: title ? title : "SELECT DATE",
        }}
      >
        <MobileDatePicker
          open={isOpen}
          onClose={() => onClose && onClose(false)}
          value={selected}
          disablePast={disablePast}
          disableFuture={disableFuture}
          enableAccessibleFieldDOMStructure={false}
          onAccept={() => {
            if (onChange) {
              onChange(selected);
            }
            setSelected(null);
          }}
          onChange={setSelected}
          slots={{
            textField: () => <div style={{ display: "none" }} />,
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default DatePicker;
