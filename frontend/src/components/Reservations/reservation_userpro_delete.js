import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeReserv } from "../../store/reservs";
import { useHistory } from "react-router-dom";
// import "./reviews.css"

function DeleteReservationProfileButton({ reservationId }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    setIsDeleting(true);
    dispatch(removeReserv(reservationId)).then(() => {
      setIsDeleting(false);
      history.push("/profile");
    });
  };

  return (
    <div className="delete-whole">
      <button class="delete-reserv" onClick={() => setIsDeleting(true)}>Delete</button>
      {isDeleting && (
        <div className="delete-con1">
          <span className="deleteor1">Are you sure you want to delete this reservation?</span>
          <div className="level">
          <div className="del-but-yes">
          <button className="del-yes1" onClick={handleDelete}>Yes</button>
          <button className="del-no1" onClick={() => setIsDeleting(false)}>No </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteReservationProfileButton;