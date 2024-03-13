import React from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

const client = createClient('https://azxmmelolclqfcfjgpka.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6eG1tZWxvbGNscWZjZmpncGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMTk0MTEsImV4cCI6MjAxNDU5NTQxMX0.nYQqwnBeFbD5qlQ6fpVxN8PH2Nvegtgga05wqEm3-y8');

function saveConfig() {
    try {
        const conf = JSON.parse(document.getElementById('new_config').value);
        client.from('jsonbase').upsert({
            name: 'config',
            data: conf
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error.message);
        });
    } catch(error) {
        alert('Invalid JSON input');
    }
}

function ConfigForm() {
    return (<form>
        <textarea placeholder='Input new config in JSON format' id='new_config'></textarea>
        <br/>
        <input type='button' value='Save config' onClick={saveConfig}></input>
    </form>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<ConfigForm/>);