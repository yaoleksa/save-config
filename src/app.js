import React from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

const client = createClient('https://azxmmelolclqfcfjgpka.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6eG1tZWxvbGNscWZjZmpncGthIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMTk0MTEsImV4cCI6MjAxNDU5NTQxMX0.nYQqwnBeFbD5qlQ6fpVxN8PH2Nvegtgga05wqEm3-y8');

function saveConfig() {
    try {
        const userMessage = document.getElementById('new_config');
        const conf = JSON.parse(userMessage.value);
        userMessage.value = null;
        client.auth.signInWithPassword({
            email: 'ekt_1@ukr.net',
            password: 'notveryeasy4473'
        }).then(databaseResponse => {
            client.auth.setSession({
                access_token: databaseResponse.data.session.access_token,
                refresh_token: databaseResponse.data.session.refresh_token
            }).then(status => {
                if(status.data.user.aud === 'authenticated') {
                    client.from('jsonbase').update({
                        name: 'config',
                        data: conf
                    }).eq('name', 'config').then(response => {
                        console.log(response);
                        new Popup({
                            id: 'success-message',
                            title: 'Success',
                            content: 'Your data was successfuly saved'
                        }).show();
                        setTimeout(() => { 
                            window.open(window.location.href.match(/^(.*)save-config/)[0] + 
                            '/index.html', '_self');
                        }, 30000);
                    }).catch(error => {
                        new Popup({
                            id: 'save-error-message',
                            title: 'Error',
                            content: `Unable to save JSON: ${error.message}`
                        }).show();
                    });
                } else {
                    new Popup({
                        id: 'upsert-error-message',
                        title: 'Error',
                        content: 'Failed to upsert new configuration!'
                    }).show();
                }
            })
        });
    } catch(error) {
        new Popup({
            id: 'input-error-message',
            title: 'Error',
            content: 'Invalid JSON input'
        }).show();
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