$(document).ready(function() {
    'use strict';

    // Typed.js initialization
    const typed = new Typed('.typed-text', {
        strings: ['.NET Developer', 'Software Engineer', 'Full Stack Developer', 'C# Specialist'],
        typeSpeed: 80,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
    });

    // Sticky Header
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('header').addClass('sticky');
            $('.back-to-top').addClass('active');
        } else {
            $('header').removeClass('sticky');
            $('.back-to-top').removeClass('active');
        }
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = this.hash;
        const $target = $(target);
        
        $('html, body').animate({
            'scrollTop': $target.offset().top - 80
        }, 800, 'swing');
    });

    // Mobile Navigation
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        $('.nav-links').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.nav-links a').on('click', function() {
        $('.hamburger').removeClass('active');
        $('.nav-links').removeClass('active');
    });

    // Active navigation link based on scroll position
    $(window).on('scroll', function() {
        const scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $('.nav-links a').removeClass('active');
                $(`.nav-links a[href="#${sectionId}"]`).addClass('active');
            }
        });
    });

    // Project filtering
    $('.filter-btn').on('click', function() {
        const filterValue = $(this).attr('data-filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filterValue === 'all') {
            $('.project-item').show(300);
        } else {
            $('.project-item').hide(300);
            $(`.project-item[data-category="${filterValue}"]`).show(300);
        }
    });

    // Skills animation
    function animateSkills() {
        $('.skill-progress').each(function() {
            const $this = $(this);
            const width = $this.css('width', '0%').data('width');
            
            $this.animate({
                width: width
            }, 1500);
        });
    }

    // Trigger skills animation when skills section is in viewport
    const skillsSection = $('#skills');
    let skillsAnimated = false;
    
    $(window).on('scroll', function() {
        if (!skillsAnimated && isInViewport(skillsSection)) {
            animateSkills();
            skillsAnimated = true;
        }
    });

    // Check if element is in viewport
    function isInViewport(element) {
        const elementTop = element.offset().top;
        const elementBottom = elementTop + element.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // Contact form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        // Basic form validation
        if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Store skill progress widths
    $('.skill-progress').each(function() {
        const width = $(this).width();
        $(this).data('width', width).css('width', '0');
    });

    // Trigger initial animations
    if (isInViewport(skillsSection)) {
        animateSkills();
        skillsAnimated = true;
    }
});