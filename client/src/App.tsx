import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Chart from "./Chart.tsx";

export interface Data {
    date: string;
    numberOfImages: number;
    avgTimeToGenerate: number;
}

function App() {
    const [data, setData] = useState(Array<Data>());

    useEffect(() => {
        axios.get("https://nodejs-assignment-backend.onrender.com/data").then((response) => {
            console.log(response.data);
            setData(response.data);
        }).catch((error) => {
            console.log(error)
        });
    }, []);

    return (
        <div className="">
            <div className="bg-white p-4 m-8 rounded shadow-md">
                <h1 className="text-indigo-600 text-xl font-bold">Number of Images Generated per day</h1>
                <div className="meow">
                    <Chart data={data} column="numberOfImages"/>
                </div>
            </div>
            <div className="bg-white p-4 m-8 rounded shadow-md">
                <h1 className="text-indigo-600 text-xl font-bold">Avg time taken for Image generation per day</h1>
                <div className="meow">
                    <Chart data={data} column="avgTimeToGenerate"/>
                </div>
            </div>
        </div>
    )
}

export default App
