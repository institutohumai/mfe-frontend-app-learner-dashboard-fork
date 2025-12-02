import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';
import { Avatar, Dropdown } from '@openedx/paragon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faLinkedin,
  faInstagram,
  faDiscord,
  faTwitter,
  faFacebook,
  faTiktok,
  faTwitch,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { text } from '@fortawesome/fontawesome-svg-core';

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
                        <Dropdown.Item className="custom-dropdown-item" href={`${LMS_BASE_URL}/dashboard`} style={styles.dropdownItem}>Mis cursos</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" href={`${ACCOUNT_PROFILE_URL}/u/${user?.username}`} style={styles.dropdownItem}>Perfil</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" href={`${LOGOUT_URL}`} style={styles.dropdownItem}>Cerrar sesión</Dropdown.Item>
                    </Dropdown.Menu>
                    
                </Dropdown>
            </div>
        </header>
    );
};

const CustomFooter = () => {
    const styles = {
        footer: {
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '3rem 2rem',
            fontFamily: "'Nunito', sans-serif",
            marginTop: 'auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
        },
        linksContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1rem',
        },
        linkButton: {
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            padding: '0.5rem 1rem',
            borderRadius: '30px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'transparent',
        },
        socialContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
        },
        socialIcon: {
            color: '#ffffff',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            opacity: 0.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        copyright: {
            marginTop: '2rem',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.5)',
            textAlign: 'center',
        }
    };

    const socialLinks = [
        { name: "youtube", link: "https://www.youtube.com/c/InstitutoHumai", icon: faYoutube },
        { name: "linkedin", link: "https://www.linkedin.com/company/instituto-humai/", icon: faLinkedin },
        { name: "instagram", link: "https://instagram.com/humai.lat", icon: faInstagram },
        { name: "discord", link: "https://discord.gg/wYCA2chQvb", icon: faDiscord },
        { name: "twitter", link: "https://twitter.com/institutohumai", icon: faTwitter },
        { name: "facebook", link: "https://facebook.com/institutohumai", icon: faFacebook },
        { name: "tiktok", link: "https://www.tiktok.com/@institutohumai", icon: faTiktok },
        { name: "twitch", link: "https://www.twitch.tv/institutohumai", icon: faTwitch },
        { name: "whatsapp", link: "https://docs.google.com/forms/d/e/1FAIpQLSeh4nUOag1hCSdCAjJCGXrgkPDO9hRk-_GnKNFDaeOb_auG3Q/viewform", icon: faWhatsapp },
    ];

    const footerLinks = [
        { name: "Reglamento", link: "https://docs.google.com/document/d/1ELHKgQs0vi_55Azu0nH8wbnHwYGt23nPQU_GOkFSWlQ/edit?tab=t.0#heading=h.eg5ygcg5bg9h" },
        { name: "Guía de cursada", link: "https://docs.google.com/document/d/17J2wUS8RIg_ZMeU1QKNZ7fD6U61dyoVJPwK2DJvXeNE/edit?tab=t.0" },
        { name: "Sitio web", link: "https://humai.com.ar/" },
        { name: "Preguntas frecuentes", link: "https://humai.com.ar/FAQ" },
    ];

    return (
        <footer style={styles.footer}>
            <style>
                {`
                    main{
                        min-height: calc(100dvh - 295.78px - 76px);
                        }
                    .footer-link:hover {
                        background: rgba(245, 148, 16, 0.1) !important;
                        border-color: #F59410 !important;
                        color: #F59410 !important;
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(245, 148, 16, 0.2);
                    }
                    .social-icon:hover {
                        color: #F59410 !important;
                        transform: scale(1.2) translateY(-2px);
                        opacity: 1 !important;
                    }
                `}
            </style>
            <div style={styles.container}>
                <div style={styles.linksContainer}>
                    {footerLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.linkButton}
                            className="footer-link"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                
                <div style={styles.socialContainer}>
                    {socialLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.socialIcon}
                            className="social-icon"
                            aria-label={item.name}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                        </a>
                    ))}
                </div>

                <div style={styles.copyright}>
                    © {new Date().getFullYear()} Instituto Humai. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
};

const config = {
    pluginSlots: {
        'org.openedx.frontend.learner_dashboard.widget_sidebar.v1': {
            plugins: [
                {
                    // Hide the default footer
                    op: PLUGIN_OPERATIONS.Hide,
                    widgetId: 'default_contents',
                }
            ]
        },
        'org.openedx.frontend.layout.header_desktop.v1': {
            keepDefault: false,
            plugins: [
                {
                    op: PLUGIN_OPERATIONS.Insert,
                    widget: {
                        id: 'custom_desktop_header_component',
                        type: DIRECT_PLUGIN,
                        RenderWidget: () => (
                            <CustomHeader />
                        ),
                    },
                },
            ]
        },
        'org.openedx.frontend.layout.footer.v1': {
            plugins: [
                {
                    // Hide the default footer
                    op: PLUGIN_OPERATIONS.Hide,
                    widgetId: 'default_contents',
                },
                {
                    // Insert a custom footer
                    op: PLUGIN_OPERATIONS.Insert,
                    widget: {
                        id: 'custom_footer',
                        type: DIRECT_PLUGIN,
                        RenderWidget: () => (
                            <CustomFooter />
                        ),
                    },
                },
            ]
        }

    },
}

export default config;
