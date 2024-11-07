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
    isPremium: { type: "bool", default: true },
    premiumExpiresAt: "date?",
    premiumAutoRenew: { type: "bool", default: false },
    subscriptionType: { type: "string", default: "" },
    email: { type: "string", default: "" },
    joinedDate: "date?",
    jsonToken: { type: "string", default: '' }
  },
};
