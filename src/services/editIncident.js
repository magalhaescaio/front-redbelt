import api from './api'

async function editIncident(request, id){
    try{
		const response = await api.post('/api/v1/incident/'+id, request)

        return response
    }catch (error){
        return error.response
    }
}

export default editIncident