import React, { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { Modal } from "react-responsive-modal";
import { FaSearch } from "react-icons/fa"; // Import the search icon
import Loader from "../components/Loader";
import OWSContainer from "./OWSContainer";
import NewOWS from "./NewOWS";
import { filterWords, sortWords } from "../utils/utils";

const OWS = () => {
    const { wordUpdate } = useContext(UpdateContext);

    const [open, setOpen] = useState(false);

    const [owsWords, setOwsWords] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getOws = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/ows`;
            const res = await fetch(url);
            const data = await res.json();
            if (res.status === 200) {
                const sortedWords = sortWords(data.words);
                setOwsWords(sortedWords);
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

    const filteredWords = filterWords(owsWords, searchQuery);

    return (
        <>
            <div className="main-container-top">
                <div className="main-container-sub-top">
                    <div className="search-bar">
                        <FaSearch className="search-icon" /> {/* Add the search icon here */}
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-bar"
                        />
                    </div>
                    <div className="main-container-add">
                        <button onClick={handleOpen}>Add</button>
                    </div>
                </div>
            </div>
            <div className="main-container">
                <ul className="main-container-list">
                    {filteredWords.map((words) => (
                        <OWSContainer key={words._id} wordType="ows" words={words} />
                    ))}
                </ul>
            </div>
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