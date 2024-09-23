import Realm from 'realm';
import { personalInfoSchema } from "../Schemas/PersonalInfo";
import { uiSchema } from "../Schemas/Ui";
import { expenseSchema,incomeSchema,subscriptionSchema,categorySchema,budgetSchema } from "../Schemas/Budget";

const realmConfig = {
  schema: [uiSchema, personalInfoSchema, expenseSchema, incomeSchema, subscriptionSchema, categorySchema, budgetSchema],
  schemaVersion: 1,
};

const realm = new Realm(realmConfig);

export const getRealmInstance = () => realm;

export const closeRealm = () => {
  if (!realm.isClosed) {
    realm.close();
  }
};
