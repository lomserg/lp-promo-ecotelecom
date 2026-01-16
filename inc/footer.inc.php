<footer class="footer">
    <div class="footer-main">
        <img src="./img/Group_81.svg" alt="" class="footer-logo" />
        <p class="footer-text fs-100">
            «Экотелеком» — провайдер в Москве и Московской области
        </p>
        <p class="footer-fineprint fs-100">
            Продолжая использовать наш сайт, вы даете согласие на обработку файлов
            Cookies и других пользовательских данных
        </p>
        <p class="footer-fineprint fs-100">© Экотелеком <?php echo  date("Y")?>
        </p>
    </div>
    <ul class="social-list">
        <li class="social-item">
            <a href="https://vk.com/ecotelecom_msk" class="social-link"><i class="fab fa-vk"></i></a>
        </li>

    </ul>
</footer>
<!-- Andata Tag Manager Code -->
<script type="application/javascript"
    src="https://tagmanager.hrke.andata.ru/api/v1/container/9b91d137-d2ac-4f60-8303-e5be7e7bbb96/published/code.js">
</script>
<!-- End Andata Tag Manager Code -->
<script src="//code.jivo.ru/widget/dIrCWbDFXD" async></script>



<!-- <script type="text/javascript">
!(function() {
    var t = document.createElement("script");
    (t.type = "text/javascript"),
    (t.async = !0),
    (t.src = "https://vk.com/js/api/openapi.js?169"),
    (t.onload = function() {
        VK.Retargeting.Init("VK-RTRG-1269640-eEibh"), VK.Retargeting.Hit();
    }),
    document.head.appendChild(t);
})();
</script>
<noscript><img src="https://vk.com/rtrg?p=VK-RTRG-1269640-eEibh" style="position: fixed; left: -999px"
        alt="" /></noscript> -->

<!-- Top.Mail.Ru counter -->
<!-- <script type="text/javascript">
var _tmr = window._tmr || (window._tmr = []);
_tmr.push({
    id: "3468370",
    type: "pageView",
    start: new Date().getTime(),
    pid: "USER_ID",
});
(function(d, w, id) {
    if (d.getElementById(id)) return;
    var ts = d.createElement("script");
    ts.type = "text/javascript";
    ts.async = true;
    ts.id = id;
    ts.src = "https://top-fwz1.mail.ru/js/code.js";
    var f = function() {
        var s = d.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(ts, s);
    };
    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else {
        f();
    }
})(document, window, "tmr-code");
</script>
<noscript>
    <div>
        <img src="https://top-fwz1.mail.ru/counter?id=3468370;js=na" style="position: absolute; left: -9999px"
            alt="Top.Mail.Ru" />
    </div>
</noscript> -->
<!-- /Top.Mail.Ru counter -->
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>
<?

$file = __DIR__ . '/banner.inc.php';
if (file_exists($file)) {
    include $file;
} else {
    echo "Include file not found: $file";
}
?>

</body>

</html>