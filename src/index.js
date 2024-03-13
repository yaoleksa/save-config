import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

const client = createClient('https://azxmmelolclqfcfjgpka.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6eG1tZWxvbGNscWZjZmpncGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMTk0MTEsImV4cCI6MjAxNDU5NTQxMX0.nYQqwnBeFbD5qlQ6fpVxN8PH2Nvegtgga05wqEm3-y8');


function Config() {
    const [config, setConfig] = useState(null);
    useEffect(() => {
        client.from('jsonbase').select('data').eq('name', 'config').then(response => {
            setConfig(response.data[0]);
        });
    });
    return <code>{JSON.stringify(config, null, 2)}</code>
}

ReactDOM.createRoot(document.getElementById('root')).render(<Config/>);