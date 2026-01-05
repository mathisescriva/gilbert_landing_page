<?php
// Contact Form Handler
header('Content-Type: application/json');

// Vérifier que la requête est bien une méthode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $company = isset($_POST['company']) ? trim($_POST['company']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    $privacy = isset($_POST['privacy']) ? true : false;
    
    // Vérifier que les champs obligatoires sont remplis
    if (empty($name) || empty($email) || empty($subject) || empty($message) || !$privacy) {
        echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires et accepter la politique de confidentialité.']);
        exit;
    }
    
    // Valider l'email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Veuillez entrer une adresse email valide.']);
        exit;
    }
    
    // Mapper les sujets
    $subjectLabels = [
        'demo' => 'Demande de démonstration',
        'pricing' => 'Question sur les tarifs',
        'technical' => 'Question technique',
        'partnership' => 'Partenariat',
        'other' => 'Autre'
    ];
    $subjectLabel = isset($subjectLabels[$subject]) ? $subjectLabels[$subject] : 'Autre';
    
    // Adresse email de destination
    $to = "contact@lexiapro.fr";
    
    // Sujet de l'email
    $emailSubject = "Nouveau message de contact - " . $subjectLabel;
    
    // Corps de l'email en HTML
    $emailMessage = "<html><body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>";
    $emailMessage .= "<h2 style='color: #3951c6;'>Nouveau message de contact Gilbert</h2>";
    $emailMessage .= "<div style='background: #f4f6ff; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
    $emailMessage .= "<p><strong>Sujet:</strong> " . htmlspecialchars($subjectLabel) . "</p>";
    $emailMessage .= "<p><strong>Nom:</strong> " . htmlspecialchars($name) . "</p>";
    $emailMessage .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    if (!empty($company)) {
        $emailMessage .= "<p><strong>Entreprise:</strong> " . htmlspecialchars($company) . "</p>";
    }
    if (!empty($phone)) {
        $emailMessage .= "<p><strong>Téléphone:</strong> " . htmlspecialchars($phone) . "</p>";
    }
    $emailMessage .= "</div>";
    $emailMessage .= "<div style='background: #fff; padding: 20px; border-left: 4px solid #3951c6; margin: 20px 0;'>";
    $emailMessage .= "<h3 style='color: #3951c6; margin-top: 0;'>Message:</h3>";
    $emailMessage .= "<p style='white-space: pre-wrap;'>" . nl2br(htmlspecialchars($message)) . "</p>";
    $emailMessage .= "</div>";
    $emailMessage .= "</body></html>";
    
    // En-têtes pour l'email HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Gilbert Contact <noreply@gilbert-assistant.fr>" . "\r\n";
    $headers .= "Reply-To: " . htmlspecialchars($email) . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Envoi de l'email
    $mailSent = mail($to, $emailSubject, $emailMessage, $headers);
    
    // Réponse en JSON
    if ($mailSent) {
        echo json_encode(['success' => true, 'message' => 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer ou nous contacter directement par email.']);
    }
} else {
    // Si ce n'est pas une requête POST, renvoyer une erreur
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
?>

