<?php
$tarifs = file_get_contents(__DIR__ . '/data/tarifs.json');
$tarifs_json = json_decode($tarifs, true);
?>

<?php include __DIR__ . '/inc/header.inc.php'; ?>

<style>
body {
    font-family: 'Montserrat', sans-serif;
    background:
        radial-gradient(circle at top, rgba(120, 0, 255, 0.15), transparent 35%),
        radial-gradient(circle at bottom, rgba(0, 195, 255, 0.12), transparent 35%),
        #0b0b12;

    color: #f3f4f6;
    margin: 0;
    padding: 0;
}

.tarif-main {
    background: transparent;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1rem;
    min-height: 100vh;
}

.tarif-container {
    padding-top: 7rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 100%;
    max-width: 500px;
}

.tarif-info,
.form-section {
    position: relative;

    background: rgba(18, 18, 28, 0.78);

    border: 1px solid rgba(255, 255, 255, 0.08);

    border-radius: 26px;

    padding: 2rem;

    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    box-shadow:
        0 10px 40px rgba(0, 0, 0, 0.45),
        inset 0 1px 0 rgba(255, 255, 255, 0.04);

    overflow: hidden;
}

.tarif-info::before,
.form-section::before {
    content: "";

    position: absolute;
    inset: 0;

    background:
        linear-gradient(135deg,
            rgba(255, 255, 255, 0.08),
            transparent 35%);

    pointer-events: none;
}

h1,
h2 {
    margin-top: 0;
    color: #fff;
    font-weight: 700;
}

.tarif-features {
    padding: 0;
    margin: 1.5rem 0;
    list-style: none;
}

.tarif-features li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;

    padding: 1rem 0;

    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    color: #d1d5db;
}

.tarif-features li strong {
    color: #fff;
}

.tarif-description-list {
    margin-top: 2rem;
    padding-left: 1.25rem;
}

.tarif-description-list li {
    margin-bottom: 0.75rem;
    color: #cbd5e1;
    line-height: 1.5;
}

.tarif-description {
    color: #cbd5e1;
    line-height: 1.6;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    margin-top: 1.25rem;

    color: #e5e7eb;
    font-size: 0.95rem;
}

input[type="text"],
input[type="tel"] {
    width: 100%;

    box-sizing: border-box;

    padding: 0.95rem 1rem;

    border-radius: 16px;

    border: 1px solid rgba(255, 255, 255, 0.08);

    background: rgba(255, 255, 255, 0.04);

    color: #fff;

    font-size: 1rem;

    transition:
        border-color 0.25s ease,
        background 0.25s ease,
        box-shadow 0.25s ease;
}

input[type="text"]:focus,
input[type="tel"]:focus {
    outline: none;

    border-color: rgba(120, 0, 255, 0.8);

    background: rgba(255, 255, 255, 0.06);

    box-shadow:
        0 0 0 4px rgba(120, 0, 255, 0.15);
}

input::placeholder {
    color: #9ca3af;
}

