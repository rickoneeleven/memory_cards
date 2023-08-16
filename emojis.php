
<?php
$emojis = ["🚴", "🎨", "🎧", "🎮", "🍦", "🎈", "📚", "🚗", "🍩", "🌟", "🍎", "🚀", "🦄", "🌈", "🎩", "🍕", "🐘", "🎸"];
shuffle($emojis);
$selectedEmojis = array_slice($emojis, 0, 8);
$cardEmojis = array_merge($selectedEmojis, $selectedEmojis);
shuffle($cardEmojis);
echo json_encode($cardEmojis);
?>
