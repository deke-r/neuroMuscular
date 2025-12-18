import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageHelmet = ({ title, description, keywords = '', canonicalUrl = '' }) => {
    const location = useLocation();

    useEffect(() => {
        document.title = title;
        // Updating other meta tags whenever the location changes
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const linkCanonical = document.querySelector('link[rel="canonical"]');

        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('name', 'description');
            metaTag.setAttribute('content', description);
            document.head.appendChild(metaTag);
        }

        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords);
        } else {
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('name', 'keywords');
            metaTag.setAttribute('content', keywords);
            document.head.appendChild(metaTag);
        }

        if (linkCanonical) {
            linkCanonical.setAttribute('href', canonicalUrl);
        } else {
            const linkTag = document.createElement('link');
            linkTag.setAttribute('rel', 'canonical');
            linkTag.setAttribute('href', canonicalUrl);
            document.head.appendChild(linkTag);
        }
    }, [location, title, description, keywords, canonicalUrl]);

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default PageHelmet;
