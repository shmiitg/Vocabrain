import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "react-responsive-modal";
import Loader from "../../components/Loader";
import OWSContainer from "./OWSContainer";
import NewOWS from "./NewOWS";
import { filterOws } from "../../utils/filter";
import { sortOws } from "../../utils/sort";

const OWS = () => {
    const { user } = useContext(AuthContext);
    const { wordUpdate } = useContext(UpdateContext);
    const { searchQuery } = useContext(SearchContext);

    const [open, setOpen] = useState(false);

    const [owsWords, setOwsWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getOws = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/ows`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                setOwsWords(sortOws(data.ows));
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getOws();
    }, [wordUpdate]);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    const filteredOWS = filterOws(owsWords, "", searchQuery);

    return (
        <>
            <div className="main-container">
                <div className="main-container-list">
                    {filteredOWS.map((ows) => (
                        <OWSContainer key={ows._id} ows={ows} />
                    ))}
                </div>
            </div>
            {user && (
                <button className="add-button" onClick={handleOpen}>
                    Add
                </button>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                showCloseIcon={false}
                closeOnOverlayClick={false}
                center
            >
                <NewOWS onClose={handleClose} />
            </Modal>
        </>
    );
};

export default OWS;