.submit-btn,
.button-63 {
    margin-top: 2rem !important;

    width: 100% !important;
    margin-left: 0 !important;

    border: none;

    border-radius: 18px;

    padding: 1rem 1.5rem;

    font-size: 1rem;
    font-weight: 600;

    color: #fff;

    cursor: pointer;

    background:
        linear-gradient(135deg,
            #7c3aed,
            #06b6d4);

    box-shadow:
        0 10px 30px rgba(124, 58, 237, 0.35);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        opacity 0.2s ease;
}

.submit-btn:hover,
.button-63:hover {
    transform: translateY(-2px);

    box-shadow:
        0 14px 36px rgba(124, 58, 237, 0.45);
}

.back-link {
    margin: 2rem 0;

    color: #a78bfa;

    text-decoration: none;

    transition: opacity 0.2s ease;
}

.back-link:hover {
    opacity: 0.8;
}

.header {
    height: 4rem;

    background: rgba(15, 15, 25, 0.85);

    border-bottom-left-radius: 26px;
    border-bottom-right-radius: 26px;

    backdrop-filter: blur(12px);
}
</style>




<main class="tarif-main">
    <div class="tarif-container">
        <?php foreach ($tarifs_json as $tarif): ?>
        <?php if ((int)$tarif['id'] === (int)$_GET['id']): ?>
        <section class="tarif-info">
            <ul class="tarif-features">
                <h1><?php echo $tarif['name']; ?></h1>
                <ul class="tarif-features">

                    <li><strong>Скорость:</strong> <?php echo $tarif['speed']; ?> Мбит/с</li>
                    <?php if ($tarif['channels']): ?>
                    <li><strong>Каналов ТВ:</strong> <?php echo $tarif['channels']; ?></li>
                    <?php endif; ?>
                    <?php if ($tarif['movie']): ?>
                    <li><strong>Кино:</strong> <?php echo $tarif['movie']; ?></li>
                    <?php endif; ?>
                    <li><strong>Цена:</strong> <?php echo $tarif['price']; ?> ₽/мес</li>
                </ul>
                <?php
                    if (is_array($tarif['description'])) {
                        echo '<ul class="tarif-description-list">';
                        foreach ($tarif['description'] as $desc) {
                            echo "<li>$desc</li>";
                        }
                        echo '</ul>';
                    } else {
                        echo "<p class='tarif-description'>$tarif[description]</p>";
                    }
                    ?>
        </section>
        <?php endif; ?>
        <?php endforeach; ?>
        <section class="form-section">
            <h2>Заявка на подключение</h2>
            <form action="./php/form1.php" method="post" id="form1" name="call-form">
                <label class="fs-200" for="name1">Имя</label>
                <input type="text" name="name" id="name1" class="field" required />
                <label class="fs-200" for="phone1">Телефон</label>
                <input type="tel" class="field" data-tel-input maxlength="18" name="number" id="phone1" required />
                <label class="fs-200" for="adr11">Адрес</label>
                <div class="address-wrapper">
                    <input type="text" class="field" name="address" id="adr11" placeholder="Начните вводить адрес..."
                        autocomplete="off" required>

                    <div class="address-suggestions" id="addressSuggestions"></div>
                </div>
                <button type="submit" class="button-63 bg-violet" style="width: 80%; margin-left: 2rem"
                    name="call-submit"
                    onsubmit="if (validateForm(event, this.form)) { this.disabled=true; this.value='Sending, please wait...'; ym(49966909, 'reachGoal', 'form-submit'); } return false;">
                    Отправить
                </button>
                <input autocomplete="off" type="hidden" name="call-control" class="call-control" value="0" />
            </form>
        </section>
    </div>
    <a href="index.php" class="back-link">← Назад</a>
</main>



<script>
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("adr11");
    const suggestionsBox = document.getElementById("addressSuggestions");

    let debounce;

    input.addEventListener("input", () => {

        clearTimeout(debounce);

        const value = input.value.trim();

        if (value.length < 3) {
            suggestionsBox.innerHTML = "";
            suggestionsBox.classList.remove("active");
            return;
        }

        debounce = setTimeout(async () => {

            try {

                const response = await fetch(
                    `./dadata.php?query=${encodeURIComponent(value)}`
                );

                const data = await response.json();

                suggestionsBox.innerHTML = "";

                if (!data.suggestions?.length) {
                    suggestionsBox.classList.remove("active");
                    return;
                }

                data.suggestions.forEach(item => {

                    const div = document.createElement("div");

                    div.className = "suggestion-item";

                    div.textContent = item.value;

                    div.addEventListener("click", () => {
                        input.value = item.value;
                        suggestionsBox.innerHTML = "";
                        suggestionsBox.classList.remove("active");
                    });

                    suggestionsBox.appendChild(div);

                });

                suggestionsBox.classList.add("active");

            } catch (e) {
                console.error(e);
            }

        }, 300);

    });

    document.addEventListener("click", (e) => {

        if (!e.target.closest(".address-wrapper")) {
            suggestionsBox.innerHTML = "";
            suggestionsBox.classList.remove("active");
        }

    });

});
document.getElementById('form1').addEventListener('submit', function() {

    const btn = this.querySelector('button');

    btn.disabled = true;
    btn.innerText = 'Отправка...';

    ym(49966909, 'reachGoal', 'form_submit', {
        tariff_id: window.analytics.tariff_id,
        tariff_name: window.analytics.tariff_name,
        source: window.analytics.source
    });
});
</script>

<?php
$file = __DIR__ . '/inc/footer.inc.php';
if (file_exists($file)) {
    include $file;
} else {
    echo "Include file not found: $file";
}
?>