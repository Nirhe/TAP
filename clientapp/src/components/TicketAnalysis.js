import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CategoryIcon from '@mui/icons-material/Category';
import FlagIcon from '@mui/icons-material/Flag';
import DescriptionIcon from '@mui/icons-material/Description';
import TaskIcon from '@mui/icons-material/Task';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiChip-label': {
    color: theme.palette.text.secondary,
  },
}));

const TicketAnalysis = () => {
  const [ticketContent, setTicketContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnalysis(null);

    try {
      const response = await fetch('/api/analyze-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketContent }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('Failed to analyze ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Critical: 'error',
      High: 'warning',
      Medium: 'info',
      Low: 'success',
    };
    return colors[priority] || 'default';
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Ticket Analysis AI
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Transform complex support tickets into actionable insights
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4 }}>
          <FeatureChip icon={<CategoryIcon />} label="AI Powered" />
          <FeatureChip icon={<FlagIcon />} label="Real-time Analysis" />
          <FeatureChip icon={<DescriptionIcon />} label="Smart Insights" />
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4 }}>
        <StyledCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CategoryIcon color="primary" />
              Ticket Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                placeholder="Paste your support ticket details here..."
                value={ticketContent}
                onChange={(e) => setTicketContent(e.target.value)}
                disabled={loading}
                sx={{ mb: 3 }}
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading || !ticketContent.trim()}
                endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
              >
                {loading ? 'Analyzing...' : 'Analyze Ticket'}
              </Button>
            </form>
          </Box>
        </StyledCard>

        <StyledCard>
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DescriptionIcon color="primary" />
              Analysis Results
            </Typography>
            {error ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            ) : analysis ? (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CategoryIcon color="action" />
                    Category
                  </Typography>
                  <Chip label={analysis.analysis.category} color="primary" />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FlagIcon color="action" />
                    Priority
                  </Typography>
                  <Chip
                    label={analysis.analysis.priority}
                    color={getPriorityColor(analysis.analysis.priority)}
                    icon={<FlagIcon />}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon color="action" />
                    Summary
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {analysis.analysis.summary}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TaskIcon color="action" />
                    Recommended Actions
                  </Typography>
                  <List>
                    {analysis.recommendations.suggestedActions.map((action, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={action} />
                        </ListItem>
                        {index < analysis.recommendations.suggestedActions.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                <DescriptionIcon sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  AI Analysis Ready
                </Typography>
                <Typography>
                  Enter a ticket description and click analyze to get started
                </Typography>
              </Box>
            )}
          </Box>
        </StyledCard>
      </Box>
    </Box>
  );
};

export default TicketAnalysis; 