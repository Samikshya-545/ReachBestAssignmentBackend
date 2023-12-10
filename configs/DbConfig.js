import { MongoClient, ServerApiVersion } from 'mongodb';



const getMongoURI = () => {
    const mongoURI = `mongodb+srv://codesamikshya123:${process.env.MONGODB_PASSWORD}@cluster0.6cdggzd.mongodb.net/?retryWrites=true&w=majority`;

    return mongoURI;
}

const connectToMongoDB = async () => {
    console.log(getMongoURI());
    const client = new MongoClient(getMongoURI(), {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        }
    });
    
    try {
        if(!client){
            await client.connect();
            console.log('Connected to MongoDB Atlas');
        }
        return client;
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
      throw error;
    }
}



export const getDBConnectionDetails = async (givenDbName, givenCollectionName) => {
    try{
        var client, database, collection;
        client = await connectToMongoDB();
        database = client.db(givenDbName); // Replace with your database name
        collection = database.collection(givenCollectionName);
        console.log("MongoDB connected Successfully. !!!");
        console.log(`DB_NAME : ${givenDbName} , COLLECTION_NAME : ${givenCollectionName}`);
    
        return {
            client, database, collection
        };
    }
    catch(error){
        console.error("Error in DB Connection : ", error);
    }
    
}