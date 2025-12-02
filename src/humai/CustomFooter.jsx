import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

export default CustomFooter;
