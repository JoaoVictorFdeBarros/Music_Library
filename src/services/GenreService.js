import request from './Api'

const getGenre = async (code)=>{
    
    return await request(`genre/${code}`)
}

export default getGenre