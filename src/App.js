import logo from './logo.svg';
import Counter from './Components/CounterApp';
import UserForm from './Components/Userform';
import RichTextEditor from './Components/RichTextEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <div className="left-section">
          <Counter />
        </div>
        <div className="right-section">
          
          <UserForm />
          <RichTextEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
