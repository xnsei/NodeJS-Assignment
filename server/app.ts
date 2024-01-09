import express, {Request, Response} from "express";
import cors from "cors";
import data from "./data.json";


const app = express();
app.use(cors());

interface ImageData {
    id: string;
    createdAt: number;
    timeToGenerate: number;
}

interface OutputData {
    date: string;
    numberOfImages: number;
    avgTimeToGenerate: number;
}

const calculateData = (data: ImageData[]) => {
    const dateMap: Record<string, number[]> = {};
    data.forEach((image: ImageData) => {
        const formattedDate = new Date(image.createdAt).toISOString().split("T")[0];
        if (dateMap[formattedDate]) {
            dateMap[formattedDate].push(image.timeToGenerate);
        } else {
            dateMap[formattedDate] = [image.timeToGenerate];
        }
    });
    const averageData: OutputData[] = [];
    Object.entries(dateMap).forEach(([date, times]) => {
        const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length;
        averageData.push({ date, numberOfImages: times.length , avgTimeToGenerate: averageTime });
    });
    return averageData;
}

app.get("/data", (req: Request, res: Response) => {
    res.send(calculateData(data));
});

app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
});