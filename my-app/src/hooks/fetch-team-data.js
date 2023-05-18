import { useQuery } from "react-query";
import axios from 'axios';

const FetchTeamData = () => {
    return useQuery(
        ["fetch-team-data"],
        () =>
            axios.get('/getTeam')
    );
};

export default FetchTeamData;
