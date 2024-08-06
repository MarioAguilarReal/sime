import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useLoader } from "../../Global/Context/globalContext";
import { Student } from "../../interfaces/student/Student";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Dashboard = () => {

  const { setLoading } = useLoader();
  const [dataStudents, setDataStudents] = useState<any[]>([]);

  const loadData = async () => {
    setLoading(true);
    const data = [
      { "group": "Group A", "students": 30, "tutored": 20, "notTutored": 10 },
      { "group": "Group B", "students": 45, "tutored": 30, "notTutored": 15 },
      { "group": "Group C", "students": 28, "tutored": 18, "notTutored": 10 },
      { "group": "Group D", "students": 50, "tutored": 40, "notTutored": 10 },
      { "group": "Group E", "students": 22, "tutored": 12, "notTutored": 10 }
    ];

    setDataStudents(data);
    setLoading(false);
  }

  const aggregateData = (data: any) => {
    let tutored = 0;
    let notTutored = 0;

    data.forEach( (item : any) => {
      tutored += item.tutored;
      notTutored += item.notTutored;
    });

    return [
      { name: "Tutored", value: tutored },
      { name: "Not Tutored", value: notTutored }
    ]
  }

  const pieData = aggregateData(dataStudents);
  const COLORS = ['#0088FE', '#00C49F'];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="Dashboard pt-5">
      <div className="chart ms-5">
        <h3>Students</h3>
        <ResponsiveContainer width={300} height={300}>
          <BarChart
            width={300}
            height={300}
            data={dataStudents}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart ms-5">
        <h3>Students with and without Tutor</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {pieData.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              })}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="chart ms-5">
        <h3>Students</h3>
        <ResponsiveContainer width={300} height={300}>
          <BarChart
            width={300}
            height={300}
            data={dataStudents}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
