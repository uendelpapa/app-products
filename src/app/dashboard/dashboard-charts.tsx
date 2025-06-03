"use client";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const chartData = [
  { date: "01/06", receipt: 1200 },
  { date: "02/06", receipt: 1500 },
  { date: "03/06", receipt: 900 },
  { date: "04/06", receipt: 1700 },
  { date: "05/06", receipt: 1100 },
  { date: "06/06", receipt: 2000 },
  { date: "07/06", receipt: 1600 },
];
const colors = {
  brown: { "500": "#ff7c40" },
  blue: "#3b82f6",
  green: "#22c55e",
};

const data = [
  { name: "Vendas", uv: 400, fill: "#8884d8" },
  { name: "Receita", uv: 300, fill: "#83a6ed" },
  { name: "Clientes", uv: 300, fill: "#8dd1e1" },
  { name: "Produtos", uv: 200, fill: "#82ca9d" },
];

const data01 = [
  {
    "x": 100,
    "y": 200,
    "z": 200
  },
  {
    "x": 120,
    "y": 100,
    "z": 260
  },
  {
    "x": 170,
    "y": 300,
    "z": 400
  },
  {
    "x": 140,
    "y": 250,
    "z": 280
  },
  {
    "x": 150,
    "y": 400,
    "z": 500
  },
  {
    "x": 110,
    "y": 280,
    "z": 200
  }
];
const data02 = [
  {
    "x": 200,
    "y": 260,
    "z": 240
  },
  {
    "x": 240,
    "y": 290,
    "z": 220
  },
  {
    "x": 190,
    "y": 290,
    "z": 250
  },
  {
    "x": 198,
    "y": 250,
    "z": 210
  },
  {
    "x": 180,
    "y": 280,
    "z": 260
  },
  {
    "x": 210,
    "y": 220,
    "z": 230
  }
];
    

export default function DashboardCharts() {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Card 1: Receita semanal */}
      <div className=" bg-default-100 rounded-2xl shadow-lg p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-2 text-default-900 dark:text-default-100">
          Receita semanal
        </h2>
        <span className="text-3xl font-bold text-brown-500 mb-4">
          R$ 10.000,00
        </span>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Tooltip
              contentStyle={{
                background: "#fff",
                borderRadius: 8,
                border: "none",
              }}
              formatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="receipt"
              stroke={colors.brown["500"]}
              dot={{ r: 5, fill: colors.brown["500"] }}
              activeDot={{ r: 7, fill: colors.brown["500"] }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Card 2: Radar de desempenho */}
      <div className="bg-default-100 rounded-2xl shadow-lg p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-2 text-default-900 dark:text-default-100">
          Desempenho por categoria
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart
            outerRadius={90}
            data={[
              { subject: "Vendas", A: 120, B: 110 },
              { subject: "Receita", A: 98, B: 130 },
              { subject: "Clientes", A: 86, B: 130 },
              { subject: "Produtos", A: 99, B: 100 },
              { subject: "Retorno", A: 85, B: 90 },
              { subject: "Despesas", A: 65, B: 85 },
            ]}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar
              name="Janeiro"
              dataKey="A"
              stroke={colors.blue}
              fill={colors.blue}
              fillOpacity={0.5}
            />
            <Radar
              name="Fevereiro"
              dataKey="B"
              stroke={colors.green}
              fill={colors.green}
              fillOpacity={0.5}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Card 3: RadialBar de métricas */}
      <div className="bg-default-100 rounded-2xl shadow-lg p-6 flex flex-col md:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Métricas gerais</h2>
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart
            width={730}
            height={250}
            margin={{
              top: 20,
              right: 20,
              bottom: 10,
              left: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" name="stature" unit="cm" />
            <YAxis dataKey="y" type="number" name="weight" unit="kg" />
            <ZAxis
              dataKey="z"
              type="number"
              range={[64, 144]}
              name="score"
              unit="km"
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="A school" data={data01} fill="#8884d8" />
            <Scatter name="B school" data={data02} fill="#82ca9d" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
