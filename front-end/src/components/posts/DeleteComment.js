import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../actions/comment.actions";
import { UidContext } from "../AppContext";
import { useContext } from "react";

const DeleteComment = ({ idComment, postId, postsId }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  console.log(userData.admin);
  const uid = useContext(UidContext);
  const handleEdit = (e) => {};

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === idComment.author_id) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, idComment]);

  const handleDelete = (e) => {
    dispatch(deleteComment(idComment.id));
  };

  console.log(idComment.id);
  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      )}
      {isAuthor === true && edit === true && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("voulez-vous supprimer ce commentaire ?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg " alt="corbeil" />
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default DeleteComment;
