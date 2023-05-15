import logo from './logo.svg';
import './App.css';
import Form from './Form.tsx'
import FileSaver from 'file-saver';


 
function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Form />
    </div>
  );
}

export default App;
