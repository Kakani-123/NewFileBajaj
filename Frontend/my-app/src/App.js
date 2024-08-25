import React, { useState } from 'react';
import './App.css'; 

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: JSON.parse(input) })
            });
            const data = await res.json();
            console.log(data);  // For debugging
            setResponse(data);
        } catch (error) {
            console.error("Invalid JSON or network error", error);
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        return (
            <div className="response-container">
                {selectedOptions.includes('Alphabets') && <div><strong>Alphabets:</strong> {response.alphabets.join(', ')}</div>}
                {selectedOptions.includes('Numbers') && <div><strong>Numbers:</strong> {response.numbers.join(', ')}</div>}
                {selectedOptions.includes('Highest lowercase alphabet') && <div><strong>Highest lowercase:</strong> {response.highest_lowercase_alphabet.join(', ')}</div>}
            </div>
        );
    };

    return (
        <div className="app-container">
            <h1 className="app-title">{response?.roll_number || "Please Enter Your Input"}</h1>
            <textarea 
                className="input-area"
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Enter JSON here">
            </textarea>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
            <select 
                className="select-options" 
                multiple={true} 
                onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(o => o.value))}>
                <option value="Alphabets">Alphabets</option>
                <option value="Numbers">Numbers</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            {renderResponse()}
        </div>
    );
}

export default App;
