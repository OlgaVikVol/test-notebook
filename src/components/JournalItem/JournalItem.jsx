import "./JournalItem.css";

function JournalItem({ title, post, date }) {
    const formatedDate =
        date && !isNaN(Date.parse(date))
            ? new Intl.DateTimeFormat("en-US").format(new Date(date))
            : "Invalid Date";

    return (
        <>
            <h2 className="journal-item__header">{title}</h2>
            <div className="journal-item__body">
                <div className="journal-item__date">{formatedDate}</div>
                <div className="journal-item__text">{post}</div>
            </div>
        </>
    );
}

export default JournalItem;
