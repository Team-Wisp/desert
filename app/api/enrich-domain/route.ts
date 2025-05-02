import { NextRequest, NextResponse } from 'next/server';
import { enrichDomain } from '@/lib/services/domainEnrichmentService';
import { OrganizationType } from '@/lib/models/OrganizationType';

export async function POST(req: NextRequest) {
  try {
    const { domain, domainType } = await req.json();

    if (!domain || !domainType) {
      return NextResponse.json({ message: 'Missing domain or domainType' }, { status: 400 });
    }

    await enrichDomain(domain, domainType as OrganizationType);

    return NextResponse.json({ message: 'Enrichment complete' }, { status: 200 });
  } catch (err) {
    console.error('Error in enrich-domain API:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
