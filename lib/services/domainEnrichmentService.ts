import {MongoClient} from 'mongodb';
import axios from 'axios';

const mongoURI = process.env.MONGO_URI || '';
const mongoDB = process.env.MONGO_DB_NAME || '';
const openaiAPIKey = process.env.OPENAI_API_KEY;

export async function enrichDomain(domain: string, domainType: string){
    if (!mongoURI || !mongoDB) {
        throw new Error('MONGO_URI or MONGO_DB_NAME  is not defined in the environment variables');
    }
    console.log(`[INFO] Starting enrichment for domain: ${domain}, type: ${domainType}`);
    
    const client = new MongoClient(mongoURI);
    try{
        console.log('[INFO] Connecting to MongoDB..');
        await client.connect();
        console.log('[INFO] Connected to MongoDB');

        const db = client.db(mongoDB);
        const orgsCollection = db.collection('organizations');
        
        // check if it exists 
        console.log(`[INFO] Checking if domain already exists: ${domain}`);
        const existing = await orgsCollection.findOne({domain});
        if(existing){
            console.log(`[INFO] Domain already exists in the database: ${domain}`);
            await client.close();
            return;
        
        }
        // fetch using OpenAI
        console.log(`[INFO] Fetching organization name from OpenAI for domain: ${domain}`);
        const orgName = await fetchOrgNameFromOpenAI(domain);

        console.log(`[INFO] Inserting new domain into the database: ${domain}`);
        await orgsCollection.insertOne({
            domain,
            org_name: orgName || "Unknown",
            org_type: domainType,
            createdAt: new Date(),
          });
         console.log(`[SUCCESS] Enrichment complete for domain: ${domain}`);
        }catch (err){
            console.error(`[ERROR] An error occurred during enrichment for domain: ${domain}`, err);
            throw err;
        } finally{
            console.log('[INFO] Closing MongoDB connection');
            await client.close();
        }
          
}

async function fetchOrgNameFromOpenAI(domain: string): Promise<string> {
    try {
      console.log(`[INFO] Sending request to OpenAI API for domain: ${domain}`);
      const prompt = `Return only the full legal organization name associated with the domain ${domain}. No description or explanation.`;
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 20,
          temperature: 0.2,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiAPIKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const content = response.data.choices?.[0]?.message?.content?.trim() || '';
      console.log(`[INFO] OpenAI API response received for domain: ${domain}. Extracted organization name: "${content}"`);
      return content;
    } catch (error) {
        console.error(`[ERROR] OpenAI API error for domain: ${domain}`, error);
      return '';
    }
  }