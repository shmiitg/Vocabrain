import React, { useState } from "react";
import WordFrame from "./WordFrame";

const MainScreen = ({ words }) => {
    const [selectedAlphabet, setSelectedAlphabet] = useState("A");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter words based on selected alphabet
    const filteredWords = words.filter(
        (word) =>
            word.word.toLowerCase().startsWith(selectedAlphabet.toLowerCase()) &&
            word.word.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the filtered words alphabetically
    filteredWords.sort((a, b) => {
        const wordA = a.word.toLowerCase();
        const wordB = b.word.toLowerCase();
        if (wordA < wordB) {
            return -1;
        }
        if (wordA > wordB) {
            return 1;
        }
        return 0;
    });

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
            <div className="alphabet-nav">
                <div className="alphabets">
                    {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
                        <button
                            key={letter}
                            onClick={() => setSelectedAlphabet(letter)}
                            className={selectedAlphabet === letter && "selected"}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            <div className="MainScreen">
                <ul className="MainScreen-list">
                    {filteredWords.map((word) => (
                        <li key={word.word} className="MainScreen-item">
                            <WordFrame word={word} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MainScreen;
