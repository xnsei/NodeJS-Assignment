import {Data} from "./App.tsx";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function Chart({data, column}: { data: Data[], column: string }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                }}
            >
                <Tooltip content={({active, payload}) => {
                    if (active && payload && payload.length) {
                        return (
                            <div className="rounded-lg border bg-white p-2 shadow-sm">
                                <div className="font-bold text-gray-500">
                                    {payload[0].payload.date}
                                </div>
                                <div>
                                    {column === "numberOfImages" && <div className="flex flex-col">
                                        <span
                                            className="text-[0.70rem] uppercase text-gray-500">
                                            Number of Images Generated
                                        </span>
                                        <span className="font-bold text-gray-800">
                                            {payload[0].payload.numberOfImages}
                                        </span>
                                    </div>}
                                    {column === "avgTimeToGenerate" && <div className="flex flex-col">
                                        <span
                                            className="text-[0.70rem] uppercase text-gray-500">
                                            Average Time to Generate (secs)
                                        </span>
                                        <span className="font-bold text-gray-500">
                                            {payload[0].payload.avgTimeToGenerate.toFixed(2)}
                                        </span>
                                    </div>}
                                </div>
                            </div>
                        );
                    }
                    return null;
                }} />
                <XAxis hide={true} dataKey="date"/>
                <YAxis hide={true}/>
                <Line
                    isAnimationActive={data.length > 0}
                    animationEasing={"ease-in-out"}
                    animationDuration={2000}
                    type="monotone"
                    dataKey={column}
                    stroke="#6366f1"
                    strokeWidth={2}
                    activeDot={{
                        r: 6,
                        style: {fill: "#a5b4fc", opacity: 1},
                    }}
                />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
}