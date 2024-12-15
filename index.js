const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const app = express();

const host = window.location.origin;
const port = 4000;


//app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.json());  // Middleware to parse JSON request body

const supabaseUrl = 'https://dzpdevelpcpehunabrtv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6cGRldmVscGNwZWh1bmFicnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMzM1MzcsImV4cCI6MjA0OTcwOTUzN30.UKJCsKabFUi7-Op-Eb7gwPj81mDWGIJgql2hrczNAkU';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


app.get('/', (req, res) => {
    res.sendFile('public/WFAbout.html', { root: __dirname })

})
app.get('/', (req, res) => {
    res.sendFile('public/WFHelp.html', { root: __dirname })

})

app.get('/', (req, res) => {
    res.sendFile('public/WFHome.html', { root: __dirname })

})
//app.get('/WFHomePage',  (req, res ) => {
//res.sendFile('public/WFHomePage.js', {root:__dirname})
//
//})

app.get('/', (req, res) => {
    res.sendFile('public/WForecast.html', { root: __dirname })

})

//app.get('/WForecastPage',  (req, res ) => {
// res.sendFile('public/WForecastPage.js', {root:__dirname})

//})
app.get('/', (req, res) => {
    res.sendFile('public/WFPollution.html', { root: __dirname })

})
//app.get('/WFPollutionPage',  (req, res ) => {
//  res.sendFile('public/WFPollutionPage.js', {root:__dirname})

//})

app.get('/', (req, res) => {
    res.sendFile('public/Weatherly_Logo.jpeg', { root: __dirname })

})

app.get('/', (req, res) => {
    res.sendFile('public/WF.css', { root: __dirname });
})


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
// Function to send a city name to the backend
async function updateWeatherSearch(cityName) {
    try {
        // Send a POST request to the weather endpoint with the city name
        const response = await fetch(`${host}/weather`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Set the content type to JSON
            },
            body: JSON.stringify({
                cityName: cityName,  // Pass the city name to the server
            }),
        });

        // Check if the response is okay (status 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.error); // Log the error from server response
            return;
        }

        // Parse the JSON response from the server
        const data = await response.json();
        console.log('Success:', data.message); // Log the success message
    } catch (error) {
        console.error('Error fetching data:', error); // Handle any network or fetch errors
    }
}

// Example usage: Call the function with a city name
updateWeatherSearch('New York');


app.post('/weather', async (req, res) => {

    console.log('Request body:', req.body); // Debugging line

    const { cityName } = req.body;

    if (!cityName) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        // Check if the city already exists
        const { data: existingCity, error: getCityError } = await supabase
            .from('weather')
            .select('city_name', 'search_count')
            .eq('city_name', cityName)
            .single();

        if (getCityError && getCityError.message !== 'No rows found') {
            return res.status(500).json({ error: 'Error checking city' });
        }

        if (existingCity) {
            // If the city exists, update the search count
            const { error: updateError } = await supabase
                .from('weather')
                .update({ search_count: existingCity.search_count + 1 })
                .eq('city_name', cityName);

            if (updateError) {
                return res.status(500).json({ error: 'Error updating search count' });
            }
        } else {
            // If the city doesn't exist, insert a new city with search count of 1
            const { error: insertError } = await supabase
                .from('weather')
                .insert([{ city_name: cityName, search_count: 1 }]);

            if (insertError) {
                return res.status(500).json({ error: 'Error adding new city' });
            }
        }

        return res.status(200).json({ message: 'City search count updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});


app.listen(port, () => {
    console.log(`Express app listening on port:${port}`);
});