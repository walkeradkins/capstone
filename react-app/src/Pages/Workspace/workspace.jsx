import "./workspace.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspaces } from "../../store/workspaces";
import { getAllLists } from "../../store/lists";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAllCards } from "../../store/cards";
import whatnext_background from "../../Assets/Images/whatnext_background.jpg";

import { Sidebar, ListItem, WorkspaceHeader, AddList } from "../../Components";

const Workspace = ({ user }) => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces);
  const lists = useSelector((state) => state.lists);
  const cards = useSelector((state) => state.cards);
  const listArray = Object.values(lists);
  const length = listArray.length
  const [showAdd, setShowAdd] = useState(false);

  // useEffect(() => {

  // }, [workspaceId, dispatch, lists]);

  useEffect(() => {
    dispatch(getAllCards(workspaceId))
    dispatch(getAllWorkspaces(user.id));
    dispatch(getAllLists(workspaceId));
  }, []);

  useEffect(() => {
    // document.body.style.backgroundImage = `url( ${whatnext_background} )`;
    document.body.style.backgroundImage = `url( ${whatnext_background} )`;
    document.body.style.backgroundRepeat= 'no-repeat';
    document.body.style.backgroundAttachment= 'fixed';
    document.body.style.backgroundPosition= 'center';
    document.body.style.backgroundSize= 'cover';

    return () => {
      document.body.style.backgroundImage = ''
      document.body.style.backgroundColor = 'white'
    }
  }, [workspaceId])

  if (!Object.keys(workspaces).length) return null;

  const workspace = workspaces[workspaceId];

  const handleToggle = () => {
    setShowAdd(true);
  };

  return (
    <div
      className="workspace__wrapper"
      // style={{ backgroundImage: `url(${whatnext_background})` }}
    >
      <div className="workspace__main">
        <Sidebar
          workspaces={Object.values(workspaces)}
          current={workspace}
          user={user}
        />
        <div className="workspace">
          <WorkspaceHeader workspace={workspace} />
          <div className="list__container">
            {listArray.map((list) => {
              return (
                <div key={list.id}>
                  <ListItem list={list} cards={
                    list.cards.map(id =>
                      cards[id])}/>
                </div>
              );
            })}
            {!showAdd && (
              <div className="workspace__list-add" onClick={handleToggle}>
                <span className="material-symbols-outlined">add</span>
                {!!length && <p>Add another list</p>}
                {!length && (<p>Start adding lists</p>)}
              </div>
            )}
            {showAdd && (
              <AddList setShowAdd={setShowAdd} workspaceId={workspaceId}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
