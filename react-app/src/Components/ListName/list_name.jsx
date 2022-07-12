import "./list-name.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateList } from "../../store/lists";
import ListDelete from "../ListDelete/list-delete";

const ListName = ({ list }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(false);
  const [rowValue, setRowValue] = useState(5);
  const [spaceCheck, setSpaceCheck] = useState(content.trim().length);
  const [rows, setRows] = useState(
    content.length < 21 ? 1 : Math.ceil(content.length / 21)
  );

  const trueEdit = (e) => {
    e.stopPropagation();
    e.target.select();
    if (edit) return;
    setEdit(true);
  };

  useEffect(() => {
    setContent(title);
  }, [dispatch]);

  useEffect(() => {
    if (!edit) return;

    const closeEdit = (e) => {
      const errors = [];
      // if (content.length > 49) {
      //   errors.push("Please keep list name to under 50 characters");
      // }
      setErrors(errors);

      const payload = {
        title: content.trim(),
      };

      if (!errors.length) {
        let updatedName;
        const updateData = async () => {
          try {
            updatedName = await dispatch(updateList(payload, id));
          } catch (error) {
            alert(error);
          }
        };

        updateData();
        setEdit(false);
      }
    };

    document.addEventListener("click", closeEdit);
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const listNames = Array.from(document.getElementsByClassName("input__active-list"));
        listNames.forEach(element => element.blur())
        return closeEdit(e);
      }
    });
    return () => document.removeEventListener("click", closeEdit);
  }, [edit, content]);

  if (!list) return null;
  const { title, id } = list;

  const handleChange = (e) => {
    setContent(e.target.value);
    setSpaceCheck(e.target.value.trim().length);
    // let trows;
    let value = e.target.value.length;
    if (value < 21) {
      console.log('value":: ', value)
      setRows(1)
    } else setRows(Math.ceil(value / 21));
    // if (value < 29) {
    //   setRows(1);
    //   return;
    // }
    // if (value >= 30) {
    //   trows = Math.ceil(value / 23);
    //   if (trows > rowValue) {
    //     setRows(rows + 1);
    //     setRowValue(trows);
    //   }
    // }
    // if (trows < rowValue) {
    //   setRows(Math.ceil(value / 23));
    //   setRowValue(trows);
    //   if (!trows) trows = 1;
    // }
  };

  return (
    <div className='list__header-items'>
      <p>{errors[0]}</p>
      <textarea
        id='listname__input'
        className={edit ? "input__active-list" : "input__inactive-list"}
        value={content}
        onClick={trueEdit}
        rows={rows}
        maxLength={249}
        onChange={handleChange}
      />
      <ListDelete list={list} />
    </div>
  );
};

export default ListName;
