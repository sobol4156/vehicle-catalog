export interface Vehicle {
    id: number;
    name: string;
    model: string;
    year: number;
    color: string;
    price: number;
    editing?: boolean;
}