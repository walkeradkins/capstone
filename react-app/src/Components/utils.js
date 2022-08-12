// export const handleChange = (e, setContent, setSpaceCheck, rows, setRows) => {
//   setContent(e.target.value);

//   setSpaceCheck(e.target.value.trim().length);
//   let trows;
//   let value = e.target.value.length;
//   if (value > 175) {
//     trows = Math.ceil(value / 35);
//     if (trows > rowValue) {
//       setRows(rows + 1);
//       setRowValue(trows);
//     }
//   }

//   if (trows < rowValue) {
//     setRows(Math.ceil(value / 35));
//     setRowValue(trows);
//     if (!trows) trows = 5;
//   }
// };


export const labels = {
  0: { text: "Marketing", color: "#61bd4f" },
  1: { text: "Day", color: "#f2d600" },
  2: { text: "Remarket", color: "#ff9f1a" },
  3: { text: "Demand Marketing", color: "#c377e0" },
  4: { text: "Partners", color: "#0079bf" },
  5: { text: "Government", color: "#00c2e0" },
  6: { text: "Planning", color: "#51e898" },
  7: { text: "Happiness", color: "#ff78cb" },
  8: { text: "OEM", color: "#344563" }
}
