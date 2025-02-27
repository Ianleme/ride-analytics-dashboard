import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/dashboard/KPICard";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart2, 
  Download, 
  DollarSign, 
  Users, 
  Percent, 
  Database,
  ChartPie
} from "lucide-react";

// Dados para os gráficos
const monthlyData = [
  { month: "Jan", revenue: 42000, rides: 12000, expenses: 28000 },
  { month: "Feb", revenue: 46000, rides: 13500, expenses: 29000 },
  { month: "Mar", revenue: 51000, rides: 15000, expenses: 30000 },
  { month: "Apr", revenue: 58000, rides: 17000, expenses: 31000 },
  { month: "May", revenue: 65000, rides: 19500, expenses: 32000 },
  { month: "Jun", revenue: 72000, rides: 22000, expenses: 33000 },
  { month: "Jul", revenue: 80000, rides: 25000, expenses: 34000 },
  { month: "Aug", revenue: 78000, rides: 24000, expenses: 34000 },
  { month: "Sep", revenue: 70000, rides: 21000, expenses: 33000 },
  { month: "Oct", revenue: 64000, rides: 18500, expenses: 32000 },
  { month: "Nov", revenue: 55000, rides: 16000, expenses: 31000 },
  { month: "Dec", revenue: 50000, rides: 14500, expenses: 30000 }
];

const userSegmentData = [
  { name: "Assinantes Anuais", value: 65 },
  { name: "Assinantes Mensais", value: 15 },
  { name: "Uso Casual", value: 12 },
  { name: "Corporativo", value: 8 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const performanceData = [
  { name: "Seg", casual: 2400, member: 4000 },
  { name: "Ter", casual: 1398, member: 3000 },
  { name: "Qua", casual: 9800, member: 2000 },
  { name: "Qui", casual: 3908, member: 2780 },
  { name: "Sex", casual: 4800, member: 1890 },
  { name: "Sáb", casual: 3800, member: 2390 },
  { name: "Dom", casual: 4300, member: 3490 }
];

const zoneRevenueData = [
  { zone: "Centro", revenue: 45000, rides: 15000 },
  { zone: "Norte", revenue: 28000, rides: 9000 },
  { zone: "Sul", revenue: 32000, rides: 10500 },
  { zone: "Leste", revenue: 25000, rides: 8000 },
  { zone: "Oeste", revenue: 30000, rides: 9700 }
];

const revenueGrowthData = [
  { year: "2019", value: 320000 },
  { year: "2020", value: 300000 },
  { year: "2021", value: 370000 },
  { year: "2022", value: 450000 },
  { year: "2023", value: 580000 },
  { year: "2024", value: 720000, projected: true }
];

const timeSeriesData = monthlyData.map(item => ({
  name: item.month,
  Receita: item.revenue,
  Despesas: item.expenses,
  "Lucro Líquido": item.revenue - item.expenses
}));

const Relatorio = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="glass-card rounded-xl mb-8 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Relatório de Negócios</h1>
            <p className="text-neutral-600 mt-1">Visão geral do desempenho financeiro e operacional</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Receita Total"
          value="R$ 732.000"
          change="+15,2% vs último ano"
          trend="up"
          icon={<DollarSign className="h-6 w-6" />}
        />
        <KPICard
          title="Usuários Ativos"
          value="28.540"
          change="+8,7% vs último mês"
          trend="up"
          icon={<Users className="h-6 w-6" />}
        />
        <KPICard
          title="Margem de Lucro"
          value="32,5%"
          change="+3,8% vs meta anual"
          trend="up"
          icon={<Percent className="h-6 w-6" />}
        />
        <KPICard
          title="Total de Viagens"
          value="228.345"
          change="+12,3% vs último ano"
          trend="up"
          icon={<Database className="h-6 w-6" />}
        />
      </div>

      {/* Revenue Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">Desempenho Financeiro</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-card p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">Receita vs Despesas Mensais</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis dataKey="name" className="text-neutral-600" />
                  <YAxis className="text-neutral-600" />
                  <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="Receita" 
                    stackId="1" 
                    stroke="#DA2128" 
                    fill="#FFCDD2" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Despesas" 
                    stackId="2" 
                    stroke="#7E57C2" 
                    fill="#D1C4E9" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Lucro Líquido" 
                    stackId="3" 
                    stroke="#4CAF50" 
                    fill="#C8E6C9" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">Segmentação de Receita</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userSegmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {userSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="font-medium">Receita por Usuário:</span>
                <span>R$ 25,70</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Taxa de Renovação:</span>
                <span className="flex items-center text-green-600">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  87%
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Usage and Growth Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">Utilização e Crescimento</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">Desempenho Semanal por Tipo de Usuário</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis dataKey="name" className="text-neutral-600" />
                  <YAxis className="text-neutral-600" />
                  <Tooltip formatter={(value) => `${value} viagens`} />
                  <Legend />
                  <Bar dataKey="casual" name="Usuários Casuais" fill="#8884d8" />
                  <Bar dataKey="member" name="Assinantes" fill="#DA2128" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">Crescimento da Receita Anual</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                  <XAxis dataKey="year" className="text-neutral-600" />
                  <YAxis className="text-neutral-600" />
                  <Tooltip 
                    formatter={(value) => `R$ ${value.toLocaleString()}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Receita Real" 
                    stroke="#DA2128" 
                    strokeWidth={2} 
                    dot={{ fill: "#DA2128" }}
                    connectNulls
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Projeção" 
                    stroke="#DA2128" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={{ fill: "#DA2128" }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Operational Performance Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-neutral-900">Desempenho por Zona</h2>
        <Card className="glass-card p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">Receita por Zona</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneRevenueData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200" />
                    <XAxis type="number" className="text-neutral-600" />
                    <YAxis dataKey="zone" type="category" className="text-neutral-600" />
                    <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="revenue" name="Receita" fill="#2196F3" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4 text-neutral-900">Principais Métricas por Zona</h3>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3 font-semibold">Zona</th>
                    <th className="text-right pb-3 font-semibold">Viagens</th>
                    <th className="text-right pb-3 font-semibold">Receita</th>
                    <th className="text-right pb-3 font-semibold">Média/Viagem</th>
                  </tr>
                </thead>
                <tbody>
                  {zoneRevenueData.map((zone) => (
                    <tr key={zone.zone} className="border-b">
                      <td className="py-3">
                        <div className="font-medium">{zone.zone}</div>
                      </td>
                      <td className="text-right py-3">{zone.rides.toLocaleString()}</td>
                      <td className="text-right py-3">R$ {zone.revenue.toLocaleString()}</td>
                      <td className="text-right py-3">
                        R$ {(zone.revenue / zone.rides).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-4">
                <h4 className="font-medium mb-3">Oportunidades de Crescimento:</h4>
                <div className="space-y-2">
                  <div className="flex items-center bg-green-50 p-3 rounded-lg">
                    <ChartPie className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm">Potencial de aumento de 22% na zona Leste com novos pontos de bicicleta</span>
                  </div>
                  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                    <BarChart2 className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-sm">Aumento de tarifas em 5% na zona Centro pode gerar R$ 28.000 adicionais</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Relatorio;
