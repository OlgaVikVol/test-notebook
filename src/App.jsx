import "./App.css";
import { useState } from "react";
import CardButton from "./components/CardButton/CardButton";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";

const INITIAL_DATA = [
    {
        id: 1,
        title: "Lorem",
        text: "Lorem ipsum dolor sit...",
        date: new Date(),
    },
    {
        id: 2,
        title: "Lorem2",
        text: "Lorem ipsum dolor sit...",
        date: new Date(),
    },
];

function App() {
    const [items, setItems] = useState(INITIAL_DATA);

    const addItem = (item) => {
        setItems((oldItems) => [
            ...oldItems,
            {
                text: item.text,
                title: item.title,
                date: item.date,
                id:
                    oldItems.length > 0
                        ? Math.max(...oldItems.map((i) => i.id)) + 1
                        : 0,
            },
        ]);
    };

    const sortedItems = (a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    };

    return (
        <div className="app">
            <LeftPanel>
                <Header />
                <JournalAddButton />
                <JournalList>
                    {items.length === 0 && <p>No notes yet</p>}
                    {items.length > 0 &&
                        items.sort(sortedItems).map((el) => (
                            <CardButton key={el.id}>
                                <JournalItem
                                    title={el.title}
                                    post={el.text}
                                    date={el.date}
                                />
                            </CardButton>
                        ))}
                </JournalList>
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItem} />
            </Body>
        </div>
    );
}

export default App;
