import React, { useState, useEffect } from "react";
import WordFrame from "./WordFrame";

const RevisionPage = ({ words }) => {
    const [revisionWords, setRevisionWords] = useState([]);

    useEffect(() => {
        const getRandomWords = (list, count) => {
            const shuffled = list.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        };
        const selectedWords = getRandomWords(words, 10);

        // Sort the random words alphabetically
        selectedWords.sort((a, b) => {
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
        setRevisionWords([...selectedWords]);
    }, [words]);

    return (
        <div className="MainScreen">
            <h2 className="MainScreen-heading">Daily Revision</h2>
            <ul className="MainScreen-list">
                {revisionWords.map((word) => (
                    <li key={word.word} className="MainScreen-item">
                        <WordFrame word={word} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RevisionPage;
