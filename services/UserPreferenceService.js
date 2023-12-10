import { getDBConnectionDetails } from "../configs/DbConfig.js";
import { userPreference } from "../models/UserPreference.js";



export const fetchUserPreference = async () => {
    try {
        const DBName = process.env.Mongo_DBName;
        const collectionName=process.env.Mongo_UserPreferenceCollectionName;
        const {client, database, collection} = await getDBConnectionDetails(DBName, collectionName);

        const prefArray = await collection.find({}).toArray();
        return prefArray[0];
    } catch (error) {
        console.log("Error occured iWhile retrieving UserPreferencet : ", error);
    }
    
}

export const saveUserPreference = async () => {
    try {
        const DBName = process.env.Mongo_DBName;
        const collectionName=process.env.Mongo_UserPreferenceCollectionName;
        const {client, database, collection} = await getDBConnectionDetails(DBName, collectionName);

        const result = await collection.insertOne(userPreference);
    } catch (error) {
        console.log("Error occured in Saving the UserPreference : ", error);
    }
}