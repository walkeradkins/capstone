import "./workspace.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspaces } from "../../store/workspaces";
import { updateCard } from "../../store/cards";
import { getAllLists } from "../../store/lists";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAllCards } from "../../store/cards";
import whatnext_background from "../../Assets/Images/whatnext_background.jpg";
import { Sidebar, ListItem, WorkspaceHeader, AddList } from "../../Components";
import { useWorkspace } from "../../context/workspace-context";
import { useCardState } from "../../context/card-state-context";
import { DragDropContext } from "react-beautiful-dnd";
import { PageNotFound } from "../../Pages";
import { backgroundObject } from "../../Assets/Images";

const Workspace = ({ user }) => {
  const { currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces);
  const lists = useSelector((state) => state.lists);
  const cards = useSelector((state) => state.cards);
  const listArray = Object.values(lists);
  const [item, setItem] = useState("");
  const length = listArray.length;
  const { cardState, setCardState } = useCardState();
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [drag, setDrag] = useState("");

  const workspace = workspaces[workspaceId];
  useEffect(() => {
    dispatch(getAllWorkspaces(user.id));
    dispatch(getAllLists(workspaceId));
    dispatch(getAllCards(workspaceId));
    setCurrentWorkspace(workspaceId);
    setCardState(lists);
  }, [drag, item, workspaceId, editItem]);

  useEffect(() => {
    if (!Object.keys(workspaces).length) return;
    if (!workspaces[workspaceId]) return;

    document.body.style.backgroundImage = `url( ${backgroundObject[workspaces[workspaceId].background]} )`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflowY = "hidden";
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.style.backgroundColor = "rgba(116, 78, 116, 0.8)";
    }

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundColor = "white";
      document.body.style.overflowY = "visible";
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.style.backgroundColor = "#006ead";
      }
    };
  });

  if (!Object.keys(workspaces).length) return null;

  if (!workspace) {
    return <PageNotFound />;
  }

  const handleToggle = () => {
    setShowAdd(true);
  };

  const handleOnDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let payload = {};

    if (+source.droppableId === +destination.droppableId) {
      // if moving card on same list
      const cardList = lists[+source.droppableId].cards;
      cardList.splice(source.index, 1);
      cardList.splice(destination.index, 0, +draggableId);
      cardList.forEach((card, index) => {
        payload[card] = index;
      });
    } else {
      // update old list indices
      const startCardList = lists[+source.droppableId].cards;
      startCardList.splice(source.index, 1);
      startCardList.forEach((card, index) => {
        payload[card] = index;
      });
      // update new list indices
      const finishCardList = lists[+destination.droppableId].cards;
      finishCardList.splice(destination.index, 0, +draggableId);
      finishCardList.forEach((card, index) => {
        payload[card] = index;
      });
      payload["list_id"] = +destination.droppableId;
    }

    let updatedCard;
    try {
      updatedCard = await dispatch(updateCard(payload, draggableId));
    } catch (error) {
      alert(error);
    }

    if (updatedCard) {
      setDrag(updatedCard);
    }
  };

  return (
    <div className="workspace__wrapper" style={{ backgroundImage: `url( ${backgroundObject[workspaces[workspaceId].background]} )` }}>
      <div className="workspace__main">
        <Sidebar
          workspaces={Object.values(workspaces)}
          current={workspace}
          user={user}
        />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="workspace">
            <WorkspaceHeader workspace={workspace} user={user}/>
            <div className="list__container">
              {listArray.map((list) => {
                return (
                  <div key={list.id}>
                    <ListItem
                      props={{ list, item, setItem, editItem, setEditItem }}
                    />
                  </div>
                );
              })}
              {!showAdd && (
                <div className="workspace__list-add" onClick={handleToggle}>
                  <span className="material-symbols-outlined">add</span>
                  {!!length && <p>Add another list</p>}
                  {!length && <p>Start adding lists</p>}
                </div>
              )}
              {showAdd && (
                <AddList props={{ showAdd, setShowAdd, workspaceId }} />
              )}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Workspace;
