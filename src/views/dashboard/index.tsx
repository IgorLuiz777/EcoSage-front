import { getAllEquipment } from "@/service/Equipment";
import { Equipment } from "@/types/Equipment";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnergyUsageTable } from "@/components/energyEsage";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const data = await getAllEquipment();
        setEquipments(data);
      } catch (err) {
        console.error("Error fetching equipments:", err);
        setError("Não foi possível carregar os equipamentos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Total Power Generation</CardTitle>
            <CardDescription>12,350 kW</CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Active Turbines</CardTitle>
            <CardDescription>23 of 25</CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Daily Average Consumption</CardTitle>
            <CardDescription>450 kW</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div>
        <p>Quer dicas para economizar?</p>
        <p>Fale com a nossa IA: <Link to="/chat">clique aqui</Link></p>
      </div>

      <div>
        Grafico
      </div>

      <div>
        <p className="text-lg mb-4">Equipamentos Cadastrados</p>

        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && equipments.length === 0 && (
          <p>Nenhum equipamento cadastrado.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!loading &&
            !error &&
            equipments.map((e) => (
              <Card key={e.name} className="shadow-lg">
                <CardHeader>
                  <CardTitle>{e.name}</CardTitle>
                  <CardDescription>
                    Categoria: {e.equipmentCategory.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Potência: {e.power} W</p>
                  <p>Uso médio diário: {e.averageUsagePerDay} horas</p>
                  <p>Nota pessoal: {e.personalNote}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="font-bold">Editar</Button>
                  <Button variant="destructive" className="font-bold">Excluir</Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
      <div>
        <EnergyUsageTable />
      </div>
    </div>
  );
}
