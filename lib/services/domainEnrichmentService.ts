import dbConnect from '@/lib/db';
import Organization from '@/lib/models/Organization';
import { OrganizationType } from '@/lib/models/OrganizationType';
import axios from 'axios';
import slugify from 'slugify';

const openaiAPIKey = process.env.OPENAI_API_KEY;

export async function enrichDomain(domain: string, domainType: OrganizationType) {
  if (!openaiAPIKey) {
    throw new Error('OPENAI_API_KEY is not defined in the environment variables');
  }

  console.log(`[INFO] Starting enrichment for domain: ${domain}, type: ${domainType}`);

  await dbConnect();

  // Check if already exists
  const existing = await Organization.findOne({ domain });
  if (existing) {
    console.log(`[INFO] Domain already exists: ${domain}`);
    return;
  }

  console.log(`[INFO] Fetching org name from OpenAI for domain: ${domain}`);
  const orgName = await fetchOrgNameFromOpenAI(domain);

  const slug = slugify(orgName, { lower: true });

  const org = new Organization({
    name: orgName || 'Unknown',
    domain,
    type: domainType,
    org_slug: slug,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await org.save();

  console.log(`[SUCCESS] Enriched and saved org for domain: ${domain}`);
}

async function fetchOrgNameFromOpenAI(domain: string): Promise<string> {
  try {
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

    const name = response.data.choices?.[0]?.message?.content?.trim();
    console.log(`[INFO] Extracted org name from OpenAI: "${name}"`);
    return name || '';
  } catch (err) {
    console.error(`[ERROR] Failed to fetch org name from OpenAI`, err);
    return '';
  }
}
