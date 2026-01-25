import GuestData from "../models/guestInfoModel.js"

export const create = async(req,res)=>{
  try {
    const newGuest = new GuestData(req.body);
    const {email} = newGuest;

    const guestExist = await GuestData.findOne({email})
    if(guestExist){
        return res.status(400).json({message: "Guest's information already exists"});
    }

    const savedData = await newGuest.save();
    res.status(200).json({message: "Guest's information recorded sucessfully!"});
    
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

export const getAllGuestInfo = async(req,res)=>{
  try {
    const guestData = await GuestData.find();
    if(!guestData || guestData.length === 0){
      return res.status(400).json({message: "No data not found."});
    }
    res.status(200).json(guestData);
    
  } catch (error) {
     res.status(500).json({errorMessage: error.message});
    
  }
}

export const getGuestInfoById = async(req,res)=>{
  try {
   
    const id = req.params.id;
    const guestInfoExist = await GuestData.findById(id);
    if(!guestInfoExist){
      return res.status(400).json({message: "No data not found."});
    }
     res.status(200).json(guestInfoExist);
    
  } catch (error) {
     res.status(500).json({errorMessage: error.message});
    
  }
}

export const updateGuestData = async(req,res)=>{
  try {
   const id = req.params.id;
    const guestInfoExist = await GuestData.findById(id);
    if(!guestInfoExist){
      return res.status(400).json({message: "No data not found."});
    }

  const updatedData =  await GuestData.findByIdAndUpdate(id, req.body,{
      new:true 
    });
    res.status(200).json({message:"Guest's information updated successfully!"});
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}

export const deleteGuestInfo = async(req,res)=>{
  try {
   const id = req.params.id;
    const guestInfoExist = await GuestData.findById(id);
    if(!guestInfoExist){
      return res.status(400).json({message: "No data not found."});
    }

 await GuestData.findByIdAndDelete(id);
    res.status(200).json({message: "Guest's data deleted sucessfully!"});
  } catch (error) {
    res.status(500).json({errorMessage: error.message});
  }
}