import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Avatar, Button, Card, Empty, Input, Modal, Rate, Tag, Typography } from 'antd';
import { Col, Container, Form, InputGroup, Nav, Row } from 'react-bootstrap';
import {
  EnvironmentOutlined,
  LogoutOutlined,
  PlusOutlined,
  ProjectOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../providers/AuthProvider';
import { useLanguage } from '../../providers/LanguageProvider';

const { Title, Text, Paragraph } = Typography;

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
  const [activeTab, setActiveTab] = useState('workers');
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

  const resetRequirementForm = () => {
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

  const handleSubmitRequirement = (event) => {
    event.preventDefault();

    const newRequirement = {
      id: Date.now(),
      ...requirementForm,
      status: 'open',
    };

    setRequirements((prev) => [newRequirement, ...prev]);
    setShowRequirementForm(false);
    resetRequirementForm();
  };

  const filteredLaborers = mockLaborers.filter((laborer) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const matchesSearch =
      laborer.name.toLowerCase().includes(normalizedQuery) ||
      laborer.skills.some((skill) => skill.toLowerCase().includes(normalizedQuery));
    const matchesLocation = locationFilter === 'All' || laborer.location === locationFilter;

    return matchesSearch && matchesLocation;
  });

  return (
    <div className="dashboard-page">
      <header className="dashboard-appbar">
        <Container fluid="xl">
          <div className="dashboard-topbar">
            <div className="dashboard-brand">
              <ProjectOutlined style={{ fontSize: 28, color: '#1976d2' }} />
              <Text className="dashboard-brand-title">{common.appName}</Text>
            </div>

            <div className="dashboard-userbar">
              <Text className="dashboard-userbar-name">{user?.name || common.consumer}</Text>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="dashboard-logout-button"
              >
                {common.logout}
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <Container fluid="xl" className="dashboard-container dashboard-container-compact">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="dashboard-hero">
            <div>
              <Title level={1} className="dashboard-page-title dashboard-page-title-consumer">
                {copy.title}
              </Title>
              <Paragraph className="dashboard-page-subtitle dashboard-page-subtitle-wide">
                {copy.subtitle}
              </Paragraph>
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setShowRequirementForm(true)}
              className="dashboard-primary-button dashboard-primary-button-consumer dashboard-primary-button-wide"
            >
              {copy.postRequirement}
            </Button>
          </div>

          <div className="dashboard-tabs">
            <Nav
              variant="tabs"
              activeKey={activeTab}
              onSelect={(selectedKey) => setActiveTab(selectedKey || 'workers')}
              className="dashboard-tab-nav"
            >
              <Nav.Item>
                <Nav.Link eventKey="workers" className="dashboard-tab-link">
                  {copy.browseWorkers}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="requirements" className="dashboard-tab-link">
                  {copy.myRequirements} ({requirements.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          {activeTab === 'workers' ? (
            <>
              <Row className="g-3 mb-4">
                <Col xs={12} md={6}>
                  <Input
                    prefix={<SearchOutlined style={{ color: '#1976d2' }} />}
                    placeholder={copy.searchPlaceholder}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    size="large"
                    className="dashboard-input-control"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <InputGroup className="dashboard-input-group">
                    <InputGroup.Text className="dashboard-input-addon">
                      <EnvironmentOutlined style={{ color: '#1976d2' }} />
                    </InputGroup.Text>
                    <Form.Select
                      aria-label={common.location}
                      value={locationFilter}
                      onChange={(event) => setLocationFilter(event.target.value)}
                      className="dashboard-select-control"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city === 'All' ? common.allCities : city}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Col>
              </Row>

              <Row className="g-4">
                {filteredLaborers.map((laborer, index) => (
                  <Col xs={12} sm={6} lg={4} key={laborer.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card className="dashboard-worker-card dashboard-section-card dashboard-card-elevated" bordered={false}>
                        <div className="dashboard-card-body dashboard-card-body-spacious">
                          <div className="dashboard-worker-header">
                            <Avatar src={laborer.image} size={64} className="dashboard-avatar" />
                            <div className="dashboard-worker-header-copy">
                              <Title level={4} className="dashboard-card-title">
                                {laborer.name}
                              </Title>
                              <Text className="dashboard-card-muted">{laborer.experience} years exp</Text>
                            </div>
                          </div>

                          <div className="dashboard-chip-wrap dashboard-chip-wrap-spaced">
                            {laborer.skills.map((skill) => (
                              <Tag key={skill} className="dashboard-chip dashboard-chip-consumer">
                                {skill}
                              </Tag>
                            ))}
                          </div>

                          <div className="dashboard-rating-row">
                            <Rate disabled allowHalf defaultValue={laborer.rating} className="dashboard-rating" />
                            <Text className="dashboard-rating-value">{laborer.rating}</Text>
                            <Text className="dashboard-card-muted">({laborer.reviews} reviews)</Text>
                          </div>

                          <div className="dashboard-meta-row dashboard-meta-row-spaced">
                            <EnvironmentOutlined style={{ fontSize: 16, color: '#666' }} />
                            <Text className="dashboard-card-muted">{laborer.location}</Text>
                          </div>

                          <Title level={4} className="dashboard-price dashboard-price-consumer">
                            Rs {laborer.rate}/day
                          </Title>

                          <Button type="primary" block className="dashboard-primary-button dashboard-primary-button-consumer">
                            {copy.contactWorker}
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <div>
              {requirements.length === 0 ? (
                <div className="dashboard-empty">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<Text className="dashboard-card-muted">{copy.noRequirements}</Text>}
                  />
                  <Button type="link" onClick={() => setShowRequirementForm(true)} className="dashboard-link-button">
                    {copy.postFirstRequirement}
                  </Button>
                </div>
              ) : (
                <Row className="g-4">
                  {requirements.map((requirement) => (
                    <Col xs={12} key={requirement.id}>
                      <Card className="dashboard-requirement-card dashboard-section-card dashboard-card-elevated" bordered={false}>
                        <div className="dashboard-card-body dashboard-card-body-spacious">
                          <div className="dashboard-card-header">
                            <Title level={4} className="dashboard-card-title dashboard-card-title-wrap">
                              {requirement.description}
                            </Title>
                            <Tag className={`dashboard-status-chip ${requirement.status === 'open' ? 'open' : 'matched'}`}>
                              {requirement.status === 'open' ? common.open : common.matched}
                            </Tag>
                          </div>

                          <Row className="g-3">
                            <Col xs={12} sm={6} md={3}>
                              <Text className="dashboard-stat-label">{copy.workersNeeded}</Text>
                              <div className="dashboard-stat-value">
                                {requirement.rajMistriCount} Raj Mistri, {requirement.laborerCount} Laborer
                              </div>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                              <Text className="dashboard-stat-label">{common.location}</Text>
                              <div className="dashboard-stat-value">{requirement.location}</div>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                              <Text className="dashboard-stat-label">{common.budgetPerDay}</Text>
                              <div className="dashboard-stat-value">Rs {requirement.budget}/day</div>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                              <Text className="dashboard-stat-label">{common.deadline}</Text>
                              <div className="dashboard-stat-value">{requirement.deadline}</div>
                            </Col>
                          </Row>

                          {requirement.skills.length > 0 && (
                            <div className="dashboard-skills-block">
                              <Text className="dashboard-stat-label dashboard-skills-label">{copy.requiredSkills}</Text>
                              <div className="dashboard-chip-wrap">
                                {requirement.skills.map((skill) => (
                                  <Tag key={skill} className="dashboard-chip dashboard-chip-consumer">
                                    {skill}
                                  </Tag>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          )}
        </motion.div>
      </Container>

      <Modal
        open={showRequirementForm}
        onCancel={() => setShowRequirementForm(false)}
        footer={null}
        width={820}
        centered
        className="dashboard-dialog"
        title={<Title level={3} className="dashboard-modal-title">{copy.postRequirementTitle}</Title>}
      >
        <Form onSubmit={handleSubmitRequirement} className="dashboard-form">
          <Form.Group className="mb-4">
            <Form.Label className="dashboard-form-label">{copy.description}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={requirementForm.description}
              onChange={(event) => setRequirementForm({ ...requirementForm, description: event.target.value })}
              placeholder={copy.descriptionPlaceholder}
              required
              className="dashboard-form-control"
            />
          </Form.Group>

          <Row className="g-3 mb-4">
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label className="dashboard-form-label">{copy.numberOfRajMistri}</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={requirementForm.rajMistriCount}
                  onChange={(event) =>
                    setRequirementForm({
                      ...requirementForm,
                      rajMistriCount: Number.parseInt(event.target.value, 10) || 0,
                    })
                  }
                  required
                  className="dashboard-form-control"
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label className="dashboard-form-label">{copy.numberOfLaborers}</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={requirementForm.laborerCount}
                  onChange={(event) =>
                    setRequirementForm({
                      ...requirementForm,
                      laborerCount: Number.parseInt(event.target.value, 10) || 0,
                    })
                  }
                  required
                  className="dashboard-form-control"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mb-4">
            <Text className="dashboard-form-label dashboard-form-label-block">{copy.skillsRequiredOptional}</Text>
            <div className="skill-toggle-grid">
              {skillOptions.map((skill) => {
                const isActive = requirementForm.skills.includes(skill);

                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`skill-toggle-chip ${isActive ? 'active consumer' : ''}`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <Row className="g-3 mb-4">
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label className="dashboard-form-label">{common.location}</Form.Label>
                <Form.Select
                  value={requirementForm.location}
                  onChange={(event) => setRequirementForm({ ...requirementForm, location: event.target.value })}
                  required
                  className="dashboard-form-control dashboard-form-select"
                >
                  {cities.filter((city) => city !== 'All').map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Label className="dashboard-form-label">{common.budgetPerDay}</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={requirementForm.budget}
                  onChange={(event) =>
                    setRequirementForm({
                      ...requirementForm,
                      budget: Number.parseInt(event.target.value, 10) || 0,
                    })
                  }
                  placeholder="Rs"
                  required
                  className="dashboard-form-control"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="dashboard-form-label">{common.deadline}</Form.Label>
            <Form.Control
              type="date"
              value={requirementForm.deadline}
              onChange={(event) => setRequirementForm({ ...requirementForm, deadline: event.target.value })}
              required
              className="dashboard-form-control"
            />
          </Form.Group>

          <div className="dashboard-modal-actions">
            <Button onClick={() => setShowRequirementForm(false)} className="dashboard-secondary-button">
              {common.cancel}
            </Button>
            <Button htmlType="submit" type="primary" className="dashboard-primary-button dashboard-primary-button-consumer">
              {copy.submitRequirement}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
