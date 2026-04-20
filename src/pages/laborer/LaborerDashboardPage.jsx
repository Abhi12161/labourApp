import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  LogoutOutlined,
  ProjectOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  StarFilled,
  ClockCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  CalendarOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../providers/AuthProvider';
import { useLanguage } from '../../providers/LanguageProvider';

const mockJobRequirements = [
  {
    id: 1,
    consumerName: 'Raj Kumar',
    description: 'Need construction workers for residential building project',
    rajMistriCount: 2,
    laborerCount: 4,
    skills: ['Raj Mistri (Mason)', 'Construction Worker'],
    location: 'Muzaffarpur',
    budget: 500,
    deadline: '2026-04-20',
    postedDate: '2026-04-08',
    status: 'available',
  },
  {
    id: 2,
    consumerName: 'Priya Singh',
    description: 'Renovation work for house - plastering and painting required',
    rajMistriCount: 1,
    laborerCount: 2,
    skills: ['Raj Mistri (Mason)', 'Painter'],
    location: 'Muzaffarpur',
    budget: 450,
    deadline: '2026-04-25',
    postedDate: '2026-04-09',
    status: 'available',
  },
  {
    id: 3,
    consumerName: 'Sunil Gupta',
    description: 'Commercial building construction - multiple workers needed',
    rajMistriCount: 4,
    laborerCount: 8,
    skills: ['Raj Mistri (Mason)', 'Labour (General)', 'Construction Worker'],
    location: 'Patna',
    budget: 600,
    deadline: '2026-05-01',
    postedDate: '2026-04-07',
    status: 'available',
  },
  {
    id: 4,
    consumerName: 'Anita Sharma',
    description: 'Electrical and plumbing work for new house',
    rajMistriCount: 0,
    laborerCount: 2,
    skills: ['Electrician', 'Plumber'],
    location: 'Muzaffarpur',
    budget: 650,
    deadline: '2026-04-18',
    postedDate: '2026-04-09',
    status: 'available',
  },
];

const stats = [
  { key: 'earnings', value: '₹42,500', icon: DollarOutlined, trend: '+12%', color: '#4caf50' },
  { key: 'completed', value: '23', icon: CheckCircleOutlined, trend: '+8%', color: '#1976d2' },
  { key: 'rating', value: '4.7', icon: StarFilled, trend: '+0.2', color: '#ff9800' },
  { key: 'active', value: '5', icon: ClockCircleOutlined, trend: '+3', color: '#f57c00' },
];

export function LaborerDashboardPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const common = t.common;
  const copy = t.laborerDashboard;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApply = (jobId) => {
    setAppliedJobs([...appliedJobs, jobId]);
  };

  const filteredJobs = mockJobRequirements.filter((job) => {
    const matchesLocation = user?.location ? job.location === user.location : true;
    const matchesSkills = user?.skills?.some((skill) => job.skills.includes(skill)) || false;

    if (activeTab === 0) {
      return !appliedJobs.includes(job.id) && (matchesLocation || matchesSkills);
    }

    return appliedJobs.includes(job.id);
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <AppBar position="sticky" sx={{ bgcolor: '#fff', boxShadow: 1 }}>
        <Toolbar>
          <ProjectOutlined style={{ fontSize: 28, color: '#f57c00', marginRight: 12 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: '#000' }}>
            {common.appName}
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
            {user?.name || common.laborer}
          </Typography>
          <Button startIcon={<LogoutOutlined />} onClick={handleLogout} sx={{ color: 'text.secondary' }}>
            {common.logout}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {copy.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            {copy.subtitle}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.key}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card sx={{ borderRadius: 3, boxShadow: 2, height: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: `${stat.color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <stat.icon style={{ fontSize: 24, color: stat.color }} />
                        </Box>
                        <Chip
                          label={stat.trend}
                          size="small"
                          icon={<RiseOutlined />}
                          sx={{
                            bgcolor: '#e8f5e9',
                            color: '#4caf50',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Typography variant="h4" fontWeight="bold" mb={0.5}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {copy.stats[stat.key]}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mb: 3 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab
                label={`${copy.availableJobs} (${mockJobRequirements.filter((job) => !appliedJobs.includes(job.id)).length})`}
                sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 600 }}
              />
              <Tab
                label={`${copy.myApplications} (${appliedJobs.length})`}
                sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          <Grid container spacing={3}>
            {filteredJobs.length === 0 ? (
              <Grid item xs={12}>
                <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
                  <Typography variant="h6" color="text.secondary">
                    {activeTab === 0 ? copy.noAvailableJobs : copy.noApplications}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {activeTab === 0 ? copy.checkBackLater : copy.startApplying}
                  </Typography>
                </Paper>
              </Grid>
            ) : (
              filteredJobs.map((job, index) => (
                <Grid item xs={12} lg={6} key={job.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: 2,
                        border: '2px solid',
                        borderColor: appliedJobs.includes(job.id) ? '#f57c00' : 'transparent',
                        '&:hover': { boxShadow: 4 },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                              {job.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <UserOutlined style={{ fontSize: 14, color: '#666' }} />
                              <Typography variant="body2" color="text.secondary">
                                {job.consumerName}
                              </Typography>
                            </Box>
                          </Box>
                          {appliedJobs.includes(job.id) && (
                            <Chip label={copy.applied} color="warning" size="small" icon={<CheckCircleOutlined />} />
                          )}
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              {copy.workersNeeded}
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {job.rajMistriCount} Raj Mistri, {job.laborerCount} Laborer
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary" display="block">
                              {copy.budget}
                            </Typography>
                            <Typography variant="body2" fontWeight={600} color="#4caf50">
                              ₹{job.budget}/day
                            </Typography>
                          </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <EnvironmentOutlined style={{ fontSize: 16, color: '#666' }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.location}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <CalendarOutlined style={{ fontSize: 16, color: '#666' }} />
                          <Typography variant="body2" color="text.secondary">
                            {copy.deadlineLabel}: {job.deadline}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {job.skills.map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{
                                bgcolor: user?.skills?.includes(skill) ? '#fff3e0' : '#f5f5f5',
                                color: user?.skills?.includes(skill) ? '#f57c00' : 'text.secondary',
                                fontWeight: user?.skills?.includes(skill) ? 600 : 400,
                              }}
                            />
                          ))}
                        </Box>

                        {!appliedJobs.includes(job.id) && (
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={() => handleApply(job.id)}
                            sx={{
                              background: 'linear-gradient(135deg, #f57c00 0%, #ff6f00 100%)',
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600,
                              '&:hover': {
                                background: 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)',
                              },
                            }}
                          >
                            {copy.applyNow}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))
            )}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
