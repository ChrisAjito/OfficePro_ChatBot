// App.jsx

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

// CSV Data
const csvData = `name,age
John,30
Doe,25`;

// Utility Functions
const parseCSV = (data) => {
    return new Promise((resolve, reject) => {
        Papa.parse(data, {
            header: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
};

const fetchDataFromGeminiAPI = async () => {
    const response = await fetch('https://api.gemini.com/v1/pubticker/btcusd');
    return response.json();
};

const App = () => {
    const [data, setData] = useState([]);
    const [geminiData, setGeminiData] = useState({});

    useEffect(() => {
        parseCSV(csvData).then(parsedData => {
            setData(parsedData);
        });
        fetchDataFromGeminiAPI().then(data => {
            setGeminiData(data);
        });
    }, []);

    return (
        <div>
            <h1>CSV Data</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name} is {item.age} years old.</li>
                ))}
            </ul>
            <h2>Gemini Data</h2>
            <p>Last price: {geminiData.last}</p>
            <Chatbot 
                /* Chatbot configuration */
            />
        </div>
    );
};

export default App;