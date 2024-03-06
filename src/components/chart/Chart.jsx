import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

const Chart = ({ aspect, title, workouts }) => {
  // Funktion zum Vorbereiten der Daten für alle Workouts nach Monat
  const prepareChartData = (workouts) => {
    // Map zur Zählung der Workouts für jeden Monat
    const workoutCountByMonth = new Map();

    // Iteriere über alle Workouts
    workouts.forEach(workout => {
      const workoutDate = new Date(workout.date);
      const monthYearKey = `${workoutDate.getMonth() + 1}/${workoutDate.getFullYear()}`;

      // Wenn der Monat bereits in der Map vorhanden ist, erhöhe die Anzahl der Workouts
      if (workoutCountByMonth.has(monthYearKey)) {
        workoutCountByMonth.set(monthYearKey, workoutCountByMonth.get(monthYearKey) + 1);
      } else {
        // Wenn der Monat noch nicht in der Map vorhanden ist, setze die Anzahl der Workouts auf 1
        workoutCountByMonth.set(monthYearKey, 1);
      }
    });

    // Konvertiere die Map in ein Array von Objekten für die Chart-Daten
    const chartData = Array.from(workoutCountByMonth, ([name, Total]) => ({ name, Total }));

    return chartData;
  };

  // Memoisiere die vorbereiteten Chart-Daten
  const chartData = useMemo(() => prepareChartData(workouts), [workouts]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={chartData}
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
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
