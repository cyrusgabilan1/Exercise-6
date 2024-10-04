<?php
$pageTitle = "Feedback";
$filePath = 'feedback.txt';
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['name'], $_POST['age'], $_POST['email'], $_POST['feedbackMessage'])) {
        $name = htmlspecialchars(trim($_POST['name']));
        $age = trim($_POST['age']);
        $email = trim($_POST['email']);
        $feedbackMessage = htmlspecialchars(trim($_POST['feedbackMessage']));

        $errors = [];
        if (empty($name)) {
            $errors[] = "Name is required!";
        } elseif (!preg_match("/^[a-zA-Z ]*$/", $name)) {
            $errors[] = "Name can only contain letters and spaces!";
        }

        if (empty($age)) {
            $errors[] = "Age is required!";
        } elseif (!filter_var($age, FILTER_VALIDATE_INT) || $age < 1 || $age > 100) {
            $errors[] = "Please enter a valid age (between 1 and 100)!";
        }

        if (empty($email)) {
            $errors[] = "Email is required!";
        } elseif (!preg_match("/^[a-zA-Z0-9@.]+$/", $email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Email can only contain letters, numbers, '@' and '.' and must be in valid format!";
        }

        if (file_exists($filePath)) {
            $fileContent = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($fileContent as $line) {
                if (strpos($line, "Email: $email") !== false) {
                    $errors[] = "This email already exists!";
                    break;
                }
            }
        }

        if (empty($errors)) {
            $postContent = "Name: $name, Age: $age, Email: $email, Feedback: $feedbackMessage\n";
            file_put_contents($filePath, $postContent, FILE_APPEND);
            $message = "Thank you, $name! Your details and feedback have been recorded!";
        } else {
            $message = implode("<br>", $errors);
        }
    } else {
        $message = "Please complete all fields!";
    }

    echo json_encode(['message' => $message]);
    exit;
}

if (file_exists($filePath)) {
    $fileContent = file_get_contents($filePath);
} else {
    $initialContent = "Share your thoughts about our Website!";
    file_put_contents($filePath, $initialContent);
    $fileContent = $initialContent;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="feedback.css">
     <script src="feedback.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>

<?php include 'header.php'; ?>

<div class="container">

    <div id="message" class="success"></div>

    <div class="message">
        <h2>Thoughts From Our Visitors</h2>
        <pre id="feedbackContent"><?php echo htmlspecialchars($fileContent); ?></pre>
    </div>

    <div class="form">
        <h2>Provide Your Information and Feedback</h2>

        <form id="postForm" class="post-form">
            <input type="text" name="name" placeholder="Your Name" required><br><br>
            <input type="text" name="age" placeholder="Your Age" required><br><br>
            <input type="email" name="email" placeholder="Your Email" required id="emailInput"><br><br>
            <textarea class="message-text" name="feedbackMessage" placeholder="Your feedback about the website..." required></textarea>
            <button type="submit" class="send">Submit</button>
        </form>

    </div>

</div>

<?php include 'footer.php'; ?>
</body>
</html>
