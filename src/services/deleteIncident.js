import api from './api'

async function deleteIncident(id){
    try{
		const response = await api.delete('/api/v1/incident/'+id)

        return response
    }catch (error){
        return error.response
    }
}

export default deleteIncident