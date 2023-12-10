import { getDBConnectionDetails } from "../configs/DbConfig.js";
import { BookList } from "../models/BookList.js";

export const fetchBookList = async () => {
    try {
        const DBName = process.env.Mongo_DBName;
        const collectionName=process.env.Mongo_BookList_CollectionName;
        const {client, database, collection} = await getDBConnectionDetails(DBName, collectionName);
        return await collection.find({}).toArray();
    } catch (error) {
        console.log("Error occured while retrieving the Booklist : ", error);
    }
}

export const saveBookList = async () => {
    try {
        const DBName = process.env.Mongo_DBName;
        const collectionName=process.env.Mongo_BookList_CollectionName;
        const {client, database, collection} = await getDBConnectionDetails(DBName, collectionName);

        const result = await collection.insertMany(BookList);
    } catch (error) {
        console.log("Error occured in Saving the Booklist : ", error);
    }   
}