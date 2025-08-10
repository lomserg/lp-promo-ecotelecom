<style>
/* ===== Cookie Banner ===== */
.cookie-banner {
    display: none;
    /* По умолчанию скрыт */
    position: fixed;
    bottom: 20px;
    /* right: 20px; */
    max-width: 480px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    left: 50%;
    transform: translateX(-50%);
    /* Тень баннеру */
    z-index: 1000;
    padding: 20px;
    font-family: Arial, sans-serif;
    font-size: 14px;
}

.cookie-concern {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* ===== Cookie Consent Block ===== */
.cookie-concern h4 {
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: bold;
}

.cookie-concern p {
    margin: 0 0;
    font-size: 13px;
    color: #333;
}

.cookie-concern-btns {
    display: flex;
    gap: 10px;
    /* margin-top: 10px; */
}

.cookie-concern-btns button {
    padding: 8px 14px;

    border-radius: 5px;
    cursor: pointer;

    font-size: 13px;
    transition: background-color 0.3s ease;
}

.cookie-accept-all {
    background-color: #31494e;
    color: #fff;
    border: none;
}

.cookie-accept-all:hover {
    background-color: #111e20;
}

.cookie-show-settings {
    color: #111e20;
    border: 1px #aaa9a9 solid;
}

/* ===== Cookie Settings Button (collapsed view) ===== */
.cookie-setting>button {
    background: none;
    border: none;
    color: #111e20;
    cursor: pointer;
    font-size: 13px;
    margin-top: 10px;
    padding: 0;
}

/* ===== Cookie Settings Form ===== */
.cookie-settings-form {
    margin-top: 20px;
}

/* === Cookie Category Block === */
.cookie-category {
    margin-bottom: 20px;
    border-top: 1px solid #e0e0e0;
    padding-top: 10px;
    display: flex;
    flex-wrap: wrap;
}

/* Header (clickable) */
.cookie-category-header {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

/* Icon (+ / ×) */
.cookie-toggle-icon {
    width: 16px;
    height: 16px;
    position: relative;
    margin-right: 10px;
}

.cookie-toggle-icon::before,
.cookie-toggle-icon::after {
    content: "";
    position: absolute;
    background-color: #000;
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transition: transform 0.3s ease;
}

.cookie-toggle-icon::after {
    transform: rotate(90deg);
}

.cookie-category.open .cookie-toggle-icon::after {
    transform: rotate(0deg);
}

/* Title */
.cookie-category-title {
    font-weight: bold;
    font-size: 14px;
    color: #000;
}

/* Toggle Switch Section */
.cookie-category-switch {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 5px 26px;
}

.cookie-switch-label {
    font-size: 12px;
    color: #666;
}

.cookie-switch-label.always-enabled {
    font-weight: bold;
    color: #000;
}

/* Toggle Style */
.cookie-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
}

.cookie-switch-input {
    opacity: 0;
    width: 0;
    height: 0;
}

.cookie-switch-track {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.cookie-switch-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.3s ease;
}

.cookie-switch-input:checked+.cookie-switch-track {
    background-color: #00a859;
}

.cookie-switch-input:checked+.cookie-switch-track .cookie-switch-thumb {
    transform: translateX(20px);
}

/* Description (collapsible) */
.cookie-category-description {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s ease;
    font-size: 12px;
    color: #333;
    margin-left: 26px;
    line-height: 1.4;
}

.cookie-category.open .cookie-category-description {
    max-height: 100px;
}

.cookie-back {
    background: none;
    border: none;
    color: #00a859;
    font-size: 13px;
    cursor: pointer;
    margin-bottom: 10px;
    padding: 0;
    display: inline-flex;
    align-items: center;
}

.cookie-back::before {
    content: "";
    margin-right: 6px;
    font-size: 14px;
}

.cookie-setting>.cookie-accept-save {
    padding: 8px 14px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 13px;
    transition: background-color 0.3s ease;
    background-color: #31494e;
    color: #fff;
    border: none;
}

.cookie-setting>.cookie-accept-save:hover {
    background-color: #111e20;
}

@media (max-width: 480px) {
    .cookie-banner {
        left: 16px;
        right: 16px;
        bottom: 10px;
        max-width: unset;
        width: auto;
        padding: 15px;
        font-size: 12px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        transform: none;
    }

    .cookie-concern {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }

    .cookie-concern p {
        font-size: 12px;
        margin: 0;
    }

    .cookie-concern-btns {
        width: 100%;
        justify-content: flex-start;
    }

    .cookie-concern-btns button {
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        border-radius: 8px;
    }
}
</style>


<div class="cookie-banner" id="cookieBanner" style="">
    <div class="cookie-concern">
        <!--<h4>Cookie-файлы</h4>-->
        <p>
            Пользуясь сайтом, вы соглашаетесь с использованием cookies и <a
                href="/upload/iblock/1a2/1a29086c87fc0aac5a1b3fd5b398891b.pdf">политикой обработки персональных
                данных.</a>
        </p>
        <div class="cookie-concern-btns">
            <button class="cookie-accept-all acceptCookies">Согласен</button>
        </div>
    </div>


</div>