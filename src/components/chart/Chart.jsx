import dayjs from "dayjs";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@mui/material";

const monthNames = [];
const currentDate = dayjs();
for (let i = 5; i >= 0; i--) {
    const monthName = currentDate.subtract(i, 'month').format('MMMM');
    monthNames.push(monthName);
}

const Chart = ({ aspect, title, workouts }) => {
  // Funktion zur Berechnung der Anzahl der Workouts für jeden Monat
  const getWorkoutsCountForMonth = (workouts, monthName) => {
    if (!workouts || workouts.length === 0) return 0; // Überprüfen, ob workouts null oder leer ist
    return workouts.filter(workout => {
      return dayjs(workout.date).format('MMMM') === monthName;
    }).length;
  };

  // Daten für die Chart
  const data = monthNames.map(monthName => ({
    name: monthName,
    Total: getWorkoutsCountForMonth(workouts, monthName)
  }));

  return (
    <div className="chart">
       <span style={{ fontWeight: "bold" }}>6 MONTH WORKOUT CHART</span>
      <ResponsiveContainer width="100%" aspect={aspect}>
        {!workouts ? (
          <>
          <Skeleton variant="rounded" height={"20vh"} />
          </>
        ) : (
          <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
        )}
        
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
