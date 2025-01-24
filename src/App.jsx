import "./App.css";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { UserContextProvider } from "./context/user.context";

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
                ...item,
                date: new Date(item.date),
                id:
                    currentItems.length > 0
                        ? Math.max(...currentItems.map((i) => i.id)) + 1
                        : 0,
            },
        ]);
    };

    return (
        <UserContextProvider>
            <div className="app">
                <LeftPanel>
                    <Header />
                    <JournalAddButton />
                    <JournalList items={items} />
                </LeftPanel>
                <Body>
                    <JournalForm onSubmit={addItem} />
                </Body>
            </div>
        </UserContextProvider>
    );
}

export default App;
