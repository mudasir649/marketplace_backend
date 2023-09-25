import mongoose from "mongoose";

const ConstructionMachineSchema = new mongoose.Schema({
    category: [
            {
            type: String
        }
    ],
    makes: [
        {
            type: String
        }
    ]
});

const ConstructionMachine = mongoose.model('ConstructionMachine', ConstructionMachineSchema);
export default ConstructionMachine;