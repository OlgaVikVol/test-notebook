import "./App.css";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context";
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
    const [selectedItem, setSelectedItem] = useState(null);

    const addItem = (item) => {
        if (!item.id) {
            const currentItems = Array.isArray(items) ? mapItems(items) : [];
            setItems([
                ...currentItems,
                {
                    ...item,
                    date: new Date(item.date),
                    id:
                        currentItems.length > 0
                            ? Math.max(...currentItems.map((i) => i.id)) + 1
                            : 1,
                },
            ]);
        } else {
            setItems([
                ...mapItems(items).map((i) => {
                    if (i.id === item.id) {
                        return {
                            ...item,
                        };
                    }
                    return i;
                }),
            ]);
        }
    };

    const deleteItem = (id) => {
        setItems([...items.filter((el) => el.id !== id)]);
    };

    return (
        <UserContextProvider>
            <div className="app">
                <LeftPanel>
                    <Header />
                    <JournalAddButton clearForm={() => setSelectedItem(null)} />
                    <JournalList items={items} setItem={setSelectedItem} />
                </LeftPanel>
                <Body>
                    <JournalForm
                        onSubmit={addItem}
                        data={selectedItem}
                        onDelete={deleteItem}
                    />
                </Body>
            </div>
        </UserContextProvider>
    );
}

export default App;
