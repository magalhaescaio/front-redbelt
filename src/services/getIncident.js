import api from './api'

async function getIncident(id){
    try{
		const response = await api.get('/api/v1/incident/'+id)

        return response
    }catch (error){
        return error.response
    }
}

export default getIncident