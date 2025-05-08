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
        let name = $('#name').val();
        let email = $('#email').val();
        let subject = $('#subject').val();
        let message = $('#message').val();
        message = "Subject: "+ subject + "\n Message:" + message
        // Basic form validation
        if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Form submission to the API endpoint
        const payload = {
            name: name,
            email: email,
            message: message
        };
        
        const statusDiv = $('#form-status');
        statusDiv.text('Sending...').removeClass().addClass('form-status sending').show();
        
        $.ajax({
            url: 'https://sendportfolioemail-e5kjoqw3ta-uc.a.run.app/sendPortfolioEmail',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(payload),
            success: function(response) {
                statusDiv.text('Message sent! Vijaykanth will get back to you soon.').removeClass().addClass('form-status success');
                $('#contactForm')[0].reset();
            },
            error: function(xhr, status, error) {
                statusDiv.text('Something went wrong. Please try again later.').removeClass().addClass('form-status error');
                console.error('Error:', error);
            }
        });
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