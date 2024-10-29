// components/TaskTrendChart.js
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const TaskTrendChart = ({ tasks }) => { const chartData = useMemo(() => { const dataByDate = {};

    tasks.forEach(task => {
      const date = new Date(task.startTime).toLocaleDateString(); 


      if (!dataByDate[date]) {
        dataByDate[date] = { total: 0, completed: 0, inProgress: 0 };
      }

      //here we increment our task and bug count
      dataByDate[date].total += 1;

      //as per status 
      if (task.status === 'Done') {
        dataByDate[date].completed += 1;
      } else if (task.status === 'In Progress') {
        dataByDate[date].inProgress += 1;
      }
    });

    //giving data for the trend chart
    const labels = Object.keys(dataByDate);
    const totalTasks = labels.map(label => dataByDate[label].total);
    const completedTasks = labels.map(label => dataByDate[label].completed);
    const inProgressTasks = labels.map(label => dataByDate[label].inProgress);

    return {
      labels,
      datasets: [
        {
          label: 'Total Tasks',
          data: totalTasks,
          borderColor: 'rgba(75, 192, 192, 1)',
           backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          borderWidth: 2,
        },
        {
          label: 'Completed Tasks',
          data: completedTasks,
          borderColor: 'rgba(54, 162, 235, 1)',

          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          borderWidth: 2,
        },
        {
          label: 'In Progress Tasks',
          data: inProgressTasks,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',


          fill: true,
          borderWidth: 2,
        },
      ],
        };
  }, [tasks]);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category', 
      },
      y: {
        beginAtZero: true, //putting y-axis at zero
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`; 
          },
     },
    },
    },
  };

  return (
    <div>
      <h2>Task Trend Chart</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TaskTrendChart;
