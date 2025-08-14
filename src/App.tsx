import { Container, Grid, Typography, Box, Paper } from "@mui/material";
import { useManipulator } from "./hooks/useManipulator";
import { ControlPanel } from "./components/ControlPanel";
import { Visualization } from "./components/Visualization";

function App() {
  const {
    fields, manipulatorPos, isClawClosed, hasSample, isAnimating,
    animationSpeed, setAnimationSpeed, originalCommand, setOriginalCommand,
    optimizedCommand, handleStartAnimation,
  } = useManipulator();

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(to top right, #f0f2f5, #e6e9f0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: { xs: 1, sm: 2 },
    }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4 }, borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 16px 40px -12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <Typography
            variant="h4" component="h1" gutterBottom align="center"
            sx={{
              fontWeight: 700, mb: { xs: 3, md: 5 },
              color: '#2c3e50', letterSpacing: '0.5px'
            }}
          >
            Панель управления манипулятором
          </Typography>
          <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
            <Grid className="w-70">
              <ControlPanel
                originalCommand={originalCommand}
                setOriginalCommand={setOriginalCommand}
                optimizedCommand={optimizedCommand}
                animationSpeed={animationSpeed}
                setAnimationSpeed={setAnimationSpeed}
                isAnimating={isAnimating}
                onStart={handleStartAnimation}
              />
            </Grid>
            <Grid>
              <Visualization
                fields={fields}
                manipulatorPos={manipulatorPos}
                isClawClosed={isClawClosed}
                hasSample={hasSample}
                animationSpeed={animationSpeed}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;