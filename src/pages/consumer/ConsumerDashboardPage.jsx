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
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import {
  LogoutOutlined,
  ProjectOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../providers/AuthProvider';
import { useLanguage } from '../../providers/LanguageProvider';

const mockLaborers = [
  { id: 1, name: 'Ramesh Sharma', skills: ['Raj Mistri (Mason)', 'Construction Worker'], rating: 4.8, reviews: 87, rate: 500, location: 'Muzaffarpur', experience: 8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 2, name: 'Suresh Kumar', skills: ['Labour (General)', 'Construction Worker'], rating: 4.6, reviews: 45, rate: 350, location: 'Muzaffarpur', experience: 5, image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
  { id: 3, name: 'Vijay Singh', skills: ['Carpenter', 'Raj Mistri (Mason)'], rating: 4.9, reviews: 112, rate: 550, location: 'Patna', experience: 10, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' },
  { id: 4, name: 'Rajesh Yadav', skills: ['Plumber', 'Electrician'], rating: 4.7, reviews: 76, rate: 600, location: 'Muzaffarpur', experience: 6, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
  { id: 5, name: 'Amit Gupta', skills: ['Electrician'], rating: 4.8, reviews: 93, rate: 650, location: 'Gaya', experience: 7, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 6, name: 'Manoj Tiwari', skills: ['Painter', 'Labour (General)'], rating: 4.5, reviews: 54, rate: 400, location: 'Muzaffarpur', experience: 4, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
];

const skillOptions = [
  'Raj Mistri (Mason)',
  'Labour (General)',
  'Carpenter',
  'Plumber',
  'Electrician',
  'Painter',
  'Welder',
  'Construction Worker',
];

const cities = ['All', 'Muzaffarpur', 'Patna', 'Gaya', 'Bhagalpur', 'Darbhanga', 'Purnia', 'Munger', 'Chapra'];

export function ConsumerDashboardPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showRequirementForm, setShowRequirementForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [requirements, setRequirements] = useState([]);
  const [requirementForm, setRequirementForm] = useState({
    rajMistriCount: 0,
    laborerCount: 0,
    skills: [],
    location: 'Muzaffarpur',
    budget: 0,
    deadline: '',
    description: '',
  });

  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const common = t.common;
  const copy = t.consumerDashboard;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSkillToggle = (skill) => {
    setRequirementForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((item) => item !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmitRequirement = (e) => {
    e.preventDefault();

    const newRequirement = {
      id: Date.now(),
      ...requirementForm,
      status: 'open',
    };

    setRequirements([newRequirement, ...requirements]);
    setShowRequirementForm(false);
    setRequirementForm({
      rajMistriCount: 0,
      laborerCount: 0,
      skills: [],
      location: 'Muzaffarpur',
      budget: 0,
      deadline: '',
      description: '',
    });
  };

  const filteredLaborers = mockLaborers.filter((laborer) => {
    const matchesSearch =
      laborer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      laborer.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === 'All' || laborer.location === locationFilter;

    return matchesSearch && matchesLocation;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <AppBar position="sticky" sx={{ bgcolor: '#fff', boxShadow: 1 }}>
        <Toolbar>
          <ProjectOutlined style={{ fontSize: 28, color: '#1976d2', marginRight: 12 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: '#000' }}>
            {common.appName}
          </Typography>
          <Typography variant="body2" sx={{ mr: 2, color: 'text.secondary' }}>
            {user?.name || common.consumer}
          </Typography>
          <Button startIcon={<LogoutOutlined />} onClick={handleLogout} sx={{ color: 'text.secondary' }}>
            {common.logout}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {copy.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {copy.subtitle}
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={() => setShowRequirementForm(true)}
              sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #3949ab 100%)',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              {copy.postRequirement}
            </Button>
          </Box>

          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
            <Tab label={copy.browseWorkers} sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 600 }} />
            <Tab label={`${copy.myRequirements} (${requirements.length})`} sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 600 }} />
          </Tabs>

          {activeTab === 0 ? (
            <>
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder={copy.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined style={{ color: '#1976d2' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ bgcolor: '#fff', borderRadius: 2 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    label={common.location}
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EnvironmentOutlined style={{ color: '#1976d2' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ bgcolor: '#fff', borderRadius: 2 }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city === 'All' ? common.allCities : city}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                {filteredLaborers.map((laborer, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={laborer.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card sx={{ borderRadius: 3, boxShadow: 2, '&:hover': { boxShadow: 4 } }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Avatar src={laborer.image} sx={{ width: 64, height: 64 }} />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" fontWeight="bold">
                                {laborer.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {laborer.experience} years exp
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                            {laborer.skills.map((skill) => (
                              <Chip key={skill} label={skill} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }} />
                            ))}
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Rating value={laborer.rating} precision={0.1} size="small" readOnly />
                            <Typography variant="body2" fontWeight={600}>
                              {laborer.rating}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ({laborer.reviews} reviews)
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <EnvironmentOutlined style={{ fontSize: 16, color: '#666' }} />
                            <Typography variant="body2" color="text.secondary">
                              {laborer.location}
                            </Typography>
                          </Box>

                          <Typography variant="h6" fontWeight="bold" color="#1976d2" mb={2}>
                            ₹{laborer.rate}/day
                          </Typography>

                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              background: 'linear-gradient(135deg, #1976d2 0%, #3949ab 100%)',
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            {copy.contactWorker}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Box>
              {requirements.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    {copy.noRequirements}
                  </Typography>
                  <Button onClick={() => setShowRequirementForm(true)} sx={{ color: '#1976d2', fontWeight: 600 }}>
                    {copy.postFirstRequirement}
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {requirements.map((requirement) => (
                    <Grid item xs={12} key={requirement.id}>
                      <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" fontWeight="bold">
                              {requirement.description}
                            </Typography>
                            <Chip
                              label={requirement.status === 'open' ? common.open : common.matched}
                              color={requirement.status === 'open' ? 'success' : 'primary'}
                              size="small"
                            />
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                              <Typography variant="caption" color="text.secondary">
                                {copy.workersNeeded}
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                {requirement.rajMistriCount} Raj Mistri, {requirement.laborerCount} Laborer
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Typography variant="caption" color="text.secondary">
                                {common.location}
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                {requirement.location}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Typography variant="caption" color="text.secondary">
                                {common.budgetPerDay}
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                ₹{requirement.budget}/day
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                              <Typography variant="caption" color="text.secondary">
                                {common.deadline}
                              </Typography>
                              <Typography variant="body1" fontWeight={600}>
                                {requirement.deadline}
                              </Typography>
                            </Grid>
                          </Grid>

                          {requirement.skills.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                {copy.requiredSkills}
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {requirement.skills.map((skill) => (
                                  <Chip key={skill} label={skill} size="small" sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }} />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </motion.div>
      </Container>

      <Dialog open={showRequirementForm} onClose={() => setShowRequirementForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">
            {copy.postRequirementTitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmitRequirement} sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label={copy.description}
              value={requirementForm.description}
              onChange={(e) => setRequirementForm({ ...requirementForm, description: e.target.value })}
              placeholder={copy.descriptionPlaceholder}
              required
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label={copy.numberOfRajMistri}
                  value={requirementForm.rajMistriCount}
                  onChange={(e) => setRequirementForm({ ...requirementForm, rajMistriCount: Number.parseInt(e.target.value, 10) || 0 })}
                  inputProps={{ min: 0 }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label={copy.numberOfLaborers}
                  value={requirementForm.laborerCount}
                  onChange={(e) => setRequirementForm({ ...requirementForm, laborerCount: Number.parseInt(e.target.value, 10) || 0 })}
                  inputProps={{ min: 0 }}
                  required
                />
              </Grid>
            </Grid>

            <Box>
              <Typography variant="body2" fontWeight={600} mb={2}>
                {copy.skillsRequiredOptional}
              </Typography>
              <Grid container spacing={1}>
                {skillOptions.map((skill) => (
                  <Grid item xs={6} key={skill}>
                    <Chip
                      label={skill}
                      onClick={() => handleSkillToggle(skill)}
                      clickable
                      sx={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        background: requirementForm.skills.includes(skill)
                          ? 'linear-gradient(135deg, #1976d2 0%, #3949ab 100%)'
                          : '#f5f5f5',
                        color: requirementForm.skills.includes(skill) ? '#fff' : 'text.primary',
                        fontWeight: requirementForm.skills.includes(skill) ? 600 : 400,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label={common.location}
                  value={requirementForm.location}
                  onChange={(e) => setRequirementForm({ ...requirementForm, location: e.target.value })}
                  required
                >
                  {cities.filter((city) => city !== 'All').map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label={common.budgetPerDay}
                  value={requirementForm.budget}
                  onChange={(e) => setRequirementForm({ ...requirementForm, budget: Number.parseInt(e.target.value, 10) || 0 })}
                  placeholder="₹"
                  inputProps={{ min: 0 }}
                  required
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              type="date"
              label={common.deadline}
              value={requirementForm.deadline}
              onChange={(e) => setRequirementForm({ ...requirementForm, deadline: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setShowRequirementForm(false)}>{common.cancel}</Button>
          <Button
            onClick={handleSubmitRequirement}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #3949ab 100%)',
              textTransform: 'none',
              fontWeight: 600,
              px: 4,
            }}
          >
            {copy.submitRequirement}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
