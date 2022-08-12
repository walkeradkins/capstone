import "./label-dropdown.css";
import { useWorkspace } from "../../context/workspace-context";
import { useSelector } from "react-redux";

const LabelDropDown = ({ props }) => {
  const { currentWorkspace } = useWorkspace();
  let workspaceLabels = useSelector(
    (state) => state.workspaces[currentWorkspace].labels
  );
  workspaceLabels = JSON.parse(workspaceLabels);
  const labelsArray = Object.values(workspaceLabels);
  const { card, setShowDrop, labelState, setLabelState } = props;
  let { labels } = card;

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

  return (
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
          <div className="label__span" key={label.color}>
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
            <span className="material-symbols-outlined label__edit">edit</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelDropDown;
