import React, { createRef } from "react"
import { createTable } from "../tools/TypingTest.helpers";

const TypingTestAdmin = ({ text, results, onChange, onSubmit, onDelete }) => {

    const paragraphRef = createRef();
    const resultId = createRef();
    
    //used to send the new paragraph to the container file
    const submitParagraph = (e) => {
        e.preventDefault();

        onSubmit(
            paragraphRef.current.value
        )
    }

    //used to send the id for deletion to the container file
    const deleteResult = (e) => {
        e.preventDefault();

        onDelete(
            resultId.current.value
        )
    }

    return (
        <>
            <div className="textareaGroup">
                <textarea
                    name="newParagraph"
                    type="text"
                    value={text}
                    ref={paragraphRef}
                    onChange={(e) => onChange(e.target.value)}>
                </textarea>
            </div>
            <div>
                <button
                    type="submit"
                    onClick={(e) => submitParagraph(e)}
                >Submit
                </button>
            </div>
            <div>
                {/* creates the table using the data stored in the reducer */}
                {createTable(results)}
            </div>
            <h3>Enter the Results ID to delete</h3>
            <div className="sideBySide">
                <div className="inputGroup">
                    <input 
                        ref={resultId}
                    >
                    </input>
                </div>
                <div className="spaceFromLeft">
                    <button
                        onClick={(e) => deleteResult(e)}
                    >Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default TypingTestAdmin;