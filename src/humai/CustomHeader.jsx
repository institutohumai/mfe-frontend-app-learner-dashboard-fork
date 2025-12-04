import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { Avatar, Dropdown } from '@openedx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const UserToggle = React.forwardRef(({ children, onClick, style, onMouseEnter, onMouseLeave }, ref) => (
    <div
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {children}
    </div>
));

const CustomHeader = () => {
    const navigate = useNavigate();
    const user = getAuthenticatedUser();
    const { LMS_BASE_URL, ACCOUNT_PROFILE_URL, LOGOUT_URL } = getConfig();

    const styles = {
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 2rem',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            fontFamily: "'Nunito', sans-serif",
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
        leftSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
        },
        navButton: {
            background: 'transparent',
            border: '1px solid transparent',
            color: '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px',
        },
        centerSection: {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
        },
        logo: {
            height: '32px',
            width: 'auto',
        },
        rightSection: {
            display: 'flex',
            alignItems: 'center',
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '8px',
            transition: 'background 0.2s ease',
        },
        username: {
            fontWeight: 600,
            fontSize: '0.95rem',
            color: '#ffffff',
        },
        dropdownToggle: {
            color: '#F59410',
            marginLeft: '0.25rem',
        },
        dropdownMenu: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '0.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            animation: 'fadeInSlideDown 0.2s ease-out forwards',
            minWidth: '200px',
        },
        dropdownItem: {
            color: '#ffffff',
            fontFamily: "'Nunito', sans-serif",
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            transition: 'all 0.2s ease',
            fontSize: '0.95rem',
        }
    };

    // Inject Nunito font and custom styles
    React.useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
      @keyframes fadeInSlideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .custom-dropdown-item:hover, .custom-dropdown-item:focus {
        background-color: rgba(245, 148, 16, 0.15) !important;
        color: #F59410 !important;
        text-decoration: none;
      }
      .custom-dropdown-menu {
        top: 100% !important;
        margin-top: 12px !important;
      }
      .logo-hover {
        transition: transform 0.3s ease;
      }
      .logo-hover:hover {
        transform: scale(1.1);
      }
      .nav-btn:hover {
        color: #F59410 !important;
        background: linear-gradient(to right, rgba(245,148,16,.2), rgba(245,148,16,.1)) !important;
        border-color: rgba(245,148,16,.3) !important;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(245, 148, 16, 0.2);
      }
      @media (max-width: 768px) {
        .header-container {
          padding: 0.75rem 1rem !important;
        }
        .username-text {
          display: none !important;
        }
        .logo-section{
            display: none !important;
        }
      }
    `;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(link);
            document.head.removeChild(styleSheet);
        };
    }, []);

    return (
        <header style={styles.header} className="header-container">
            <div style={styles.leftSection}>
                <a href={`${LMS_BASE_URL}/dashboard`} style={styles.navButton} className="nav-btn">
                    Mis cursos
                </a>
                <a href={`${LMS_BASE_URL}/courses`} style={styles.navButton} className="nav-btn">
                    Todos los cursos
                </a>
            </div>

            <div style={styles.centerSection} className='logo-section'>
                <a href={`${LMS_BASE_URL}/dashboard`}>
                    <img src="/static/logo.webp" alt="Logo" className="logo-hover logo-img" style={styles.logo} />
                </a>
            </div>

            <div style={styles.rightSection}>
                <Dropdown>
                    <Dropdown.Toggle
                        id="user-dropdown"
                        as={UserToggle}
                        style={styles.userInfo}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <Avatar
                            src={user?.profile_image?.image_url_medium}
                            alt={user?.username || 'User'}
                            size="sm"
                        />
                        <span style={styles.username} className="username-text">{user?.username}</span>
                        <FontAwesomeIcon icon={faChevronDown} style={styles.dropdownToggle} />
                    </Dropdown.Toggle>
 
                    <Dropdown.Menu align="right" className="custom-dropdown-menu" style={styles.dropdownMenu}>
                        <Dropdown.Item className="custom-dropdown-item" href={`${LMS_BASE_URL}`} style={styles.dropdownItem}>Inicio</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" href={`${LOGOUT_URL}`} style={styles.dropdownItem}>Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>
            </div>
        </header>
    );
};

export default CustomHeader;
