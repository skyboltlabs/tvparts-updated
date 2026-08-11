(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 25,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Form Status Messages - Check URL parameters for success/error status
    (function () {
        const urlParams = new URLSearchParams(window.location.search);

        // Contact form status
        if (urlParams.has('status')) {
            const status = urlParams.get('status');
            const formStatus = document.getElementById('form-status');
            if (formStatus) {
                formStatus.classList.remove('d-none');
                if (status === 'success') {
                    formStatus.classList.add('alert-success');
                    formStatus.innerHTML = '<i class="fa fa-check-circle me-2"></i><strong>Message Sent Successfully!</strong><br>Thank you for contacting us. We\'ll get back to you within 24 hours.';
                } else if (status === 'error') {
                    formStatus.classList.add('alert-danger');
                    formStatus.innerHTML = '<i class="fa fa-exclamation-circle me-2"></i><strong>Oops! Something went wrong.</strong><br>Please try again or call us directly at <a href="tel:+27739393198" class="alert-link">+27 73 939 3198</a>';
                }
                // Scroll to the message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Remove status from URL without reload
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }

        // Booking form status
        if (urlParams.has('booking')) {
            const status = urlParams.get('booking');
            const reason = urlParams.get('reason');
            const bookingStatus = document.getElementById('booking-status');
            if (bookingStatus) {
                bookingStatus.classList.remove('d-none');
                if (status === 'success') {
                    bookingStatus.classList.add('alert-success');
                    bookingStatus.innerHTML = '<i class="fa fa-calendar-check me-2"></i><strong>Booking Request Received!</strong><br>Thank you! We\'ll contact you within 24 hours to confirm your TV repair appointment.';
                } else if (status === 'error') {
                    bookingStatus.classList.add('alert-danger');
                    let errorMsg = '<i class="fa fa-exclamation-circle me-2"></i><strong>Booking Failed!</strong><br>';
                    if (reason === 'required') {
                        errorMsg += 'Please fill in all required fields (Name and Phone Number).';
                    } else if (reason === 'phone') {
                        errorMsg += 'Please enter a valid phone number (at least 10 digits).';
                    } else {
                        errorMsg += 'Please try again or call us directly at <a href="tel:+27739393198" class="alert-link">+27 73 939 3198</a>';
                    }
                    bookingStatus.innerHTML = errorMsg;
                }
                // Scroll to the booking section
                setTimeout(function () {
                    bookingStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
                // Remove status from URL without reload
                window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
            }
        }
    })();

})(jQuery);

