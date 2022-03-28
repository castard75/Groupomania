import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(props.id)).then(() => {
      window.location = "/";
    });
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="delete" />
    </div>
  );
};

export default DeleteCard;
