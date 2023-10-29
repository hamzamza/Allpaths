import Maps from "../models/Maps.js";
import Users from "../models/Users.js";

const createMap = async (req, res) => {
    const body = req.body
    const userId = req.userId
    body.owner = userId
    const map = await Maps.create(body)
    Users.findByIdAndUpdate(userId, { $push: { maps: map._id } }, { new: true })
    res.status(200).send(map)
}

const deleteMap = async (req, res) => {
    const id = req.params.id
    const  map  = Maps.findById(id)
    const userId = req.userId
    if(  userId != map.owner ){
    map = await Maps.findByIdAndDelete(id)
   return  res.status(200).json(map)
    }
    res.status(401).json({msg:"you are not authorized to delete this map"})
}

const DeleteAllMaps = async (req, res) => {
    const map = await Maps.deleteMany({})
    res.status(200).json(map)
}

const getMaps = async (req, res) => {
    const data = await Cities.find({})
    res.status(200).json(data)
}

const updateMap = async (req, res) => {
    if(req.userId == undefined){
        res.status(401).json({msg:"you are not authorized to update this map"})
    }
    const data = await Maps.findById(req.params.id )
    res.status(200).json(data)
}

const getMap = async (req, res) => {
    const id = req.params.id
    const map = await Maps.findById(id)
    if( map.authorizedTo.length != 0 ){
        const userId = req.userId
        if( map.authorizedTo.includes(userId) ){
            res.status(200).json(map)
        }
        else{
            res.status(401).json({msg:"you are not authorized to see this map"})
        }
    }
    res.status(200).json(map)
}

export { createMap, deleteMap, DeleteAllMaps, getMaps, updateMap, getMap }