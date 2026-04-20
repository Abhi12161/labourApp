import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Alert, Button, Card, Input, Select, Typography } from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../providers/AuthProvider';
import { useLanguage } from '../../providers/LanguageProvider';

const cities = [
  'Muzaffarpur',
  'Patna',
  'Gaya',
  'Bhagalpur',
  'Darbhanga',
  'Purnia',
  'Munger',
  'Chapra',
];

export function ConsumerLoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: 'Muzaffarpur',
  });
  const { login, signup } = useAuth();
  const { language, setLanguage, t, languageOptions } = useLanguage();
  const navigate = useNavigate();
  const common = t.common;
  const copy = t.consumerAuth;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      signup({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        type: 'consumer',
      });
    } else {
      login(formData.email, formData.password, 'consumer', {
        location: formData.location,
      });
    }

    navigate('/consumer-dashboard');
  };

  return (
    <div className="brand-shell">
      <div className="brand-content auth-shell">
        <div className="brand-container">
          <Link to="/" className="page-back-link">
            <ArrowLeftOutlined />
            {common.backToHome}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Card className="auth-card">
              <div className="row g-0">
                <div className="col-12 col-lg-5">
                  <div className="auth-hero-panel consumer d-flex flex-column justify-content-center">
                    <div className="auth-hero-badge">
                      <UserOutlined />
                    </div>
                    <Typography.Text className="auth-section-label text-white-50">
                      {copy.portal}
                    </Typography.Text>
                    <Typography.Title level={2} className="text-white mb-2">
                      {isSignup ? copy.createAccountHero : copy.welcomeBack}
                    </Typography.Title>
                    <p className="auth-hero-copy">{copy.heroCopy}</p>
                    <div className="auth-feature-list">
                      <div className="auth-feature-item">
                        <CheckCircleFilled />
                        {copy.heroPoints[0]}
                      </div>
                      <div className="auth-feature-item">
                        <CheckCircleFilled />
                        {copy.heroPoints[1]}
                      </div>
                      <div className="auth-feature-item">
                        <SafetyCertificateOutlined />
                        {copy.heroPoints[2]}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-7">
                  <div className="auth-form-panel">
                    <div className="auth-toolbar">
                      <div>
                        <Typography.Text className="auth-section-label">
                          {isSignup ? copy.newAccount : copy.signIn}
                        </Typography.Text>
                        <Typography.Title level={2} className="auth-title">
                          {isSignup ? copy.formTitleSignup : copy.formTitleSignin}
                        </Typography.Title>
                        <p className="auth-subtitle">
                          {isSignup ? copy.formCopySignup : copy.formCopySignin}
                        </p>
                      </div>

                      <div className="location-select-block compact">
                        <span className="location-select-label">
                          <EnvironmentOutlined />
                          {common.language}
                        </span>
                        <Select
                          value={language}
                          onChange={setLanguage}
                          options={languageOptions}
                          className="location-select"
                          popupClassName="brand-dropdown"
                        />
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                      <div className="row g-3">
                        {isSignup && (
                          <div className="col-12">
                            <Input
                              size="large"
                              prefix={<UserOutlined />}
                              placeholder={copy.fullName}
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                            />
                          </div>
                        )}

                        <div className="col-12">
                          <Input
                            size="large"
                            type="email"
                            prefix={<MailOutlined />}
                            placeholder={copy.email}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>

                        <div className="col-12">
                          <Input.Password
                            size="large"
                            prefix={<LockOutlined />}
                            placeholder={copy.password}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                          />
                        </div>

                        <div className={`col-12 ${isSignup ? 'col-md-6' : ''}`}>
                          <Input
                            size="large"
                            prefix={<PhoneOutlined />}
                            placeholder={copy.phone}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required={isSignup}
                          />
                        </div>

                        <div className={`col-12 ${isSignup ? 'col-md-6' : ''}`}>
                          <div className="location-select-block">
                            <span className="location-select-label">
                              <EnvironmentOutlined />
                              {common.city}
                            </span>
                            <Select
                              size="large"
                              value={formData.location}
                              onChange={(value) => setFormData({ ...formData, location: value })}
                              options={cities.map((city) => ({ value: city, label: city }))}
                              className="location-select"
                              popupClassName="brand-dropdown"
                              placeholder={copy.locationPlaceholder}
                              suffixIcon={<EnvironmentOutlined />}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <Button htmlType="submit" type="primary" block className="auth-action consumer">
                            {isSignup ? copy.createButton : copy.loginButton}
                          </Button>
                        </div>

                        <div className="col-12 text-center">
                          <Typography.Text className="text-secondary">
                            {isSignup ? copy.alreadyHave : copy.noAccount}{' '}
                          </Typography.Text>
                          <Button
                            type="link"
                            className="auth-link-button"
                            onClick={() => setIsSignup(!isSignup)}
                          >
                            {isSignup ? copy.signInLink : copy.createAccount}
                          </Button>
                        </div>
                      </div>
                    </form>

                    <Alert
                      className="auth-alert"
                      type="info"
                      showIcon
                      message={copy.alert}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
