export interface Location {
    id: string;
    name: string;
    city: string | null;
    neighborhood: string | null;
    lat: number;
    lng: number;
    fun_fact: string | null;
    created_at: string;
}
