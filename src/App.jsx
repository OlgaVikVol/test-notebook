import "./App.css";
import CardButton from "./components/CardButton/CardButton";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContexProvider, UserContext } from "./context/user.context";
import { useState } from "react";

function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map((i) => ({
        ...i,
        date: new Date(i.date),
    }));
}

function App() {
    const [items, setItems] = useLocalStorage("data");

    const addItem = (item) => {
        const currentItems = Array.isArray(items) ? mapItems(items) : [];
        setItems([
            ...currentItems,
            {
                post: item.text,
                title: item.title,
                date: new Date(item.date),
                id:
                    currentItems.length > 0
                        ? Math.max(...currentItems.map((i) => i.id)) + 1
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
        <UserContexProvider>
            <div className="app">
                <LeftPanel>
                    <Header />
                    <JournalAddButton />
                    <JournalList>
                        {mapItems(items).length === 0 && <p>No notes yet</p>}
                        {mapItems(items).length > 0 &&
                            mapItems(items)
                                .sort(sortedItems)
                                .map((el) => (
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
        </UserContexProvider>
    );
}

export default App;
