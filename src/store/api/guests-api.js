import axios from "axios";
import ServerRoutes from "./routes/index";

let headers;
const getGuests = async () => {
    try {
        headers = { Authorization: 'Bearer ' + localStorage['bs'] }
        const { status, data, error } = await axios.get(ServerRoutes.getGuests, { headers });
        return { status, data, error };
    } catch (error) {
        return {
            error: error.response.data.error,
            status: error.response.status
        };
    }
};

const getTablesGuests = async () => {
    try {
        headers = { Authorization: 'Bearer ' + localStorage['bs'] }
        const { status, data, error } = await axios.get(ServerRoutes.getTablesGuests, { headers });
        return { status, data, error };
    } catch (error) {
        return {
            error: error.response.data.error,
            status: error.response.status
        };
    }
};

const guestsApi = {
    getGuests,
    getTablesGuests
};

export default guestsApi;
