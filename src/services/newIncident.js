import api from './api'

async function newIncident(request){
    try{
		const response = await api.post('/api/v1/incident', request)

        return response
    }catch (error){
        return error.response
    }
}

export default newIncident