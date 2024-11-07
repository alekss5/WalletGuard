import { getRealmInstance } from './realmConfig';
import Realm from 'realm';

const realm = getRealmInstance();

export const fetchPersonalInfoFromRealm = () => {
  const personalInfo = realm.objectForPrimaryKey("PersonalInfo", "personalInfoState");
  if (!personalInfo) return null;

  return {
    name: personalInfo.name,
    age: personalInfo.age,
    salary: personalInfo.salary,
    jobSector: personalInfo.jobSector,
    passTheSetup: personalInfo.passTheSetup,
    isPremium: personalInfo.isPremium,
    premiumExpiresAt: personalInfo.premiumExpiresAt,
    premiumAutoRenew: personalInfo.premiumAutoRenew,
    subscriptionType: personalInfo.subscriptionType,
    email: personalInfo.email,
    joinedDate: personalInfo.joinedDate,
    jsonToken:personalInfo.jsonToken,
  };
};

export const savePersonalInfoToRealm = (personalInfoState) => {
  try {
    const dataToSave = {
      _id: "personalInfoState",
      name: String(personalInfoState.name || ""),
      age: String(personalInfoState.age || ""),
      salary: String(personalInfoState.salary || ""),
      jobSector: String(personalInfoState.jobSector || ""),
      passTheSetup: personalInfoState.passTheSetup || false,
      isPremium: personalInfoState.isPremium || true,
      premiumExpiresAt: personalInfoState.premiumExpiresAt || null, // Make sure this is a date or null
      premiumAutoRenew: personalInfoState.premiumAutoRenew || false,
      subscriptionType: String(personalInfoState.subscriptionType || ""),
      email: String(personalInfoState.email || ""),
      joinedDate: personalInfoState.joinedDate || null, // Ensure this is a valid date or null
      jsonToken: String(personalInfoState.jsonToken || ""),
    };
        
    realm.write(() => {
      realm.create("PersonalInfo", dataToSave, Realm.UpdateMode.Modified);
    });
  } catch (error) {
    console.error("Error saving Personal Info to Realm: ", error);
  }
};
