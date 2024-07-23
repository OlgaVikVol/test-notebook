import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

function App() {
	return (
		<div className='app'>
			<LeftPanel>
				<Header />
        <JournalAddButton />
				<JournalList>
					<CardButton>
						<JournalItem />
					</CardButton>
          <CardButton>
						<JournalItem />
					</CardButton>
				</JournalList>
			</LeftPanel>
			<Body>
        Body
			</Body>	
		</div>
	);
}

export default App;
