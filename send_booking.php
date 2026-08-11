<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? trim(htmlspecialchars($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? trim(htmlspecialchars($_POST['email'])) : '';
    $issue = isset($_POST['issue']) ? trim(htmlspecialchars($_POST['issue'])) : '';
    $date = isset($_POST['date']) ? trim(htmlspecialchars($_POST['date'])) : '';
    $description = isset($_POST['description']) ? trim(htmlspecialchars($_POST['description'])) : '';

    // Determine redirect page based on referrer
    $referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'booking.html';
    if (strpos($referrer, 'index.html') !== false || $referrer == '/' || basename($referrer) == '') {
        $redirectPage = 'index.html';
    } elseif (strpos($referrer, 'service.html') !== false) {
        $redirectPage = 'service.html';
    } else {
        $redirectPage = 'booking.html';
    }

    // Validate required fields (name and phone are required)
    if (empty($name) || empty($phone)) {
        header("Location: $redirectPage?booking=error&reason=required#booking");
        exit();
    }

    // Validate phone number format (basic check - at least 10 digits)
    $phoneDigits = preg_replace('/[^0-9]/', '', $phone);
    if (strlen($phoneDigits) < 10) {
        header("Location: $redirectPage?booking=error&reason=phone#booking");
        exit();
    }

    // Map issue values to readable text
    $issueTypes = array(
        '1' => 'Screen Repair or Replacement',
        '2' => 'Power Failure',
        '3' => 'Audio Problems',
        '4' => 'General Diagnosis'
    );
    $issueText = isset($issueTypes[$issue]) ? $issueTypes[$issue] : ($issue ?: 'Not specified');

    // Recipient email address (the business email)
    $to = "ticha@tvpartscapetown.co.za";

    // Email subject
    $email_subject = "New TV Repair Booking - $name ($phone)";

    // Email content
    $email_body = "You have received a new booking request from your website.\n\n";
    $email_body .= "=================================\n";
    $email_body .= "BOOKING DETAILS\n";
    $email_body .= "=================================\n\n";
    $email_body .= "Customer Name: $name\n";
    $email_body .= "Phone Number: $phone\n";
    if (!empty($email)) {
        $email_body .= "Email: $email\n";
    }
    $email_body .= "TV Issue Type: $issueText\n";
    if (!empty($date)) {
        $email_body .= "Preferred Date: $date\n";
    }
    $email_body .= "\nDescription of Issue:\n";
    $email_body .= "-----------------------------\n";
    $email_body .= (!empty($description) ? $description : "No description provided") . "\n";
    $email_body .= "-----------------------------\n\n";
    $email_body .= "Please contact this customer as soon as possible.\n";

    // Email headers
    $headers = "From: noreply@tvpartscapetown.co.za\r\n";
    if (!empty($email)) {
        $headers .= "Reply-To: $email\r\n";
    }
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Redirect back with success message
        header("Location: $redirectPage?booking=success#booking");
        exit();
    } else {
        // Redirect back with error
        header("Location: $redirectPage?booking=error#booking");
        exit();
    }
}
?>
