import { useEffect, useState } from "react";
import "./Dashboard.scss";
import { useLoader } from "../../Global/Context/globalContext";
import { Student } from "../../interfaces/student/Student";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  // TODO: Si es necesario un dashboard de estadisticas, se puede implementar aqui
  /**
   * El sistema ya cuenta con las librerias necesarias para la creacion de graficos.
  */
  return (
    <div>
      <Navigate to="/list/students/" />
    </div>
  );
};

export default Dashboard;
