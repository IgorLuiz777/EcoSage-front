import { equipmentCategory } from "./EquipmentCategory";

export interface Equipment {
    name: string;
    power: number;
    averageUsagePerDay: number;
    equipmentCategory: equipmentCategory
    personalNote: string;
}