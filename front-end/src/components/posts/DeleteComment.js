import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getComment,
  updateComment,
} from "../../actions/comment.actions";
import { UidContext } from "../AppContext";
import { useContext } from "react";

const DeleteComment = ({ idComment, postId }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");

  const uid = useContext(UidContext);

  const handleEdit = (e) => {
    e.preventDefault();
    if (message) {
      dispatch(updateComment(idComment.id, message));
      dispatch(getComment(postId));
      setMessage("");
      setEdit(false);
    }
    if (!message) {
      alert("veuillez modifier votre texte ou l'annulez");
    }
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === idComment.author_id) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, idComment]);

  const handleDelete = () => {
    dispatch(deleteComment(idComment.id));
    dispatch(getComment(postId));
  };

  console.log(idComment.id);
  return (
    <div className="edit-comment">
      {isAuthor && edit === false && userData.admin == 0 && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      )}
      {isAuthor === true && edit === true && userData.admin == 0 && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Annuler
          </label>
          <br />
          <input
            type="text"
            name="message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            defaultValue={idComment.message}
          />
          <br />

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
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}

      {edit === false && userData.admin ? (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit" />
        </span>
      ) : (
        ""
      )}
      {userData.admin == 1 && edit === true && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Annuler
          </label>
          <br />
          <input
            id="noir"
            type="text"
            name="message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            defaultValue={idComment.message}
          />
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
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default DeleteComment;
