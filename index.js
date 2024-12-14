const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const app = express();

const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());  // Middleware to parse JSON request body

const supabaseUrl = 'https://dzpdevelpcpehunabrtv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6cGRldmVscGNwZWh1bmFicnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMzM1MzcsImV4cCI6MjA0OTcwOTUzN30.UKJCsKabFUi7-Op-Eb7gwPj81mDWGIJgql2hrczNAkU';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

// API Endpoint 1: GET /top-cities - Retrieve top 3 cities by search count
app.get('/top-cities', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('weather')
            .select('city_name', 'search_count')
            .order('search_count', { ascending: false })
            .limit(3);

        if (error) {
            return res.status(500).json({ error: 'Error retrieving top cities' });
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// API Endpoint 2: POST /weather - Update search count for a specific city
app.post('/weather', async (req, res) => {
    const { city_name } = req.body;

    if (!city_name) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        // Check if the city already exists
        const { data: existingCity, error: getCityError } = await supabase
            .from('weather')
            .select('city_name', 'search_count')
            .eq('city_name', city_name)
            .single();

        if (getCityError) {
            return res.status(500).json({ error: 'Error checking city' });
        }

        if (existingCity) {
            // If the city exists, update the search count
            const { error } = await supabase
                .from('weather')
                .update({ search_count: existingCity.search_count + 1 })
                .eq('city_name', city_name);

            if (error) {
                return res.status(500).json({ error: 'Error updating search count' });
            }
        } else {
            // If the city doesn't exist, insert a new city with a search count of 1
            const { error } = await supabase
                .from('weather')
                .insert([{ city_name, search_count: 1 }])
                .select();

            if (error) {
                return res.status(500).json({ error: 'Error adding new city' });
            }
        }

        return res.status(200).json({ message: 'City search count updated' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Express app listening on port:${port}`);
});