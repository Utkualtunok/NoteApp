import React from 'react'

const Note = ({ id, text, backgroundColor, editHandler, deleteHandler }) => {
    return (
        <div
            style={{ backgroundColor: backgroundColor }} // Arka plan rengi burada uygulanıyor
            className="note"
        >
            <p>{text}</p>
            <button onClick={() => editHandler(id, text)}>Edit</button>
            <button onClick={() => deleteHandler(id)}>Delete</button>
        </div>
    );
};

export default Note;