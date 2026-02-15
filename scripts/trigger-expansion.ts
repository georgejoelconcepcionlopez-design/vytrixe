import { runProgrammaticExpansion } from '../services/programmaticService';
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

async function runExpansion() {
    console.log('🔗 Triggering Programmatic Expansion Engine...')
    try {
        const results = await runProgrammaticExpansion();
        console.log('✅ Expansion Results:', JSON.stringify(results, null, 2));
    } catch (error: any) {
        console.error('❌ Expansion Failed:', error.message);
    }
}

runExpansion()
