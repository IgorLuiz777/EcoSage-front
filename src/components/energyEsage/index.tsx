import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { EnergyUsage } from "@/types/EnergyUsage"
import { getAllEnergyUsage } from "@/service/EnergyUsage"

export function EnergyUsageTable() {
    const [energyUsage, setEnergyUsage] = useState<EnergyUsage[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEnergyUsage = async () => {
            try {
                const data = await getAllEnergyUsage();
                setEnergyUsage(data);
            } catch (err) {
                console.error("Error fetching equipments:", err);
                setError("Não foi possível carregar a tabela.");
            } finally {
                setLoading(false);
            }
        };

        fetchEnergyUsage();
    }, []);


    return (
        <div className="mt-4">
            <p className="text-2xl font-semibold p-1 text-gray-800">Histórico de uso de energia</p>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
                <Plus />
            </Button>
            <Table className="shadow-lg rounded-lg overflow-hidden mt-4">
                <TableHeader className="bg-gray-300">
                    <TableRow>
                        <TableHead className="text-left text-gray-600">Energia Consumida</TableHead>
                        <TableHead className="text-left text-gray-600">Dia inicial</TableHead>
                        <TableHead className="text-left text-gray-600">Dia final</TableHead>
                        <TableHead className="text-left text-gray-600">Consumo médio</TableHead>
                        <TableHead className="text-left text-gray-600">Custo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-2xl text-gray-500">
                                Carregando...
                            </TableCell>
                        </TableRow>
                    )}
                    {error && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-red-500">
                                {error}
                            </TableCell>
                        </TableRow>
                    )}
                    {!loading && !error && energyUsage.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-gray-500">
                                Nenhum equipamento cadastrado.
                            </TableCell>
                        </TableRow>
                    )}
                    {
                        !loading && !error &&
                        energyUsage.map((e) => (
                            <TableRow className="bg-gray-100 hover:bg-gray-200 transition duration-300" key={e.id}>
                                <TableCell className="font-medium text-gray-700 hover:bg-gray-200 bg-gray-100">{e.totalConsumedEnergy} W</TableCell>
                                <TableCell className="font-medium text-gray-700 hover:bg-gray-200 bg-gray-100">{new Date(e.startDate).toLocaleDateString()}</TableCell>
                                <TableCell className="text-gray-700 hover:bg-gray-200 bg-gray-100">{new Date(e.endDate).toLocaleDateString()}</TableCell>
                                <TableCell className="text-gray-700 hover:bg-gray-200 bg-gray-100">{e.averageDailyConsumption} hrs (diário)</TableCell>
                                <TableCell className="text-gray-700 hover:bg-gray-200 bg-gray-100">R$ {e.totalCost}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
                <TableFooter className="bg-gray-300">
                    <TableRow className="hover:bg-gray-200">
                        <TableCell colSpan={4} className="font-semibold text-gray-700">Total</TableCell>
                        <TableCell className="text-right font-semibold text-gray-700">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
