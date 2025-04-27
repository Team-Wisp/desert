//endpoint for caching domain & org (using OpenAI)

import { NextRequest, NextResponse } from "next/server";    
import { enrichDomain } from "@/lib/services/domainEnrichmentService";
export async function POST(req: NextRequest) {
    try {
      const { domain, domainType } = await req.json();
  
      if (!domain || !domainType) {
        return NextResponse.json({ message: 'Missing domain or domainType' }, { status: 400 });
      }
  
      await enrichDomain(domain, domainType);
  
      return NextResponse.json({ message: 'Enrichment process completed ! ' }, { status: 200 });
    } catch (error) {
      console.error('Error in enrich-domain route:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }