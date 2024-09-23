export const personalInfoSchema = {
    name: "PersonalInfo",    
    primaryKey: "_id",      
    properties: {
      _id: "string",       
      name: { type: "string", default: "" },
      age: { type: "string", default: "" },
      salary: { type: "string", default: "" },
      jobSector: { type: "string", default: "" },
      passTheSetup: { type: "bool", default: false },
    },
  };