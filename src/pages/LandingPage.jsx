import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Button, Card, Select, Typography } from 'antd';
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  GlobalOutlined,
  ProjectOutlined,
  StarOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useLanguage } from '../providers/LanguageProvider';

export function LandingPage() {
  const { language, setLanguage, t, languageOptions } = useLanguage();
  const landing = t.landing;
  const common = t.common;
  const [location, setLocation] = useState('Fetching location...');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 576);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            const data = await res.json();

            const a = data.address;

            const exact = [
              a.house_number,
              a.road,
              a.suburb || a.neighbourhood,
              a.city || a.town || a.village,
              a.state,
              a.postcode,
              a.country,
            ]
              .filter(Boolean)
              .join(', ');

            setLocation(exact || data.display_name || 'Location not found');
          } catch (err) {
            setLocation('Error fetching location');
          }
        },
        () => setLocation('Permission denied')
      );
    }
  }, []);




  const getShortLocation = (loc) => {
    if (!loc) return '';
    const parts = loc.split(',');
    return parts.length > 2 ? parts[parts.length - 4]?.trim() || parts[0] : parts[0];
  };

  const shortLocation = getShortLocation(location);

  return (
    <div className="brand-shell" style={{ position: 'relative' }}>
      <Tooltip title={location} placement="bottom">
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: isMobile ? 'auto' : '12px',
            left: isMobile ? '11%' : 'auto',
            background: 'rgba(0, 0, 0, 0.65)',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '18px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 1000,
            backdropFilter: 'blur(6px)',
            maxWidth: isMobile ? '70%' : '320px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <EnvironmentOutlined />
          <span>
            {isMobile ? shortLocation : location}
          </span>
        </div>
      </Tooltip>
      <div className="brand-content">
        <section className="brand-hero">

          <div className="brand-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="d-flex flex-column align-items-center gap-3">
                <div className="brand-badge">
                  <span className="brand-badge-icon">
                    <ToolOutlined />
                  </span>
                  <span className="fw-semibold">{landing.badge}</span>
                </div>

                <div className="language-select-wrap">
                  <span className="language-select-label">
                    <GlobalOutlined />
                    {common.language}
                  </span>
                  <Select
                    value={language}
                    onChange={setLanguage}
                    options={languageOptions}
                    className="language-select"
                    popupClassName="brand-dropdown"
                  />
                </div>
              </div>

              <h1 className="brand-display">
                {landing.title1}
                <br />
                <span className="brand-display-gradient">{landing.title2}</span>
              </h1>

              <p className="brand-subtitle">{landing.subtitle}</p>
            </motion.div>

            <motion.div
              className="brand-chip-list"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            >
              <span className="brand-chip">
                <EnvironmentOutlined />
                {landing.chips[0]}
              </span>
              <span className="brand-chip">
                <StarOutlined />
                {landing.chips[1]}
              </span>
              <span className="brand-chip">
                <ProjectOutlined />
                {landing.chips[2]}
              </span>
            </motion.div>

            <div className="brand-grid">
              <div className="row g-4 align-items-stretch justify-content-center">
                <div className="col-12 col-lg-6 d-flex">
                  <Link to="/consumer-login" className="brand-card-link w-100">
                    <motion.div className="h-100" whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                      <Card className="brand-card brand-card-employer h-100">
                        <div className="brand-card-body d-flex flex-column h-100 text-start">
                          <span className="brand-card-topline employer">{landing.employerTop}</span>
                          <div className="brand-card-icon employer">
                            <UserOutlined />
                          </div>
                          <Typography.Title level={2} className="brand-card-title">
                            {landing.employerTitle}
                          </Typography.Title>
                          <p className="brand-card-copy">{landing.employerCopy}</p>
                          <div className="brand-card-points">
                            {landing.consumerPoints.map((point) => (
                              <div key={point} className="brand-card-point">
                                <CheckCircleFilled />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-auto">
                            <Button type="primary" size="large" className="auth-action consumer">
                              <span className="brand-card-cta">
                                {landing.startHiring}
                                <ArrowRightOutlined />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                </div>

                <div className="col-12 col-lg-6 d-flex">
                  <Link to="/laborer-login" className="brand-card-link w-100">
                    <motion.div className="h-100" whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                      <Card className="brand-card brand-card-worker h-100">
                        <div className="brand-card-body d-flex flex-column h-100 text-start">
                          <span className="brand-card-topline worker">{landing.workerTop}</span>
                          <div className="brand-card-icon worker">
                            <ToolOutlined />
                          </div>
                          <Typography.Title level={2} className="brand-card-title">
                            {landing.workerTitle}
                          </Typography.Title>
                          <p className="brand-card-copy">{landing.workerCopy}</p>
                          <div className="brand-card-points">
                            {landing.laborerPoints.map((point) => (
                              <div key={point} className="brand-card-point">
                                <CheckCircleFilled />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-auto">
                            <Button size="large" className="auth-action laborer text-white">
                              <span className="brand-card-cta">
                                {landing.joinWorker}
                                <ArrowRightOutlined />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>

            <motion.div
              className="brand-footer-points"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              {landing.footer.map((item) => (
                <span key={item} className="brand-footer-point">
                  <span className="brand-footer-dot" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
