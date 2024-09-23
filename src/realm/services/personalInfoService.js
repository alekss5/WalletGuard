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
  };
};

export const savePersonalInfoToRealm = (personalInfoState) => {
  try {
    realm.write(() => {
      realm.create("PersonalInfo", { _id: "personalInfoState", ...personalInfoState }, Realm.UpdateMode.Modified);
    });
  } catch (error) {
    console.error("Error saving Personal Info to Realm: ", error);
  }
};
