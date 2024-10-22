import request from './Api'

const getAlbum = async (code)=>{
    
    return await request(`album/${code}/tracks`)
}

export default getAlbum