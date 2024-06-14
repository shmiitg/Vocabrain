import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import WordContainer from "../components/WordContainer";
import { filterWords, sortWords } from "../utils/utils";

const OWS = () => {
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
        } catch (err) {}
    };

    useEffect(() => {
        getOws();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    const filteredWords = filterWords(owsWords, searchQuery);

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-bar"
                />
            </div>
            <div className="main-container">
                <h2 className="main-container-heading">One Word Substitution</h2>
                <ul className="main-container-list">
                    {filteredWords.map((word) => (
                        <WordContainer key={word._id} word={word} />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default OWS;
