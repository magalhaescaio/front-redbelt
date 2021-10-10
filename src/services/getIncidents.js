import api from './api'

async function getIncidents(params){
    try{
		const response = await api.get('/api/v1/incident'+params)

        return response
    }catch (error){
        return error.response
    }
}

export default getIncidents