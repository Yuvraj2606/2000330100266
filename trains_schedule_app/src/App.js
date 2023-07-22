import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Card, CardContent, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

const theme = createTheme();

const MOCK_API_URL = 'https://api.johndoerailways.com/trains'; // Replace with actual API URL

const App = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch trains data
    setTimeout(() => {
      // In a real-world scenario, use fetch or axios to make API calls
      const mockResponse = {
        data: [
          { id: 1, name: 'Express Train 1', departureTime: '09:30', delay: 5, seatsAvailable: 50, priceSleeper: 500, priceAC: 1000 },
          { id: 2, name: 'Superfast Train 5', departureTime: '10:00', delay: 0, seatsAvailable: 30, priceSleeper: 600, priceAC: 1200 },
          { id: 3, name: 'Local Train 2', departureTime: '11:15', delay: 10, seatsAvailable: 20, priceSleeper: 400, priceAC: 800 },
        ],
      };

      setTrains(mockResponse.data);
      setLoading(false);
    }, 1000); // Simulate API delay
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">John Doe Railways - Trains Schedule</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <h2>All Trains Schedule</h2>
          {loading ? (
            <CircularProgress style={{ margin: '50px auto', display: 'block' }} />
          ) : (
            trains.map((train) => (
              <Card key={train.id} style={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {train.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Departure Time: {train.departureTime} (Delayed by {train.delay} mins)
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Seats Available: {train.seatsAvailable}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Price (Sleeper): {train.priceSleeper}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Price (AC): {train.priceAC}
                  </Typography>
                </CardContent>
              </Card>
            ))
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;