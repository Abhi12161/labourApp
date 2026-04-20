import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Button, Card, Empty, Tag, Typography } from 'antd';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  ProjectOutlined,
  RiseOutlined,
  StarFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../providers/AuthProvider';
import { useLanguage } from '../../providers/LanguageProvider';

const { Title, Text, Paragraph } = Typography;

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
  { key: 'earnings', value: 'Rs 42,500', icon: DollarOutlined, trend: '+12%', color: '#4caf50' },
  { key: 'completed', value: '23', icon: CheckCircleOutlined, trend: '+8%', color: '#1976d2' },
  { key: 'rating', value: '4.7', icon: StarFilled, trend: '+0.2', color: '#ff9800' },
  { key: 'active', value: '5', icon: ClockCircleOutlined, trend: '+3', color: '#f57c00' },
];

export function LaborerDashboardPage() {
  const [activeTab, setActiveTab] = useState('available');
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
    setAppliedJobs((prev) => [...prev, jobId]);
  };

  const filteredJobs = mockJobRequirements.filter((job) => {
    const matchesLocation = user?.location ? job.location === user.location : true;
    const matchesSkills = user?.skills?.some((skill) => job.skills.includes(skill)) || false;

    if (activeTab === 'available') {
      return !appliedJobs.includes(job.id) && (matchesLocation || matchesSkills);
    }

    return appliedJobs.includes(job.id);
  });

  return (
    <div className="dashboard-page">
      <header className="dashboard-appbar">
        <Container fluid="xl">
          <div className="dashboard-topbar">
            <div className="dashboard-brand">
              <ProjectOutlined style={{ fontSize: 28, color: '#f57c00' }} />
              <Text className="dashboard-brand-title">{common.appName}</Text>
            </div>

            <div className="dashboard-userbar">
              <Text className="dashboard-userbar-name">{user?.name || common.laborer}</Text>
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

      <Container fluid="xl" className="dashboard-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Title level={1} className="dashboard-page-title">
            {copy.title}
          </Title>
          <Paragraph className="dashboard-page-subtitle dashboard-page-subtitle-wide">
            {copy.subtitle}
          </Paragraph>

          <Row className="g-4 mb-4">
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} md={3} key={stat.key}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="dashboard-stat-card dashboard-section-card dashboard-card-elevated" bordered={false}>
                    <div className="dashboard-card-body dashboard-card-body-spacious">
                      <div className="dashboard-stat-card-top">
                        <div
                          className="dashboard-stat-icon"
                          style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                        >
                          <stat.icon />
                        </div>
                        <Tag className="dashboard-trend-chip">
                          <RiseOutlined />
                          {stat.trend}
                        </Tag>
                      </div>
                      <Title level={3} className="dashboard-stat-number">
                        {stat.value}
                      </Title>
                      <Text className="dashboard-card-muted">{copy.stats[stat.key]}</Text>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <div className="dashboard-tabs">
            <Nav
              variant="tabs"
              activeKey={activeTab}
              onSelect={(selectedKey) => setActiveTab(selectedKey || 'available')}
              className="dashboard-tab-nav"
            >
              <Nav.Item>
                <Nav.Link eventKey="available" className="dashboard-tab-link">
                  {copy.availableJobs} ({mockJobRequirements.filter((job) => !appliedJobs.includes(job.id)).length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="applications" className="dashboard-tab-link">
                  {copy.myApplications} ({appliedJobs.length})
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <Row className="g-4">
            {filteredJobs.length === 0 ? (
              <Col xs={12}>
                <Card className="dashboard-section-card dashboard-empty-card" bordered={false}>
                  <div className="dashboard-empty">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={
                        <div>
                          <Title level={4} className="dashboard-empty-title">
                            {activeTab === 'available' ? copy.noAvailableJobs : copy.noApplications}
                          </Title>
                          <Text className="dashboard-card-muted">
                            {activeTab === 'available' ? copy.checkBackLater : copy.startApplying}
                          </Text>
                        </div>
                      }
                    />
                  </div>
                </Card>
              </Col>
            ) : (
              filteredJobs.map((job, index) => (
                <Col xs={12} lg={6} key={job.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card
                      className={`dashboard-job-card dashboard-section-card dashboard-card-elevated ${
                        appliedJobs.includes(job.id) ? 'dashboard-job-card-applied' : ''
                      }`}
                      bordered={false}
                    >
                      <div className="dashboard-card-body dashboard-card-body-spacious">
                        <div className="dashboard-card-header">
                          <div className="dashboard-card-header-copy">
                            <Title level={4} className="dashboard-card-title dashboard-card-title-wrap">
                              {job.description}
                            </Title>
                            <div className="dashboard-meta-row">
                              <UserOutlined style={{ fontSize: 14, color: '#666' }} />
                              <Text className="dashboard-card-muted">{job.consumerName}</Text>
                            </div>
                          </div>
                          {appliedJobs.includes(job.id) && (
                            <Tag className="dashboard-status-chip applied">
                              <CheckCircleOutlined />
                              {copy.applied}
                            </Tag>
                          )}
                        </div>

                        <Row className="g-3 mb-3">
                          <Col xs={6}>
                            <Text className="dashboard-stat-label">{copy.workersNeeded}</Text>
                            <div className="dashboard-stat-value">
                              {job.rajMistriCount} Raj Mistri, {job.laborerCount} Laborer
                            </div>
                          </Col>
                          <Col xs={6}>
                            <Text className="dashboard-stat-label">{copy.budget}</Text>
                            <div className="dashboard-stat-value dashboard-stat-value-success">Rs {job.budget}/day</div>
                          </Col>
                        </Row>

                        <div className="dashboard-meta-row dashboard-meta-row-spaced">
                          <EnvironmentOutlined style={{ fontSize: 16, color: '#666' }} />
                          <Text className="dashboard-card-muted">{job.location}</Text>
                        </div>

                        <div className="dashboard-meta-row dashboard-meta-row-spaced dashboard-meta-row-bottom">
                          <CalendarOutlined style={{ fontSize: 16, color: '#666' }} />
                          <Text className="dashboard-card-muted">
                            {copy.deadlineLabel}: {job.deadline}
                          </Text>
                        </div>

                        <div className="dashboard-chip-wrap dashboard-chip-wrap-spaced">
                          {job.skills.map((skill) => (
                            <Tag
                              key={skill}
                              className={`dashboard-chip ${
                                user?.skills?.includes(skill) ? 'dashboard-chip-laborer-match' : 'dashboard-chip-muted'
                              }`}
                            >
                              {skill}
                            </Tag>
                          ))}
                        </div>

                        {!appliedJobs.includes(job.id) && (
                          <Button
                            type="primary"
                            block
                            onClick={() => handleApply(job.id)}
                            className="dashboard-primary-button dashboard-primary-button-laborer"
                          >
                            {copy.applyNow}
                          </Button>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))
            )}
          </Row>
        </motion.div>
      </Container>
    </div>
  );
}
