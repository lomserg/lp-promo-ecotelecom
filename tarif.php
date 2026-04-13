<?php
$tarifs = file_get_contents(__DIR__ . '/data/tarifs.json');
$tarifs_json = json_decode($tarifs, true);
?>

<?php include __DIR__ . '/inc/header.inc.php'; ?>

<style>
body {
    font-family: 'Montserrat', sans-serif;
    background: #f8f9fa;
    margin: 0;
    padding: 0;
}


.tarif-main {
    /* margin-top: 7rem; */
    background: #F2F1F1;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
}

.tarif-container {
    padding-top: 7rem;
    border-radius: 26px;
    display: flex;
    margin: 0 auto;
    align-items: start;
    justify-content: center;
    gap: 2rem;
    flex-direction: column;
    max-width: 500px;
}

.tarif-info {
    background: #fff;
    width: 50%;
    border-radius: 26px;
    padding: 2rem;
    width: 100%;
}

.form-section {
    background: #fff;
    padding: 2rem;
    border-radius: 26px;
    width: 100%;
}

.tarif-features {
    padding: 0;
    list-style-type: none;
}

.header {
    border-bottom-left-radius: 26px;
    border-bottom-right-radius: 26px;
    height: 5rem;
}


.back-link {
    display: block;
    text-align: center;
    margin: 2rem 0;
    color: #6c5ce7;
    text-decoration: none;
}

.submit-btn {
    padding: 0.75rem 2.75rem;
    font-size: 1rem;
    background-color: #6c5ce7;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: block;
    text-align: center;
    margin: 2rem auto;
}

input[type="text"],
input[type="tel"] {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 15px;
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
                    <?php if($tarif["promo"]) :?>

                    <li><strong>Цена:</strong> <?php echo $tarif['price2']; ?> ₽/мес <span style="font-size: 0.9rem;"> с
                            4 месяца
                            <?php echo $tarif['price']; ?> ₽/мес</span></li>
                    <?php else :?>
                    <li><strong>Цена:</strong> <?php echo $tarif['price']; ?> ₽/мес</li>
                    <?php endif ?>
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
                <input type="text" class="field" name="address" id="adr11" required />
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



<?php
$file = __DIR__ . '/inc/footer.inc.php';
if (file_exists($file)) {
    include $file;
} else {
    echo "Include file not found: $file";
}
?>