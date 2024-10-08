import React, { useState, useContext, useEffect } from "react";
import { UpdateContext } from "../../context/UpdateContext";
import { AuthContext } from "../../context/AuthContext";
import { trimCapitalize } from "../../utils/utils";

const NewWord = ({ onClose }) => {
    const { userRole } = useContext(AuthContext);
    const { setWordUpdate } = useContext(UpdateContext);
    const [newWord, setNewWord] = useState({
        word: "",
        meanings: [
            {
                definition: "",
                synonyms: "",
                antonyms: "",
                example: "",
            },
        ],
    });
    const [error, setError] = useState("");

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "word") {
            setNewWord({
                ...newWord,
                [name]: value,
            });
        } else {
            const newMeanings = newWord.meanings.map((meaning, i) => {
                if (i === index) {
                    return { ...meaning, [name]: value };
                }
                return meaning;
            });
            setNewWord({
                ...newWord,
                meanings: newMeanings,
            });
        }
    };

    const handleAddMeaning = () => {
        setNewWord({
            ...newWord,
            meanings: [
                ...newWord.meanings,
                {
                    definition: "",
                    synonyms: "",
                    antonyms: "",
                    example: "",
                },
            ],
        });
    };

    const handleDeleteMeaning = (index) => {
        setNewWord({
            ...newWord,
            meanings: newWord.meanings.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = async (e) => {
        const { word, meanings } = newWord;

        const finalWord = trimCapitalize(word);

        if (finalWord === "") {
            setError("Word is required");
            return;
        }

        // Filter out empty meanings and validate
        const updatedMeanings = meanings.filter((meaning) => {
            const hasDefinition = meaning.definition.trim() !== "";
            const hasSynonyms = meaning.synonyms.trim() !== "";
            const hasAntonyms = meaning.antonyms.trim() !== "";
            const hasExample = meaning.example.trim() !== "";

            return hasDefinition || hasSynonyms || hasAntonyms || hasExample;
        });

        // Check if there are no valid meanings
        if (updatedMeanings.length === 0) {
            setError("Please fill out at least one entry");
            return;
        }

        const finalMeanings = updatedMeanings.map((meaning) => ({
            definition: meaning.definition.trim(),
            synonyms:
                meaning.synonyms.trim().length > 0
                    ? meaning.synonyms.split(",").map((item) => item.trim().toLowerCase())
                    : [],
            antonyms:
                meaning.antonyms.trim().length > 0
                    ? meaning.antonyms.split(",").map((item) => item.trim().toLowerCase())
                    : [],
            example: meaning.example.trim(),
        }));

        if (userRole === "admin") {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/word/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ word: finalWord, meanings: finalMeanings }),
            });
            const data = await res.json();
            if (res.status === 200) {
                onClose();
                setWordUpdate((prev) => !prev);
            } else {
                setError(data.error);
            }
        } else {
            setError("Only admin can add");
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="modal-content">
            <h3>
                <strong>Add New Word</strong>
            </h3>
            <div className="form-group">
                <div className="form-sub-group">
                    <div className="form-group-name">Word:</div>
                    <input
                        type="text"
                        name="word"
                        value={newWord.word}
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
            </div>
            {newWord.meanings.map((meaning, index) => (
                <div key={index} className={`part-group ${index === 0 ? "first-part-group" : ""}`}>
                    <div className="form-group">
                        <div className="form-sub-group">
                            <div className="form-group-name">Definition:</div>
                            <input
                                type="text"
                                name="definition"
                                value={meaning.definition}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-sub-group">
                            <div className="form-group-name">Synonyms (comma-separated):</div>
                            <input
                                type="text"
                                name="synonyms"
                                value={meaning.synonyms}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-sub-group">
                            <div className="form-group-name">Antonyms (comma-separated):</div>
                            <input
                                type="text"
                                name="antonyms"
                                value={meaning.antonyms}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-sub-group">
                            Example:
                            <input
                                type="text"
                                name="example"
                                value={meaning.example}
                                onChange={(e) => handleChange(e, index)}
                            />
                        </div>
                    </div>
                    {index > 0 && (
                        <button
                            className="delete-part-button"
                            type="button"
                            onClick={() => handleDeleteMeaning(index)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
            <div className="add-part">
                {error && <p className="error-message">*{error}</p>}
                <button className="add-part-button" type="button" onClick={handleAddMeaning}>
                    + Add Meaning
                </button>
            </div>
            <div className="modal-actions">
                <button type="button" className="submit-button" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" className="submit-button" onClick={handleSubmit}>
                    Add Word
                </button>
            </div>
        </div>
    );
};

export default NewWord;
