import "./label-dropdown.css";
import { useWorkspace } from "../../context/workspace-context";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateWorkspace } from '../../store/workspaces'

const LabelDropDown = ({ props }) => {
  const { currentWorkspace } = useWorkspace();
  const dispatch = useDispatch();
  const [labelEdit, setLabelEdit] = useState(false);
  const [content, setContent] = useState("");
  const [index, setIndex] = useState()
  let workspaceLabels = useSelector(
    (state) => state.workspaces[currentWorkspace].labels
  );
  workspaceLabels = JSON.parse(workspaceLabels);
  const labelsArray = Object.values(workspaceLabels);
  const { card, setShowDrop, labelState, setLabelState } = props;
  let { labels } = card;
  const [color, setColor] = useState("");

  if (labels) labels = JSON.parse(labels);

  const changeTempState = async (i) => {
    if (!labelState) setLabelState([i]);
    else {
      const newState = [...labelState];
      if (newState.includes(i)) {
        const ind = newState.indexOf(i);
        newState.splice(ind, 1);
        setLabelState(newState);
      } else setLabelState([...labelState, i]);
    }
  };

  const handleNewColor = (i) => {
    setColor(workspaceLabels[i].color);
    setIndex(i);
  }

  const handleSubmit = async () => {
    workspaceLabels[index].text = content;
    workspaceLabels[index].color = color;

    const data = JSON.stringify(workspaceLabels);
    const payload = {
      labels: data
    }

    await dispatch(updateWorkspace(payload, currentWorkspace))
  }

  const handleLabelEdit = (i) => {
    handleToggle();
    setContent(workspaceLabels[i].text);
    setColor(workspaceLabels[i].color);
    setIndex(i);
  };

  const handleToggle = () => {
    setLabelEdit((prev) => !prev);
  };

  return (
    <>
      <div className="label-select__container">
        <p className="label-select__header">Labels</p>
        <span
          className="material-symbols-outlined exit__label"
          onClick={() => setShowDrop(false)}
        >
          close
        </span>
        <div className="underline" />
        <div className="labels__container">
          {labelsArray.map((label, i) => (
            <div className="label__span" key={i}>
              <div
                className="label__select"
                style={{ backgroundColor: `${label.color}` }}
                onClick={() => changeTempState(i)}
              >
                <p className="label__select-text">{label.text}</p>
                {labelState && labelState.includes(i) && (
                  <span className="material-symbols-outlined label__select-text check">
                    done
                  </span>
                )}
              </div>
              <span
                className="material-symbols-outlined label__edit"
                onClick={() => handleLabelEdit(i)}
              >
                edit
              </span>
            </div>
          ))}
        </div>
      </div>
      {labelEdit && (
        <div className="label-select__container">
          <div className="label-change__header">
            <span
              className="material-symbols-outlined label__back"
              onClick={handleToggle}
            >
              chevron_left
            </span>
            <p className="label-change__header-text">Change Label</p>
          </div>
          <div className="underline" />
          <input
            className="label__input"
            value={content}
            maxLength={30}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className='color__text'>Select a color</p>
          <div className="color__container">
            {labelsArray.map((label, i) => (
              <div
                className="color__picker"
                key={i}
                style={{ backgroundColor: `${label.color}` }}
                value={workspaceLabels[i].color}
                onClick={() => handleNewColor(i)}
              >
                {workspaceLabels[i].color === color && (
                  <span className="material-symbols-outlined color__check">
                    done
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="label-edit__button-container">
            <button className="edit-label__submit" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LabelDropDown;
