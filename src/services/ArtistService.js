import request from './Api'

const getArtist = async (code)=>{
    return await request(`artist/${code}`)
}

export default getArtist