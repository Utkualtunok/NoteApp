import React, { useEffect, useState } from 'react';
import CreateNote from './CreateNote';
import './notes.css';
import { v4 as uuid } from 'uuid';
import Note from './Note';

const Notes = () => {
    const [inputText, setInputText] = useState('');
    const [notes, setNotes] = useState([]);
    const [editToggle, setEditToggle] = useState(null);

    const editHandler = (id, text) => {
        setEditToggle(id);
        setInputText(text);
    };

    // Rastgele bir arka plan rengi oluşturmak için fonksiyon
    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const saveHandler = () => {
        if (editToggle) {
            setNotes(
                notes.map((note) =>
                    note.id === editToggle
                        ? { ...note, text: inputText }
                        : note
                )
            );
        } else {
            setNotes((prevNotes) => [
                ...prevNotes,
                {
                    id: uuid(),
                    text: inputText,
                    backgroundColor: generateRandomColor(), // Yeni not için rastgele arka plan rengi
                },
            ]);
        }
        setInputText('');
        setEditToggle(null);
    };

    const deleteHandler = (id) => {
        const newNotes = notes.filter((n) => n.id !== id);
        setNotes(newNotes);
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Notes'));
        if (data) {
            setNotes(data);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('Notes', JSON.stringify(notes));
    }, [notes]);

    return (
        <div className="notes">
            {notes.map((note) =>
                editToggle === note.id ? (
                    <CreateNote
                        inputText={inputText}
                        setInputText={setInputText}
                        saveHandler={saveHandler}
                    />
                ) : (
                    <Note
                        key={note.id}
                        id={note.id}
                        text={note.text}
                        backgroundColor={note.backgroundColor} // Arka plan rengini Note bileşenine geçiyoruz
                        editHandler={editHandler}
                        deleteHandler={deleteHandler}
                    />
                )
            )}
            {editToggle === null ? (
                <CreateNote
                    inputText={inputText}
                    setInputText={setInputText}
                    saveHandler={saveHandler}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default Notes;
