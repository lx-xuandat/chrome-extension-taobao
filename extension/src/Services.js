import axios from "axios"
import { routes } from "./configs"

export const Services = {
    async getCost() {
        const cost = await axios.get(routes.cost)

        return cost
    }

    
}
