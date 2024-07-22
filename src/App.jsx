import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';

function App() {
	return (
		<>
			<h1>Name</h1>
			<Button />
			<CardButton>
				<JournalItem />
			</CardButton>
		</>
	);
}

export default App;
