//checks if the value is null or undefined
export const isNullOrUndefined = (value) => {
    if(value === null || value === undefined) {
        return true;
    }
    else return false;
};

export const noOp = () => {
};

//checks if the value is null
export const isNull = (value) => {
    if (value === null) {
        return true;
    }
    else return false;
};

export const createTable = (data = []) => {
    return (
        <table className="styled-table">
            {/* creates the headers */}
            <thead>
            <tr>
                <th>Results ID</th>
                <th>Paragraph ID</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Time Remaining</th>
                <th>Completed Date</th>
            </tr>
            </thead>
            {/* creates the rows */}
            <tbody>
            {/* maps through all items in the recieved object */}
            {data.map((row, index) => (
                <tr key={index}>
                <td>{row.resultsId}</td>
                <td>{row.paragraphId}</td>
                <td>{row.wpm}</td>
                <td>{row.accuracy}</td>
                <td>{row.timeRemaining}</td>
                <td>{row.completedDate}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}