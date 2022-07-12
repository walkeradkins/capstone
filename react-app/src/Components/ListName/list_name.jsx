import "./list-name.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateList } from "../../store/lists";
import ListDelete from "../ListDelete/list-delete";
import TextareaAutosize from "react-textarea-autosize";

const ListName = ({ list }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [edit, setEdit] = useState(false);

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
        const listNames = Array.from(
          document.getElementsByClassName("input__active-list")
        );
        listNames.forEach((element) => element.blur());
        return closeEdit(e);
      }
    });
    return () => document.removeEventListener("click", closeEdit);
  }, [edit, content]);

  if (!list) return null;
  const { title, id } = list;

  return (
    <div className="list__header-items">
      <p>{errors[0]}</p>
      <TextareaAutosize
        id="listname__input"
        className={edit ? "input__active-list" : "input__inactive-list"}
        value={content}
        onClick={trueEdit}
        maxLength={249}
        minRows={1}
        onChange={(e) => setContent(e.target.value)}
      />
      <ListDelete list={list} />
    </div>
  );
};

export default ListName;
