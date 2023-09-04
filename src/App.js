import './App.css';
import { UsersProvider } from './UsersContext';
import Users from './components/Users';

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <Users/>
      </UsersProvider>
    </div>
  );
}

export default App;
