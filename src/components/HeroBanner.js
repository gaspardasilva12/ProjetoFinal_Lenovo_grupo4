import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroBanner.css';
import { bannerData } from '../data/bannerData';

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);
    const progressRef = useRef(null);

    const slides = bannerData;

    const SLIDE_DURATION = 4000; // 4 segundos

    const startAutoplay = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        intervalRef.current = setInterval(() => {
            if (!isPaused) {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                setProgress(0);
            }
        }, SLIDE_DURATION);
    };

    const pauseAutoplay = () => {
        setIsPaused(true);
    };

    const resumeAutoplay = () => {
        setIsPaused(false);
    };

    useEffect(() => {
        startAutoplay();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPaused]);

    // Progress bar animation
    useEffect(() => {
        if (progressRef.current) clearInterval(progressRef.current);
        
        if (!isPaused) {
            const startTime = Date.now();
            progressRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newProgress = (elapsed / SLIDE_DURATION) * 100;
                setProgress(Math.min(newProgress, 100));
            }, 50);
        }

        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [currentSlide, isPaused]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setProgress(0);
        pauseAutoplay();
        setTimeout(resumeAutoplay, 4000); // Resume after 4 seconds
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setProgress(0);
        pauseAutoplay();
        setTimeout(resumeAutoplay, 4000);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setProgress(0);
        pauseAutoplay();
        setTimeout(resumeAutoplay, 4000);
    };

    const handleMouseEnter = () => {
        pauseAutoplay();
    };

    const handleMouseLeave = () => {
        resumeAutoplay();
    };

    return (
        <div 
            className="hero-banner"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-label="Banner principal"
        >
            <div className="swiper-wrapper">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`swiper-slide hero_slide ${index === currentSlide ? 'swiper-slide-active' : ''}`}
                        data-swiper-slide-index={index}
                        aria-hidden={index !== currentSlide}
                        style={{ 
                            transform: `translateX(${(index - currentSlide) * 100}%)`,
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}
                    >
                        <div className="mask_smb_link">
                            <a 
                                aria-label={slide.ctaText} 
                                href={slide.ctaLink} 
                                target="_self"
                                rel="noopener noreferrer"
                            ></a>
                        </div>
                        <div className="hero_slide_img">
                            <img 
                                src={slide.image} 
                                alt={slide.alt} 
                                loading={index === 0 ? "eager" : "lazy"}
                                onLoad={(e) => {
                                    e.target.style.opacity = '1';
                                }}
                                onError={(e) => {
                                    console.warn(`Failed to load image: ${slide.image}`);
                                    e.target.style.display = 'none';
                                    const fallback = e.target.nextSibling;
                                    if (fallback) {
                                        fallback.style.display = 'block';
                                    }
                                }}
                            />
                            <div 
                                className="hero_slide_fallback" 
                                style={{ 
                                    display: 'none',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    <h2>{slide.subhead}</h2>
                                    <p>{slide.headline}</p>
                                </div>
                            </div>
                        </div>
                        <div className="hero_outer">
                            <div className="hero_text">
                                {slide.logo && (
                                    <div>
                                        <img 
                                            loading="lazy" 
                                            className="hero_outer_img" 
                                            src={slide.logo} 
                                            alt="Logo" 
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="hero_text_subhead">
                                    <p>{slide.subhead}</p>
                                </div>
                                <div className="hero_text_headline" role="heading" aria-level="2">
                                    <p>{slide.headline}</p>
                                </div>
                            </div>
                            <div className="hero_cta">
                                <div className="hero_cta_inner">
                                    <a 
                                        href={slide.ctaLink} 
                                        target="_self" 
                                        aria-label={slide.ctaText}
                                        rel="noopener noreferrer"
                                    >
                                        <div className="hero_cta_btn">{slide.ctaText}</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="progress-bar">
                <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Navigation arrows */}
            <button 
                className="carousel-arrow carousel-prev" 
                onClick={goToPrevSlide}
                aria-label="Slide anterior"
            >
                ‹
            </button>
            <button 
                className="carousel-arrow carousel-next" 
                onClick={goToNextSlide}
                aria-label="Próximo slide"
            >
                ›
            </button>

            {/* Dots navigation */}
            <div className="hero-carousel" role="tablist" aria-label="Navegação do banner">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir para slide ${index + 1}`}
                        aria-selected={index === currentSlide}
                        role="tab"
                    ></button>
                ))}
            </div>

            {/* Slide counter */}
            <div className="slide-counter" aria-live="polite">
                {currentSlide + 1} / {slides.length}
            </div>
        </div>
    );
};

export default HeroBanner; 