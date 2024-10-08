import React, { useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { AuthContext } from "../context/AuthContext";

const DeleteEntry = ({ entryType, entry, onClose }) => {
    const { setWordUpdate } = useContext(UpdateContext);
    const { userRole } = useContext(AuthContext);

    const entryId = entry._id;

    const handleSubmit = async () => {
        if (userRole === "admin") {
            const url = `${process.env.REACT_APP_SERVER_URL}/${entryType}/${entryId}`;
            const res = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                onClose();
                setWordUpdate((prev) => !prev);
            } else {
                window.alert(data.error);
            }
        } else {
            window.alert("Only admin can delete");
        }
    };

    return (
        <div className="modal-content">
            <h3>
                Are you sure you want to delete{" "}
                {entryType !== "ows" && <strong>{entry[entryType]}</strong>}?
            </h3>
            <div className="modal-actions">
                <button className="submit-button" onClick={onClose}>
                    Cancel
                </button>
                <button className="submit-button" onClick={handleSubmit}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteEntry;
