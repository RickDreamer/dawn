if (typeof opcLang == "undefined") {
    var opcLang = { shippingMethod: "", shippingNotice: "", payment: "", paymentNotice: "", upsellTitle: "", upsellAdded: "", addToCheckout: "" };
}
if (typeof opcSettings != "undefined" && typeof opcSettings.checkoutUrl == "undefined") {
    opcSettings.checkoutUrl = "securecheckout";
}

(function () {
    var $$,
        h = !1,
        m = !1,
        p = 0,
        q = !1,
        t = 0,
        v = 0,
        x = !1,
        y = !1,
        z = 0,
        A = !1,
        E = !1,
        aa =
            '<div class="section section--shipping-method"><div class="section__header">      <h2 class="section__title">' +
            opcLang.shippingMethod +
            '</h2></div><div class="section__content">    <fieldset class="content-box" data-shipping-methods="">    <div class="content-box__row prev_step_wait">' +
            opcLang.shippingNotice +
            "</div>  </fieldset></div></div>",
        F =
            '<div class="section section--payment-method"><div class="section__header">      <h2 class="section__title">' +
            opcLang.payment +
            '</h2></div><div class="section__content">  <fieldset class="content-box">    <div class="content-box__row ship_step_wait">' +
            opcLang.paymentNotice +
            "</div>  </fieldset></div></div>";
    function ba() {
        if ("undefined" === typeof jQuery || 1.7 > parseFloat(jQuery.fn.jquery)) {
            var a = document.createElement("SCRIPT");
            a.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
            a.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(a);
            a.onload = function () {
                $$ = jQuery.noConflict(!0);
                G();
                H();
            };
        } else ($$ = jQuery), G(), H();
    }
    function H() {
        ca();
        if (window.location.pathname == "/" + opcSettings.checkoutUrl || ("/cart" == window.location.pathname && opcSettings.skipCart))
            ("/cart" == window.location.pathname && (0 == $$("form[action*='cart']").length || $$(".cart-empty:visible").length || $$(".cart--empty-message:visible").length || $$(".cart--empty:visible").length)) || opcLoadCart();
        else {
            if (opcSettings.oneClickBuy) {
                var a = "";
                setInterval(function () {
                    a = opcSettings.btnSelector ? $$("form button[name='add']," + opcSettings.btnSelector).first() : $$("form button[name='add']").first();
                    if (a.length && !$$(".opcAdd").length) {
                        a.off();
                        a.parent().attr("style", "position:relative !important");
                        var d = a.outerHeight() + "px",
                            c = a.outerWidth() + "px",
                            e = a.offset();
                        a.parent().append('<div class="opcAdd" style="cursor:pointer !important;z-index:9999;opacity:0 !important;height:' + d + " !important;width:" + c + ' !important;position:absolute !important;"></div>');
                        $$(".opcAdd").offset({ top: e.top, left: e.left });
                    }
                }, 200);
            }
            setInterval(function () {
                $$("a[href='/checkout']").off().attr("onclick", "opcLoadCart();return false;");
                $$("button[onclick=\"window.location='/checkout'\"]").attr("onclick", "opcLoadCart()");
                var d = $$("button[data-testid='Checkout-button']");
                if (d.length && !$$(".opcQuickAdd").length) {
                    d.parent().attr("style", "position:relative !important");
                    var c = d.outerHeight() + "px",
                        e = d.outerWidth() + "px",
                        f = d.offset();
                    d.parent().append(
                        '<div class="opcQuickAdd" onclick="opcSubmitForm(this)" style="cursor:pointer !important;z-index:9999;opacity:0 !important;height:' + c + " !important;width:" + e + ' !important;position:absolute !important;"></div>'
                    );
                    $$(".opcQuickAdd").offset({ top: f.top, left: f.left });
                }
                d = $$("input[name='checkout'],button[name='checkout']").first();
                d.length &&
                    !$$(".opcCheckout").length &&
                    ((c = d.outerHeight() + "px"),
                    (e = d.outerWidth() + "px"),
                    (f = d.offset()),
                    d
                        .parent()
                        .append(
                            '<div class="opcCheckout" onclick="opcSubmitForm(this)" style="cursor:pointer !important;z-index:9999;opacity:0 !important;height:' +
                                c +
                                " !important;width:" +
                                e +
                                ' !important;position:absolute !important;"></div>'
                        ),
                    $$(".opcCheckout").offset({ top: f.top, left: f.left }));
                d = $$("input[name='checkout'],button[name='checkout']").eq(1);
                d.length &&
                    !$$(".opcCheckout2").length &&
                    ((c = d.outerHeight() + "px"),
                    (e = d.outerWidth() + "px"),
                    (f = d.offset()),
                    d
                        .parent()
                        .append(
                            '<div class="opcCheckout2" onclick="opcSubmitForm(this)" style="cursor:pointer !important;z-index:9999;opacity:0 !important;height:' +
                                c +
                                " !important;width:" +
                                e +
                                ' !important;position:absolute !important;"></div>'
                        ),
                    $$(".opcCheckout2").offset({ top: f.top, left: f.left }));
            }, 200);
            setInterval(function () {
                if ($$(".opcCheckout").length) {
                    var d = $$("input[name='checkout'],button[name='checkout']").first(),
                        c = d.offset(),
                        e = d.outerHeight() + "px";
                    d = d.outerWidth() + "px";
                    $$(".opcCheckout").css("width", d);
                    $$(".opcCheckout").css("height", e);
                    $$(".opcCheckout").offset({ top: c.top, left: c.left });
                }
                $$(".opcCheckout2").length && ((c = $$("input[name='checkout'],button[name='checkout']").eq(1).offset()), $$(".opcCheckout2").offset({ top: c.top, left: c.left }));
            }, 1e3);
            var b =
                ".opcAdd, .cart_buy_button,form input[value='Checkout'],form input[name='checkout'],form input[name='checkout'] *,form button[name='checkout'],form button[name='checkout'] *,button:contains('Checkout'),button:contains('checkout'),button:contains('CHECKOUT')";
            opcSettings.oneClickBuy && (b += ",.ProductForm__AddToCart,form button[name='add']");
            opcSettings.btnSelector && (b = b + "," + opcSettings.btnSelector);
            $$(b).off();
            b = b.split(",");
            $$.each(b, function (d, c) {
                $$(document).on("click", c, function (e) {
                    e.preventDefault();
                    opcSubmitForm(this);
                    return !1;
                });
            });
        }
    }
    function I() {
        var a = document.createElement("style");
        (document.head || document.getElementsByTagName("head")[0]).appendChild(a);
        a.type = "text/css";
        a.appendChild(
            document.createTextNode(
                "@media (min-width: 750px){.threeCol .field--third {width: 50% !important;}.threeCol #error-for-zip {min-width: 401px;background-color:white;left:20px;top:35px;position:absolute;}.field--required[data-address-field='zip']{position:relative;}}body > :not(#opcUpsellPopup):not(#opcWrapper):not(#opcPopup):not(#opcPreLoader):not(#cartLoader){display:none !important;}.rightCol .section--payment-method{padding-top:20px !important;}.rightCol .section__header{margin-bottom:5px;}div[data-alternative-payments],.section--express-checkout-selection{padding:0px !important;height:0px !important;position:absolute !important;overflow:hidden !important}.step[data-step='payment_method'] form .section:not(.section--reductions){display:block !important;}.threeCol.sidebar::after{width:600%;}.step__footer a{margin-top:10px;}.poptin-popup,.poptin-popup-background,.notifyjs-corner{display:none !important;}.section--billing-address .combo-box{display:none;}.total-line__price span[data-checkout-total-shipping-target]{white-space:normal}.mb_opc.threeCol .total-line__price{width:50%}.section--reductions.hidden-on-desktop{display:none;}.opcErrorBox{box-shadow:0 0 0 1px #e32c2b;border:1px solid #e32c2b}.radio__label,.radio__input,.radio__label__primary,.radio__label__accessory{float:none !important;}div[data-delivery-pickup-info]{visibility:hidden;padding:0;width:0;height:0;}.section.section--tip{display:none;}"
            )
        );
    }
    function da() {
        if (window.location.pathname != "/" + opcSettings.checkoutUrl) {
            var a = window.location.href;
            window.history.pushState(opcSettings.checkoutUrl, "Checkout", "/" + opcSettings.checkoutUrl);
            $$(window).on("popstate", function () {
                window.location.href = a;
            });
        }
    }
    function ea() {
        function a() {
            q
                ? ($$(".section--contact-information h2").text("1. " + $$(".section--contact-information h2").text()),
                  $$(".section--billing-address h2").text("2. " + $$(".section--billing-address h2").text()),
                  $$(".section--payment-method h2").text("3. " + $$(".section--payment-method h2").text()),
                  setTimeout(function () {
                      $$(".section--contact-information h2").length ||
                          ($$(".section--billing-address h2").text($$(".section--billing-address h2").text().replace("2. ", "1. ")), $$(".section--payment-method h2").text($$(".section--payment-method h2").text().replace("3. ", "2. ")));
                  }, 600))
                : ($$(".section--contact-information h2").text("1. " + $$(".section--contact-information h2").text()),
                  $$(".section--shipping-address h2").text("2. " + $$(".section--shipping-address h2").text()),
                  $$(".section--shipping-method h2").text("3. " + $$(".section--shipping-method h2").text()),
                  $$(".section--payment-method h2").text("4. " + $$(".section--payment-method h2").text()),
                  setTimeout(function () {
                      $$(".section--contact-information h2").length ||
                          ($$(".section--shipping-address h2").text($$(".section--shipping-address h2").text().replace("2. ", "1. ")),
                          $$(".section--shipping-method h2").text($$(".section--shipping-method h2").text().replace("3. ", "2. ")),
                          $$(".section--payment-method h2").text($$(".section--payment-method h2").text().replace("4. ", "3. ")));
                  }, 600));
        }
        function b() {
            0 == e &&
                ($$("input[value='credit_card']").length
                    ? ($$("input[value='credit_card']").click(), (e = !0))
                    : $$(".section--express-checkout-selection input:not([value^='paypal'])").length && ($$(".section--express-checkout-selection input:not([value^='paypal'])").first().click(), (e = !0)));
        }
        var d = 0,
            c = !1,
            e = !1,
            f = setInterval(function () {
                d++;
                0 < $$(".section--express-checkout-selection").length &&
                    ($$("input[value='credit_card']").length
                        ? ($$("input[value='credit_card']").click(), (e = !0))
                        : $$(".section--express-checkout-selection input:not([value^='paypal'])").length
                        ? ($$(".section--express-checkout-selection input:not([value^='paypal'])").first().click(), (e = !0))
                        : $$(".section--express-checkout-selection input").first().click());
                0 < $$(".step__footer").length &&
                    !c &&
                    ($$(".section--contact-information2").wrap("<div></div>"),
                    $$(".section--contact-information2").removeClass("section--contact-information2").addClass("section--contact-information"),
                    $$("div[data-section='customer-information']").hasClass("merged") && 0 == $(".section--contact-information").parent("*[class]").length && $$(".section--contact-information").parent().remove(),
                    $$("#checkout_pick_up_in_store_selected").length &&
                        ($$("#checkout_id_delivery-shipping").click(),
                        $$("#checkout_pick_up_in_store_selected").siblings(".content-box").remove(),
                        $$(".section--shipping-address>.section__header").remove(),
                        $$("#checkout_pick_up_in_store_selected").remove()),
                    $$(".content").addClass("mb_opc"),
                    clearInterval(f),
                    (c = !0),
                    fa(),
                    b(),
                    setTimeout(function () {
                        b();
                    }, 5e3),
                    $$("#opcWrapper").first().prevAll("link").clone().appendTo("head"),
                    $$("#opcWrapper").first().prevAll().not("div,a,button,span,img,link").appendTo("head"),
                    $$("#opcPreLoader").remove(),
                    $$(".step__footer").detach().appendTo(".main__content"),
                    $$(".breadcrumb,.breadcrumb_mobile").remove(),
                    $$(".section__header p").hide(),
                    J(),
                    ha(),
                    ia(),
                    ja(),
                    ka(),
                    $$(".step[data-step='payment_method'] .section:not(.section--reductions)").hide(),
                    K(),
                    la(),
                    L(),
                    M(3),
                    a(),
                    ma(),
                    na(),
                    N());
            }, 20);
    }
    function K() {
        $$("html").removeClass("no-display-table");
        $$("html").removeClass("no-displaytable");
        $$("html").addClass("display-table");
        $$("html").addClass("displaytable");
    }
    function L() {
        3 != opcSettings.design ||
            q ||
            1260 > $$(window).width() ||
            ($$("body").css("zoom", "0.91"),
            $$(".field:not(.field--email_or_phone,.field--third)").each(function () {
                $$(this).find("#checkout_reduction_code").length || $$(this).find("#checkout_email").length || $$(this).addClass("field--half");
            }),
            setInterval(function () {
                $$(".field:not(.field--email_or_phone,.field--third)").each(function () {
                    $$(this).hasClass("field--half") || $$(this).find("#checkout_reduction_code").length || $$(this).find("#checkout_email").length || $$(this).addClass("field--half");
                });
                $$(".step").css("min-height", $$(".rightCol").height() + "px");
            }, 500),
            $$(".siderbar").addClass("threeCol"),
            $$(".content").addClass("threeCol"),
            $$(".section--remember-me").remove(),
            $$(".section--shipping-method").addClass("field--half"),
            $$(".section--payment-method").addClass("field--half"),
            $$(".step,.section--shipping-method,.section--payment-method").css("width", "381px"),
            $$(".step[data-step='contact_information']").wrap("<div class='leftCol' style='float:left;'></div>"),
            $$(".section--shipping-method").first().appendTo(".leftCol"),
            $$(".section--payment-method").wrap("<div class='rightCol' style='float:left;margin-left:27px;'></div>"),
            $$(".section--billing-address").first().appendTo(".rightCol"),
            $$(".step__footer").first().appendTo(".rightCol"),
            $$(".rightCol").css({ position: "absolute", left: "430px", top: "0", margin: "0", padding: "0" }),
            $$(".section--payment-method").css({ margin: "0", padding: "0" }),
            $$(".main__content").css("position", "relative"),
            $$(".main").css("padding", "5px 36px 0 0"),
            $$(".main__header").css("padding-bottom", "0"),
            $$("input[name='checkout[remember_me]']").parents(".field").hide(),
            $$(".section__header").css("margin-bottom", "5px"),
            $$(".section:not(.section .section)").css("padding-top", "20px"),
            $$(".section--contact-information").css("padding-top", "0"),
            $$(".section--contact-information .section__header").css("margin-top", "20px"),
            $$(".section--contact-information").css("padding-top", "0"),
            $$(".sidebar").css("width", "288px"),
            $$(".wrap").css("max-width", "1200px"));
    }
    function ha() {
        $$("#notice-complementary").length && O("notice complementary");
        "payment_method" == $$('input[name="step"]').val() && (q = !0);
        $$(".step  .edit_checkout")
            .unbind()
            .submit(function (a) {
                a.preventDefault();
            });
        q || $$(".step__footer").before(aa);
        $$(".step__footer").before(F);
        $$(".section--shipping-address").show();
        $$("#continue_button").removeClass("hidden");
        $$("#payment_button").hide();
        5 < $$(".edit_checkout input:visible").length && !P()
            ? q
                ? Q()
                : submitFirstStep()
            : setTimeout(function () {
                  5 < $$(".edit_checkout input:visible").length && !P() && (q ? Q() : submitFirstStep());
              }, 3e3);
        oa();
        $$("body").on("click", ".order-summary__sections form button:not(#continue_button):not(.tag__button)", function () {
            R(!1);
            return !1;
        });
        $$("body").on("click", '.step[data-step="payment_method"] button:not(#continue_button):not(.tag__button)', function () {
            R(!0);
            return !1;
        });
        $$("body").on("click", ".order-summary__sections form button.tag__button", function () {
            pa(!1);
            return !1;
        });
        $$("body").on("click", '.step[data-step="payment_method"] button.tag__button', function () {
            pa(!0);
            return !1;
        });
        $$("body").on("click", ".step__footer button", function () {
            $$(this).addClass("btn--loading").attr("aria-busy", "true");
        });
        $$("body").on("click", "#continue_button,button.step__footer__continue-btn", function () {
            M(11);
            var a,
                b = '<span id="errorArrow" style="display:none;font-size: 40px;position:absolute;color: red;">' + (S() ? "&#8678;" : "&#8680;") + "</span>";
            $$("#opcWrapper").append(b);
            return (a = P())
                ? ($$("#" + a)
                      .closest(".field")
                      .addClass("field field--required field--error"),
                  document.getElementById(a).scrollIntoView(),
                  window.scrollBy(0, -100),
                  $$(".step__footer button").attr("aria-busy", "false").removeClass("btn--loading"),
                  (b = $$("#" + a).offset()),
                  (a = $$("#" + a).outerWidth()),
                  $$("#errorArrow").show(),
                  S() ? ($$("#errorArrow").offset({ top: b.top + 10, left: b.left + a - 25 }), window.errorArrow(!0)) : ($$("#errorArrow").offset({ top: b.top + 10, left: b.left - 35 }), window.errorArrow(!1)),
                  alert(opcLang.shippingNotice),
                  !1)
                : $$(".ship_step_wait").length && !q
                ? ($$("body,html").animate({ scrollTop: $$(".section--shipping-method").first().offset().top - 40 }, 400),
                  $$(".section--shipping-method .section__content .content-box[data-shipping-methods]").addClass("opcErrorBox"),
                  (b = $$(".section--shipping-method .section__content").offset()),
                  (a = $$(".section--shipping-method .section__content").outerWidth()),
                  $$("#errorArrow").show(),
                  S()
                      ? (1 < $$(".section--shipping-method .radio-wrapper").length ? $$("#errorArrow").offset({ top: b.top + 37, left: b.left + a - 15 }) : $$("#errorArrow").offset({ top: b.top + 3, left: b.left + a - 25 }),
                        window.errorArrow(!0))
                      : (1 < $$(".section--shipping-method .radio-wrapper").length ? $$("#errorArrow").offset({ top: b.top + 38, left: b.left - 35 }) : $$("#errorArrow").offset({ top: b.top + 4, left: b.left - 35 }), window.errorArrow(!1)),
                  alert(opcLang.paymentNotice),
                  $$(".step__footer button").attr("aria-busy", "false").removeClass("btn--loading"),
                  !1)
                : !0;
        });
    }
    function qa(a) {
        var b;
        $$(".field--error", a).each(function () {
            $$(this).hasClass("field--email_or_phone")
                ? ($$("div.field--email_or_phone").addClass("field--error"), $$("div.field--email_or_phone").find("p").remove(), $$("div.field--email_or_phone").append($$(this).find("p")[0].outerHTML), M(40, $$(this).find("p").text()))
                : $$(this).attr("data-shopify-pay-email-flow")
                ? ($$("div[data-shopify-pay-email-flow]").addClass("field--error"), $$("div[data-shopify-pay-email-flow]").find("p").remove(), $$("div[data-shopify-pay-email-flow]").append($$(this).find("p")[0].outerHTML))
                : $$(this).attr("data-address-field")
                ? ((b = $$(this).attr("data-address-field")),
                  $$("div[data-address-field='" + b + "']").addClass("field--error"),
                  $$("div[data-address-field='" + b + "']")
                      .find("p")
                      .remove(),
                  $$("div[data-address-field='" + b + "']").append($$(this).find("p")[0].outerHTML),
                  M(41, $$(this).find("p").text()))
                : $$(this).find(".field__message--error").length
                ? (M(42, $$(this).find(".field__message--error").text()), alert($$(this).find(".field__message--error").text()))
                : O("error");
            $$("body,html").animate({ scrollTop: $$(".field--error:visible").first().offset().top - 40 }, 400);
        });
    }
    function O(a) {
        A || ((A = !0), M(30, a), (window.location.href = "/checkout"));
    }
    function P() {
        var a = !1,
            b = $$(".section--shipping-address").length ? "shipping" : "billing",
            d = $$(".section--" + b + "-address .field--error");
        if (d.length) return d.is(":hidden") && d.closest("field").show(), $$(".section--" + b + "-address .field--error input,.section--" + b + "-address .field--error select").attr("id");
        [
            "checkout_email",
            "checkout_email_or_phone",
            "checkout_" + b + "_address_first_name",
            "checkout_" + b + "_address_last_name",
            "checkout_" + b + "_address_address1",
            "checkout_" + b + "_address_city",
            "checkout_" + b + "_address_zip",
            "checkout_" + b + "_address_country",
            "checkout_" + b + "_address_phone",
        ]
            .reverse()
            .forEach(function (c) {
                "true" != $$("#" + c + ":visible").attr("aria-required") || $$("#" + c).val() || (a = c);
            });
        0 < $$("#checkout_" + b + "_address_province:visible").length &&
            0 < $$("#checkout_" + b + "_address_province option").length &&
            ($$("#checkout_" + b + "_address_province option:selected").attr("data-alternate-values") || (a = "checkout_" + b + "_address_province"));
        return a;
    }
    function Q() {
        $$(".section--shipping-method .section__content .content-box[data-shipping-methods]").removeClass("opcErrorBox");
        M(8);
        var a, b, d, c;
        T();
        var e;
        $$("#checkout_email_or_phone").removeAttr("data-autofocus");
        $$("#checkout_email").removeAttr("data-autofocus");
        if (q) {
            var f = $$(".step .edit_checkout").first();
            $$('input[name="checkout[email_or_phone]"]').val($$("#checkout_email_or_phone").val());
        } else f = $$(".edit_checkout[data-shipping-method-form]");
        var n = f.attr("action");
        x = !1;
        $$.ajax({ type: "POST", url: n, data: f.serialize() })
            .done(function (g) {
                function k() {
                    x = !0;
                    $$(".section--payment-method").show();
                    $$(".review-block").parents(".section").hide();
                    $$(".section--payment-method input[type=radio]").length && $$(".section--payment-method").find(".content-box__row--secondary").addClass("hidden");
                    !1 !== m
                        ? ($$(".section--payment-method input.input-radio").removeAttr("checked"),
                          $$(".section--payment-method")
                              .find("input[value='" + m + "']")
                              .attr("checked", "checked")
                              .trigger("click"))
                        : $$(".section--payment-method input[type=radio]:checked").length
                        ? ((m = $$(".section--payment-method").find("input[type=radio]:checked").val()), $$(".section--payment-method").find("input[type=radio]:checked").trigger("click"))
                        : ($$(".section--payment-method input[type=radio]").removeAttr("checked"),
                          $$(".section--payment-method").find(".input-radio").first().attr("checked", "checked").trigger("click"),
                          (m = $$(".section--payment-method").find("input[type=radio]:checked").val()),
                          $$("div[data-subfields-for-gateway='" + m + "']").removeClass("hidden"));
                    $$("div[data-subfields-for-gateway='" + m + "']").removeClass("hidden");
                    (1 == opcSettings.design || 1260 > $$(window).width()) && $$("body,html").animate({ scrollTop: $$(".section--payment-method").first().offset().top - 0 }, 400);
                    var u = 0,
                        r = setInterval(function () {
                            u++;
                            0 < b &&
                                0 == $$(window).scrollTop() &&
                                ((1 == opcSettings.design || 1260 > $$(window).width()) && $$("body,html").animate({ scrollTop: $$(".section--payment-method").first().offset().top - 0 }, 400), clearInterval(r));
                            200 === u && clearInterval(r);
                        }, 10);
                    I();
                    U();
                    $$(".section--billing-address").show();
                    $$(".section--payment-method .content-box__row--secondary").css({ display: "table", overflow: "visible", padding: "1em", height: "auto", "box-sizing": "border-box", width: "100%" });
                    setTimeout(function () {
                        K();
                    }, 2e3);
                    K();
                    setTimeout(function () {
                        $$("#section--billing-address__different").show();
                    }, 4e3);
                    M(9);
                    J();
                    N();
                }
                if (q) {
                    if ($$(".field--error", g).length) {
                        qa(g);
                        U();
                        return;
                    }
                    if ($$("#checkout_email_or_phone", g).length) {
                        $$("div.field--email_or_phone").addClass("field--error");
                        U();
                        return;
                    }
                    if ($$("#checkout_email", g).length) {
                        $$("#checkout_email").closest(".field").addClass("field--error");
                        U();
                        return;
                    }
                }
                if ($$(".section--shipping-method .notice--error", g).length) (window.location.href = "/checkout"), U();
                else {
                    $$("head").find("script").remove();
                    var l = g.split("\x3c!--<![endif]--\x3e")[1].split("</head>")[0];
                    c = l.match(/<script src="\/\/cdn.shopify.com\/shopifycloud\/shopify\/assets\/checkout(.*)><\/script>/);
                    l = l.replace(c[0], "");
                    l = l.replace("&quot;client_attributes_checkout&quot;;", "'client_attributes_checkout';");
                    $$("head").append(l);
                    setTimeout(function () {
                        $$("head").append(c[0]);
                    }, 1700);
                    b = $$(window).scrollTop();
                    g = g.substring(g.indexOf("<body>") + 6, g.indexOf("</body>"));
                    $$("form.edit_checkout .section--payment-method").remove();
                    $$("form.edit_checkout input").attr("value", function () {
                        return $$(this).val();
                    });
                    $$("form.edit_checkout select option:checked").attr("checked2", "1");
                    $$("form.edit_checkout select option").removeAttr("selected");
                    $$("form.edit_checkout select option[checked2='1']").attr("selected", "selected").removeAttr("checked2");
                    $$('form.edit_checkout input[type="checkbox"]:checked').attr("checked2", "1");
                    $$('form.edit_checkout input[type="checkbox"]').removeAttr("checked");
                    $$("form.edit_checkout input[checked2='1']").attr("checked", "checked").removeAttr("checked2");
                    $$('.section--shipping-method input[type="radio"]').removeAttr("checked");
                    $$(".section--shipping-method input[value='" + h + "']").attr("checked", "checked");
                    a = $$("form.edit_checkout")[0].outerHTML;
                    oldSidebar = $$(".sidebar").html();
                    oldMainheader = $$(".main__header").html();
                    oldFooterA = $$(".step__footer a");
                    q || (a += $$(".section--shipping-method")[0].outerHTML);
                    $$("body").empty();
                    T();
                    $$("body").append('<div id="opcWrapper">' + g + "</div>");
                    $$(".content").addClass("mb_opc");
                    $$(".sidebar").html(oldSidebar);
                    $$(".main__header").html(oldMainheader);
                    $$(".step__footer a").remove();
                    $$(".step__footer").append(oldFooterA);
                    0 < $$("body .step__sections .section").length ? $$("body .step__sections .section").first().before(a) : $$("body .step").first().before(a);
                    $$("#section--billing-address__different").hide();
                    $$(".review-block").parents(".section").hide();
                    q || $$(".section--billing-address").hide();
                    J();
                    T();
                    $$(".breadcrumb").remove();
                    window.scrollTo(0, b);
                    ra();
                    L();
                    $$(".section--payment-method .content-box__row--secondary").css({ display: "block", overflow: "hidden", padding: "0px", height: "0px" });
                    d = 0;
                    var w = setInterval(function () {
                        d++;
                        if ($$("div[data-payment-subform='free']:visible").length || $$("div[data-payment-subform='gift_cards']:visible").length) clearInterval(w), (e = !0), k();
                        if (0 < $$(".section--payment-method input").length && (!$$("#card-fields__loading-error:visible").length || $("#card-fields__loading-error:visible").siblings('.fieldset:not(".hidden")').length)) {
                            var u = "#checkout_payment_gateway_" + $$("div[data-credit-card-fields]").parent(".radio-wrapper").attr("data-subfields-for-gateway");
                            ($$(u).is(":checked") && $$("div[data-credit-card-fields]").not(":visible").length && !$$("div[data-credit-card-summary]:visible").length) ||
                                (0 < $$("input[name='hosted_fields_redirect']").length ? 150 !== d || e || (clearInterval(w), (e = !0), k()) : (clearInterval(w), (e = !0), k()));
                        }
                        400 !== d || e || (3 < t ? O("payment") : submitFirstStep(!0), clearInterval(w), (e = !0));
                    }, 20);
                }
            })
            .fail(function () {
                setTimeout(function () {
                    x || (t++, 3 < t ? O("fail submit second step") : submitFirstStep(!0));
                }, 4e3);
            });
    }
    function N() {
        $$(".policy-list__item a").on("click", function () {
            window.open($$(this).attr("href"));
            return !1;
        });
    }
    function la() {
        setInterval(function () {
            1 < $$(".flag-selector").length && $$(".flag-selector").not(":first").remove();
        }, 300);
    }
    function ka() {
        $$("body").on("click", "button.order-summary-toggle", function () {
            $$("button.order-summary-toggle").removeAttr("data-drawer-toggle");
            $$("#order-summary").hasClass("order-summary--is-collapsed")
                ? ($$("button.order-summary-toggle").addClass("order-summary-toggle--hide"),
                  $$("button.order-summary-toggle").removeClass("order-summary-toggle--show"),
                  $$(".order-summary__sections").show(),
                  $$("#order-summary").removeClass("order-summary--is-collapsed"),
                  $$("#order-summary").addClass("order-summary--is-expanded"))
                : ($$("button.order-summary-toggle").addClass("order-summary-toggle--show"),
                  $$("button.order-summary-toggle").removeClass("order-summary-toggle--hide"),
                  $$("#order-summary").removeClass("order-summary--is-expanded"),
                  $$("#order-summary").addClass("order-summary--is-collapsed"));
        });
    }
    function R(a) {
        var b = a ? $$('.step[data-step="payment_method"] button:not(#continue_button):visible').first().closest("form") : $$(".order-summary__sections form button:visible").first().closest("form"),
            d = b.find("button");
        d.addClass("btn--loading").attr("aria-busy", "true").attr("disabled", "true");
        $$("#error-for-reduction_code:visible").hide();
        a = b.attr("action");
        $$.ajax({ type: "POST", url: a, data: b.serialize() })
            .done(function (c) {
                d.removeClass("btn--loading").attr("aria-busy", "false").removeAttr("disabled");
                -1 != c.indexOf("error-for-reduction_code")
                    ? (b.find(".field").addClass("field--error"),
                      0 == $$("#error-for-reduction_code:visible").length ? b.find(".field").append($$("#error-for-reduction_code", c)[0].outerHTML) : $$("#error-for-reduction_code:visible").show())
                    : ((y = !1), opcLoadCart());
            })
            .fail(function () {
                O("fail submit discount");
            });
    }
    function pa(a) {
        t = 0;
        a = a ? $$('.step[data-step="payment_method"] button.tag__button:visible').closest("form") : $$(".order-summary__sections form button.tag__button:visible").closest("form");
        a.find("button").hide();
        var b = a.attr("action");
        $$.ajax({ type: "POST", url: b, data: a.serialize() })
            .done(function () {
                y = !1;
                opcLoadCart();
            })
            .fail(function () {
                O("fail cancel discount");
            });
    }
    function oa() {
        function a() {
            M(4);
            P() || (q ? Q() : ((t = 0), submitFirstStep()));
        }
        var b,
            d = $$(".section--shipping-address").length ? "shipping" : "billing";
        $$("body").on("input propertychange", "#checkout_email_or_phone, #checkout_email, #checkout_phone,.section--" + d + "-address input", function () {
            $$(this).closest(".field--error").removeClass("field--error");
            $$("#errorArrow").hide();
            clearTimeout(b);
            3 == opcSettings.design && $$(".section--shipping-address .field, .section--billing-address .field").css("height", "56px");
            b = setTimeout(a, 3500);
        });
        $$("body").on("change", ".section--" + d + "-address select,.flag-selector select", function () {
            $$("#errorArrow").hide();
            clearTimeout(b);
            b = setTimeout(a, 3500);
        });
        $$("body").on("click", "#checkout_shipping_address_address1-autocomplete", function () {
            clearTimeout(b);
            b = setTimeout(a, 3500);
        });
        $$("body").on("change", ".section--" + d + "-address select", function () {
            $$("#error-for-zip").parent(".field--error").removeClass("field--error");
            $$("#error-for-zip").remove();
        });
    }
    function ia() {
        $$("body").on("change", ".section--shipping-method input[type=radio]", function () {
            h = this.value;
            $$("div[data-shipping-warning]").remove();
            Q();
        });
    }
    function ja() {
        $$("body").on("change", ".section--payment-method input.input-radio", function () {
            m = this.value;
        });
    }
    function J() {
        $$(".step__footer").css("display", "block");
        $$(".step__footer button").css("width", "100%");
        $$(".step__footer button span").text(opcLang.completeOrder);
        $$(".step__footer .shown-if-js").css("width", "100%");
        if (1260 > $$(window).width() && opcSettings.boosters && 1 == opcSettings.boosters.booster5) {
            $$(".step__footer").css("position", "fixed");
            $$(".step__footer").css("overflow", "hidden");
            $$(".step__footer").css("bottom", "0");
            $$(".step__footer").css("left", "0");
            $$(".step__footer").css("width", "100%");
            $$(".step__footer__previous-link").hide();
            var a = 0;
            $$(document).scroll(function () {
                setTimeout(function () {
                    a = $$("#guaranteeImgBtn").length ? $$(document).height() - 140 - $$("#guaranteeImgBtn").outerHeight(!0) : $$(document).height() - 140;
                    $$(window).scrollTop() + $$(window).height() > a || !$$(".ship_step_wait").length
                        ? ($$(".step__footer").css("position", "relative"), $$(".step__footer__previous-link").show(), $$("#stepFooterHolder").remove())
                        : ($$("#stepFooterHolder").length ||
                              ($$(".step__footer").after('<div id="stepFooterHolder"></div>'), $$("#stepFooterHolder").css("width", "100%"), $$("#stepFooterHolder").css("height", $$(".step__footer").outerHeight(!0) + "px")),
                          $$(".step__footer").css("position", "fixed"),
                          $$(".step__footer").css("bottom", "0"),
                          $$(".step__footer").css("left", "0"),
                          $$(".step__footer").css("width", "100%"),
                          $$(".step__footer__previous-link").hide());
                }, 500);
            });
        }
    }
    function ma() {
        if (opcSettings.upsells) {
            var a = 1e4,
                b = "",
                d = [];
            $$(".product").each(function () {
                d.push($$(this).attr("data-product-id"));
            });
            opcSettings.upsells.forEach(function (c) {
                c.trigger.split(",").forEach(function (e) {
                    -1 != d.indexOf(e) && c.priority < a && ((a = c.priority), (b = c.products.split(",")));
                });
            });
            $$.getJSON("https://" + Shopify.shop + "/products.json?limit=5000").done(function (c) {
                c.products.forEach(function (e) {
                    e.variants.forEach(function (f) {
                        if (-1 != b.indexOf(f.id.toString())) {
                            if (!$$("#opcUpsell").length) {
                                var n =
                                    '<div id="opcUpsell" style="padding: 0 8px 7px;/*background: #fafafa;border: 1px solid #e8e8e8;*/border-radius: 7px;margin-top: 26px;"><div class="section__header"><h2 class="section__title" style="margin-bottom:0px;font-size:17px;">' +
                                    opcLang.upsellTitle +
                                    '</h2></div><div><table class="product-table">    <tbody data-order-summary-section="line-items">    </tbody></table></div></div>';
                                $$("body").append(
                                    '<div id="opcUpsellPopup" style="position:fixed;left:0;right:0;top:50px;z-index:99998;padding-top:50px;background-color:white;margin: auto;padding: 15px;border: 1px solid #c2c2c2;box-shadow:0px 0px 14px 0px rgba(0,0,0,0.75);width: 80%;max-width:500px;"><span class="close" onclick="document.getElementById(\'opcUpsellPopup\').style.display = \'none\';return false;" style="cursor:pointer;color: #aaaaaa;position:absolute;top:10px;right:10px;font-size: 40px;font-weight:bold;">&times;</span></div>'
                                );
                                $$("#opcUpsellPopup").prepend(n);
                                $$("#opcUpsellPopup").fadeIn();
                                -1 != window.location.search.indexOf("upsell=1") && $$("#opcUpsell .section__header").prepend("<p style='font-size:17px;font-weight:bold;'>" + opcLang.upsellAdded + " &#x2714;</p><br>");
                            }
                            var g = Shopify.currency.active ? Shopify.currency.active : Shopify.Checkout.currency;
                            n = 0 < e.images.length ? '<img class="product-thumbnail__image" src="' + e.images[0].src + '">' : "";
                            if (S()) {
                                var k = '<span class="order-summary__emphasis">' + f.price + " " + g + "</span>";
                                g = "";
                            } else (k = ""), (g = '<td class="product__price">  <span class="order-summary__emphasis">' + f.price + " " + g + "</span></td>");
                            f =
                                '<tr class="product" data-product-type="" data-customer-ready-visible="">    <td class="product__image">        <div class="product-thumbnail ">            <div class="product-thumbnail__wrapper">' +
                                n +
                                '</div>        </div>    </td>    <th class="product__description" scope="row">        <span class="product__description__name order-summary__emphasis">' +
                                e.title +
                                '</span>        <span class="product__description__variant order-summary__small-text"></span>       ' +
                                k +
                                "    </th>  " +
                                g +
                                '   <td class="product__price">        <button name="button" type="button" onclick="opcAddToCart(this,' +
                                f.id +
                                ')" class="field__input-btn btn" aria-busy="false" style="padding: 10px 5px;">' +
                                opcLang.addToCheckout +
                                "</button>    </td></tr>";
                            $$("#opcUpsell tbody").prepend(f);
                        }
                    });
                });
            });
        }
    }
    function na() {
        if (opcSettings.boosters) {
            1 != opcSettings.boosters.booster2 ||
                $$("div[data-delivery-pickup-info]").length ||
                (document.querySelector(".discountMinimize") ||
                    !$$("#checkout_reduction_code:visible").length ||
                    $$(".order-summary-toggle:visible").length ||
                    ((document.querySelector(".sidebar__content input[name='checkout[reduction_code]']").closest(".field").style.display = "none"),
                    $$(".sidebar__content input[name='checkout[reduction_code]']")
                        .closest(".fieldset")
                        .append(
                            '<p class="discountMinimize" onclick="document.querySelector(&quot;.sidebar__content input[name=&apos;checkout[reduction_code]&apos;]&quot;).closest(&apos;.field&apos;).style.display = &apos;&apos;;document.querySelector(&quot;.discountMinimize&quot;).style.display = \'none\';" style="cursor:pointer;"><span style="display:inline-block;margin-right:3px;width: 10px;height: 10px;border: 1px solid grey;border-radius: 50%;font-size: 13px;line-height: 10px;text-align: center;background: #484848;color: white;">&#43;</span><span style="display:inline-block;">' +
                                $$("#checkout_reduction_code").attr("placeholder") +
                                "?</span></p>"
                        )),
                document.querySelector(".addressMinimize") ||
                    !$$("#checkout_shipping_address_address2:visible").length ||
                    $$(".order-summary-toggle:visible").length ||
                    ((document.querySelector("div[data-address-field='address2'] input").style.display = "none"),
                    (document.querySelector("div[data-address-field='address2'] label").style.display = "none"),
                    $$("#checkout_shipping_address_address2")
                        .closest(".field__input-wrapper")
                        .append(
                            '<p class="addressMinimize" onclick="document.querySelector(&quot;div[data-address-field=&apos;address2&apos;] input&quot;).style.display = &apos;&apos;;document.querySelector(&quot;div[data-address-field=&apos;address2&apos;] label&quot;).style.display = &apos;&apos;;document.querySelector(&quot;.addressMinimize&quot;).style.display = &apos;none&apos;;" style="cursor:pointer;"><span style="display:inline-block;margin-right:3px;width: 10px;height: 10px;border: 1px solid grey;border-radius: 50%;font-size: 13px;line-height: 10px;text-align: center;background: #484848;color: white;">&#43;</span><span style="display:inline-block;width:80%">' +
                                $$("#checkout_shipping_address_address2").attr("placeholder") +
                                "</span></p>"
                        )),
                $$(".section--shipping-address").length &&
                    !$$(".merged").length &&
                    ($$("div[data-section='customer-information']").find(".fieldset").prependTo(".section--shipping-address .section__content"),
                    $$(".fieldset").css("clear", "both"),
                    $$("div[data-section='customer-information']").addClass("merged"),
                    $$(".section--shipping-address .section__content").append($$("div[data-buyer-accepts-marketing]")),
                    $$(".section--contact-information").parent().remove(),
                    $$(".section--shipping-address h2").text($$(".section--shipping-address h2").text().replace("2. ", "1. ")),
                    $$(".section--shipping-method h2").text($$(".section--shipping-method h2").text().replace("3. ", "2. ")),
                    $$(".section--payment-method h2").text($$(".section--payment-method h2").text().replace("4. ", "3. "))));
            if (1 == opcSettings.boosters.booster3) {
                var a = opcSettings.boosters.booster3_heading,
                    b = opcSettings.boosters.booster3_title1,
                    d = opcSettings.boosters.booster3_text1,
                    c = opcSettings.boosters.booster3_img1;
                "" != c && (c = '<img src="' + c + '" />');
                var e = opcSettings.boosters.booster3_title2,
                    f = opcSettings.boosters.booster3_text2,
                    n = opcSettings.boosters.booster3_img2;
                "" != n && (n = '<img src="' + n + '" />');
                var g = opcSettings.boosters.booster3_title3,
                    k = opcSettings.boosters.booster3_text3,
                    l = opcSettings.boosters.booster3_img3;
                "" != l && (l = '<img src="' + l + '" />');
                var w = opcSettings.boosters.booster3_title4,
                    u = opcSettings.boosters.booster3_text4,
                    r = opcSettings.boosters.booster3_img4;
                "" != r && (r = '<img src="' + r + '" />');
                $$(".sidebar__content .order-summary__sections").length &&
                    !$$("#booster3").length &&
                    ($$(".order-summary__sections").append(
                        '<div id="booster3" style="padding-bottom:20px;"><div id="booster3Title"><span>' +
                            a +
                            '</span></div><div class="booster3Item">' +
                            c +
                            "<div><h4>" +
                            b +
                            "</h4><p>" +
                            d +
                            '</p></div></div><div class="booster3Item">' +
                            n +
                            "<div><h4>" +
                            e +
                            "</h4><p>" +
                            f +
                            '</p></div></div><div class="booster3Item">' +
                            l +
                            "<div><h4>" +
                            g +
                            "</h4><p>" +
                            k +
                            '</p></div></div><div class="booster3Item">' +
                            r +
                            "<div><h4>" +
                            w +
                            "</h4><p>" +
                            u +
                            "</p></div></div></div>"
                    ),
                    (a = document.getElementById("booster3Title")),
                    (style = document.createElement("style")),
                    a.appendChild(style),
                    (style.type = "text/css"),
                    style.appendChild(
                        document.createTextNode(
                            '#booster3Title{margin-top:25px;overflow:hidden;text-align:center;font-size:16px}#booster3Title span{position:relative;}#booster3Title span:before,#booster3Title span:after {content: "";position: absolute;height: 5px;border-bottom: 1px solid;border-top: 1px solid;top: 8px;width: 600px;}#booster3Title span:before {right: 100%;margin-right: 15px;}#booster3Title span:after{left: 100%;margin-left: 15px;}.booster3Item{margin-top:30px;font-size:15px;}.booster3Item p{line-height:1.2;}.booster3Item h4{font-weight:bold;}.booster3Item img{width:13%;float:left;}.booster3Item div{width:75%;margin-left:25%}.booster3Item::after{content:"";clear:both;height:0;display:block;}'
                        )
                    ));
            }
            if (1 == opcSettings.boosters.booster4) {
                var sa = '<div id="guaranteeImgBtn" style="display: block;width: 100%;text-align: center;padding-top: 24px;padding-bottom:30px;clear: both;margin-bottom: 0px;"><img src="' + opcSettings.boosters.booster4_img + '"></div>';
                setInterval(function () {
                    !$$("#guaranteeImgBtn").length && $$(".section--payment-method").length && $$(".step__footer").after(sa);
                }, 1e3);
            }
            1 == opcSettings.boosters.booster1 &&
                ((a =
                    '<div id="booster1" style="display:block;background:#fffde4;padding:8px 18px;margin:10px 0;font-size:13px;color:#2c2c2c;font-weight:bold;border:1px solid #e3da74;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;">' +
                    opcSettings.boosters.booster1_text +
                    "</div>"),
                $$(".main__header").append(a),
                (function () {
                    if (V("opcTimer")) var B = (V("opcTimer") - Date.now()) / 1e3;
                    else (B = 60 * opcSettings.boosters.booster1_min), W("opcTimer", Date.now() + 1e3 * B, 1);
                    var C,
                        D,
                        ta = setInterval(function () {
                            0 >= B
                                ? ($$("#booster1").text(opcSettings.boosters.booster1_text2), clearInterval(ta))
                                : ((C = parseInt((B / 60) % 60, 10)), (D = parseInt(B % 60, 10)), (C = 10 > C ? "0" + C : C), (D = 10 > D ? "0" + D : D), $$("#timer").text(C + ":" + D), B--);
                        }, 1e3);
                })());
        }
    }
    function T() {
        p < $$(document).height() && (p = $$(document).height());
        $$(".main").css("min-height", p);
        $$("#cartLoader").length
            ? $$("#cartLoader").css("min-height", $$(document).height())
            : $$("body").append(
                  '<div id="cartLoader" style="left:0;top:0;height:' +
                      p +
                      'px;width:100%;text-align:center;background-color: rgba(255, 255, 255, .5);position:absolute;z-index:9999999999"><img style="position:fixed;top:70px;left:50%;margin-left:-100px;" src="https://d17awlyy7mou9o.cloudfront.net/shopify/images/opc_loader.gif" /></div>'
              );
    }
    function U() {
        z = 0;
        $$("#cartLoader").remove();
        $$(".main").css("min-height", "auto");
    }
    function ca() {
        setInterval(function () {
            $$("#cartLoader").length && (z++, 36 < z && O("cartloader timeout"));
        }, 500);
    }
    function ua() {
        var a = navigator.userAgent || navigator.vendor || window.opera;
        return -1 < a.indexOf("FBAN") || -1 < a.indexOf("FBAV") || -1 < a.indexOf("Instagram");
    }
    function X() {
        if (va() || -1 < navigator.userAgent.indexOf("Mozilla/5.0 (Macintosh; Intel Mactest") || (-1 < navigator.userAgent.indexOf("Mozilla/5.0 (iPhonetest;") && -1 < navigator.userAgent.indexOf("Safari"))) return !1;
        var a = navigator.userAgent.toLowerCase();
        if (-1 < a.indexOf("chrome") || -1 < a.indexOf("fban") || -1 < a.indexOf("fbav") || -1 < a.indexOf("instagram") || -1 < a.indexOf("safari")) return !0;
        if (-1 < a.indexOf("firefox")) {
            var b = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
            if (66 < (b ? parseInt(b[1]) : 0)) return !0;
        }
        return -1 < a.indexOf("samsungbrowser") ? !0 : !1;
    }
    function va() {
        var a = window.navigator.userAgent,
            b = a.indexOf("MSIE ");
        if (0 < b) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
        b = a.indexOf("Edge/");
        return 0 < b ? parseInt(a.substring(b + 5, a.indexOf(".", b)), 10) : 0 < a.indexOf("Trident/") ? ((b = a.indexOf("rv:")), parseInt(a.substring(b + 3, a.indexOf(".", b)), 10)) : !1;
    }
    function G() {
        if (opcSettings.customJsFile) {
            var a = document.createElement("SCRIPT");
            a.src = decodeURIComponent(opcSettings.customJsFile);
            a.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(a);
        }
    }
    function wa() {
        if (opcSettings.customCssFile) {
            var a = document.head,
                b = document.createElement("link");
            b.type = "text/css";
            b.rel = "stylesheet";
            b.href = decodeURIComponent(opcSettings.customCssFile);
            a.appendChild(b);
        }
    }
    function xa(a) {
        return (a = a.replace("document.getElementsByTagName('head')[0].appendChild(eventsListenerScript)", ""));
    }
    function fa() {
        if ("undefined" !== typeof fbq && $$(".payment-due__price").length) {
            var a = [],
                b = 0,
                d = $$(".order-summary__section__content .product").length,
                c = $$(".payment-due__price").attr("data-checkout-payment-due-target");
            c = parseFloat(c.substring(0, c.length - 2) + "." + c.slice(-2));
            $$(".order-summary__section__content .product").each(function () {
                a.push($$(this).attr("data-product-id"));
                b += parseInt($$(this).find(".product__quantity").text());
            });
            d && c && Shopify.Checkout.currency && a && fbq("track", "InitiateCheckout", { c: d, value: c, currency: Shopify.Checkout.currency, a: a, b: "product_group" });
        }
    }
    function ya() {
        var a = 0;
        if (-1 != navigator.userAgent.indexOf("Windows NT 10") || -1 != navigator.userAgent.indexOf("Edge")) a = 50;
        var b = !1,
            d = !1;
        $$(document).mouseout(function (c) {
            var e = c.relatedTarget || c.toElement;
            1 < c.pageY && (b = !0);
            if ((!e || "HTML" == e.nodeName || 0 > c.pageY - $$(window).scrollTop()) && 0 == d && c.pageY - a < $$(window).scrollTop() && b)
                return (
                    (d = !0),
                    (c =
                        '<div id="opcPopup" style="position:fixed;z-index:99999;padding-top:50px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color: rgba(0,0,0,0.5)"><div style="position:relative;background-color: ' +
                        opcSettings.popupBkg +
                        ';margin: auto;padding: 15px;border: 1px solid #888;width: 80%;max-width:600px;"><span class="close" onclick="document.getElementById(\'opcPopup\').style.display = \'none\';return false;" style="cursor:pointer;color: #aaaaaa;position:absolute;top:10px;right:10px;font-size: 40px;font-weight:bold;">&times;</span>' +
                        opcSettings.popupHtml +
                        "</div></div>"),
                    $$("#opcPopup").length || $$("body").append(c),
                    $$("#opcPopup").show(),
                    !1
                );
        });
    }
    function Y(a) {
        for (var b = null, d, c = location.search.substr(1).split("&"), e = 0; e < c.length; e++) (d = c[e].split("=")), d[0] === a && (b = decodeURIComponent(d[1]));
        return b;
    }
    function M(a, b) {
        if (V("opc_v")) {
            var d = new Image();
            (b && "undefined" != b) || (b = "");
            if (4 == a) {
                var c = $$(".section--shipping-address").length ? "shipping" : "billing",
                    e = "";
                [
                    "checkout_email",
                    "checkout_email_or_phone",
                    "checkout_" + c + "_address_first_name",
                    "checkout_" + c + "_address_last_name",
                    "checkout_" + c + "_address_address1",
                    "checkout_" + c + "_address_city",
                    "checkout_" + c + "_address_zip",
                    "checkout_" + c + "_address_country",
                    "checkout_" + c + "_address_phone",
                ].forEach(function (k) {
                    "true" == $$("#" + k + ":visible").attr("aria-required") && $$("#" + k).val() && (e = e + "," + k);
                });
                0 < $$("#checkout_" + c + "_address_province:visible").length &&
                    0 < $$("#checkout_" + c + "_address_province option").length &&
                    $$("#checkout_" + c + "_address_province option:selected").attr("data-alternate-values") &&
                    (e = e + ",checkout_" + c + "_address_province");
                d.src = "https://www.magebird.com/shopify/trk.gif?u=" + V("opc_v") + "&sp=" + a + "&rand=" + Math.floor(10001 * Math.random()) + "&error=" + b + "&fields=" + e;
            } else d.src = "https://www.magebird.com/shopify/trk.gif?u=" + V("opc_v") + "&sp=" + a + "&rand=" + Math.floor(10001 * Math.random()) + "&error=" + b;
        } else {
            c = V("is_opc");
            W("opc_v", Math.random().toString(36).substring(4), 60);
            var f = window.location.hostname,
                n = window.innerWidth,
                g = navigator.userAgent;
            d = new Image();
            d.src = "https://www.magebird.com/shopify/trk.gif?sp=" + a + "&isOpc=" + c + "&u=" + V("opc_v") + "&store=" + f + "&scr_width=" + n + "&browser=" + g + "&rand=" + Math.floor(10001 * Math.random());
        }
    }
    function V(a) {
        a += "=";
        for (var b = document.cookie.split(";"), d = 0; d < b.length; d++) {
            for (var c = b[d]; " " == c.charAt(0); ) c = c.substring(1);
            if (-1 != c.indexOf(a)) return decodeURIComponent(c.substring(a.length, c.length));
        }
        return "";
    }
    function W(a, b, d) {
        var c = new Date();
        c.setTime(c.getTime() + 864e5 * d);
        document.cookie = a + "=" + b + "; expires=" + c.toUTCString() + "; path=/";
    }
    function ra() {
        $$(".section--contact-information h2").length
            ? q
                ? $$(".section--payment-method h2").text("3. " + $$(".section--payment-method h2").text())
                : $$(".section--payment-method h2").text("4. " + $$(".section--payment-method h2").text())
            : q
            ? $$(".section--payment-method h2").text("2. " + $$(".section--payment-method h2").text())
            : $$(".section--payment-method h2").text("3. " + $$(".section--payment-method h2").text());
    }
    function S() {
        return 1260 > $$(window).width() ? !0 : !1;
    }
    window.errorArrow = function (a) {
        a = void 0 === a ? !1 : a;
        $$("#errorArrow").animate({ marginLeft: "-=10px" }, 800).animate({ marginLeft: "+=10px" }, 800);
        setTimeout("window.errorArrow(" + a + ")", 1600);
    };
    window.opcSubmitForm = function (a) {
        a = $$(a);
        if (!E) {
            M(1);
            E = !0;
            T();
            a = a.closest("form").length ? a.closest("form") : $$("form[action='/cart/add']");
            var b = a.attr("action");
            $$.ajax({ type: "POST", url: b, data: a.serialize() })
                .done(function () {
                    opcLoadCart();
                    E = !1;
                })
                .fail(function (d) {
                    422 == d.status ? opcLoadCart() : O("cart trigger");
                    E = !1;
                });
        }
    };
    window.opcLoadCart = function (a) {
        a = void 0 === a ? !1 : a;
        var b = null;
        Y("discount") && " " != Y("discount")
            ? (b = Y("discount"))
            : $$(".cart-form input[name='discount']").val() && " " != $$(".cart-form input[name='discount']").val()
            ? (b = $$(".cart-form input[name='discount']").val())
            : $$("form input[name='discount']").val() && " " != $$("form input[name='discount']").val() && (b = $$("form input[name='discount']").val());
        if ((ua() || (-1 == navigator.userAgent.indexOf("Chrome") && -1 < navigator.userAgent.indexOf("Safari"))) && window.location.pathname != "/" + opcSettings.checkoutUrl)
            setTimeout(function () {
                U();
                window.location.href = b
                    ? "undefined" != typeof Shopify && Shopify.locale
                        ? "/" + opcSettings.checkoutUrl + "?discount=" + b + "&locale=" + Shopify.locale
                        : "/" + opcSettings.checkoutUrl + "?discount=" + b
                    : "undefined" != typeof Shopify && Shopify.locale
                    ? "/" + opcSettings.checkoutUrl + "?locale=" + Shopify.locale
                    : "/" + opcSettings.checkoutUrl;
            }, 100);
        else {
            T();
            var d = window.location.origin + "/checkout?step=contact_information";
            a && (d = a);
            b && (d = d + "&discount=" + b);
            window.Weglot && Weglot.getCurrentLang()
                ? (d = d + "&locale=" + Weglot.getCurrentLang())
                : "undefined" != typeof Shopify && Shopify.locale
                ? (d = d + "&locale=" + Shopify.locale)
                : Y("locale") && (d = d + "&locale=" + Y("locale"));
            M(2);
            $$.ajax({ type: "GET", url: d })
                .done(function (c, e, f) {
                    "" == c && 0 == y
                        ? (t++, f.getResponseHeader("content-location") && 1 == t && -1 == f.getResponseHeader("content-location").indexOf("cart") ? opcLoadCart(f.getResponseHeader("content-location")) : O("load cart empty data"))
                        : -1 != c.indexOf('http-equiv="refresh"')
                        ? (v++, 2 < v ? O("redirect refresh") : ((c = c.match(/http-equiv="refresh" content="0; url=(.*)">/)[1]), opcLoadCart(c)))
                        : 0 == y &&
                          ((y = !0),
                          (c = xa(c)),
                          document.write('<img id="opcPreLoader" style="position:fixed;z-index:9;top:70px;left:50%;margin-left:-100px;" src="https://cdn.shopify.com/s/files/1/0052/2377/6291/files/opc_loader.gif?16" />'),
                          (document.body.style.overflowY = "scroll"),
                          (c = c.replace("&quot;client_attributes_checkout&quot;;", "'client_attributes_checkout';")),
                          1 == c.split("</body>").length - 1 &&
                              1 == c.split("<body>").length - 1 &&
                              ((c = c.replace("<body>", "<body><div id='opcWrapper'>")), (c = c.replace("</body>", "</div></body>")), (c = c.replace("section--contact-information", "section--contact-information2"))),
                          document.write(c),
                          document.close(),
                          setTimeout(function () {
                              document.getElementById("opcPreLoader") && (document.getElementById("opcPreLoader").outerHTML = "");
                          }, 8e3),
                          wa(),
                          (document.title = "Secure checkout"),
                          I(),
                          ea(),
                          opcSettings.enablePopup && ya(),
                          da());
                })
                .fail(function () {
                    O("load cart fail");
                });
        }
    };
    window.opcAddToCart = function (a, b) {
        $$(a).prop("disabled", !0);
        M(50);
        $$.ajax({
            type: "POST",
            url: "/cart/add.js",
            data: { quantity: 1, id: b },
            dataType: "json",
            success: function () {
                window.location.href = "/" + opcSettings.checkoutUrl + "?upsell=1";
            },
            error: function (d) {
                try {
                    alert(JSON.parse(d.responseText).description);
                } catch (c) {
                    alert("Oops! Something went wrong. Please try to add your product again. If this message persists, the item may not be available.");
                }
            },
        });
    };
    window.submitFirstStep = function (a) {
        a
            ? M(32)
            : setTimeout(function () {
                  M(5);
              }, 500);
        var b = 0,
            d = !1,
            c = $$("form.edit_checkout").first();
        if ($$(".field--email_or_phone input[name='null']").length) {
            var e = "+" + $$(".flag-selector__select option:selected").text().split("+").pop().split(")")[0],
                f = "";
            $$(".field--email_or_phone input[name='null']").each(function () {
                e && -1 != $$(this).val().indexOf(e) && (f = $$(this).val());
            });
            f && $$('input[name="checkout[email_or_phone]"]').val(f);
        }
        $$("#checkout_email_or_phone").length && $$("#checkout_shipping_address_phone").not(":visible").length && $$("#checkout_shipping_address_phone").val($$("#checkout_email_or_phone").val());
        var n = c.attr("action");
        T();
        $$.ajax({ type: "POST", url: n, data: c.serialize() })
            .done(function (g) {
                function k() {
                    S();
                    $$(".edit_checkout[data-shipping-method-form]").find(".content-box__row--secondary:not(:first)").addClass("hidden");
                    $$("div[data-shipping-rate-additional-fields-container]").show();
                    $$(".section--billing-address").remove();
                    $$(".section--payment-method").remove();
                    $$(".step__footer").before(F);
                    ra();
                    M(6);
                    if (a)
                        !1 !== h
                            ? ($$(".section--shipping-method input[type=radio]").removeAttr("checked"),
                              $$(".edit_checkout[data-shipping-method-form]")
                                  .find("input[value='" + h + "']")
                                  .attr("checked", "checked")
                                  .trigger("click"))
                            : $$(".section--shipping-method input[type=radio]:checked").length &&
                              ((h = $$(".edit_checkout[data-shipping-method-form]").find("input[type=radio]:checked").val()), $$(".edit_checkout[data-shipping-method-form]").find("input[type=radio]:checked").trigger("click")),
                            Q();
                    else {
                        $$(".section--shipping-method input[type=radio]:checked").prop("checked", !1);
                        var r = !1;
                        $$("body").on("click", ".section--shipping-method input[type=radio]", function () {
                            r = !0;
                        });
                        opcSettings.boosters &&
                            1 == opcSettings.boosters.booster6 &&
                            1 == $$(".section--shipping-method .radio-wrapper").length &&
                            ($$(".edit_checkout[data-shipping-method-form]").find("input[type=radio]").trigger("click"), (h = $$(".edit_checkout[data-shipping-method-form]").find("input[type=radio]").val()), (r = !0));
                        setTimeout(function () {
                            r || $$(".section--shipping-method input[type=radio]:checked").prop("checked", !1);
                        }, 3e3);
                        setTimeout(function () {
                            r || $$(".section--shipping-method input[type=radio]:checked").prop("checked", !1);
                        }, 5e3);
                        (1 == opcSettings.design || 1260 > $$(window).width()) && $$("body,html").animate({ scrollTop: $$(".section--shipping-method").first().offset().top - 40 }, 400);
                    }
                    K();
                    I();
                    U();
                }
                t++;
                if ($$(".field--error", g).length) qa(g), U();
                else {
                    g = $$(".step .edit_checkout", g);
                    var l = null;
                    g.find(".section__header p").length && (l = g.find(".section__header p"));
                    g.find(".section__header").remove();
                    g.find(".step__footer").remove();
                    g.find(".step__sections .section").first().remove();
                    $$(".section--shipping-method .section__content").remove();
                    $$("#shipping").remove();
                    $$(".section--shipping-method").append("<div id='shipping'>" + g[0].outerHTML + "</div>");
                    $$(".section--shipping-method .section__header p").remove();
                    l && $$(".section--shipping-method .section__header").append(l[0].outerHTML);
                    g.find(".content-box__row--secondary").hide();
                    if (1 == $$("#shipping .section--shipping-method .blank-slate:not([data-poll-refresh])").length) clearInterval(u), (d = !0), U();
                    else if (0 == $$("#shipping .section--shipping-method input").length)
                        var w = 100,
                            u = setInterval(function () {
                                b++;
                                (0 < $$("#shipping .section--shipping-method input").length || $$("#shipping .section--shipping-method .blank-slate:not([data-poll-refresh])").length) && !d && (clearInterval(u), (d = !0), k());
                                1 < t && (w = 200);
                                b !== w || d || (clearInterval(u), (d = !0), 3 > t ? (console.log("new try"), M(31), submitFirstStep()) : O("shipping"));
                            }, 20);
                    else k();
                }
            })
            .fail(function () {
                t++;
                3 > t ? (M(33), submitFirstStep()) : O("fail submit first step");
            });
    };
    if (!V("is_opc") && -1 == document.location.href.indexOf("thank_you") && "undefined" != typeof opcSettings && opcSettings.enabled) {
        var Z = Math.floor(2 * Math.random()) ? 1 : 2;
        Z = 1;
        X() || (Z = 2);
        W("is_opc", Z, 60);
    }
    (function () {
        if (V("is_opc"))
            if (-1 < window.location.href.indexOf("checkout") && -1 < document.location.href.indexOf("thank_you")) M(10);
            else if ("function" == typeof $) {
                var a = !1;
                setInterval(function () {
                    a || (!$(".popup-cart:visible").length && !$(".cart-popup-content:visible").length) || ((a = !0), M(1));
                }, 300);
                2 != V("is_opc") ||
                    a ||
                    $.each(
                        ".opcAdd;.opcQuickAdd;form button[name='add'];.ProductForm__AddToCart; .cart_buy_button;form input[value='Checkout'];form input[name='checkout'];form input[name='checkout'] *;form button[name='checkout'];form button[name='checkout'] *;button:contains('Checkout');button:contains('checkout');button:contains('CHECKOUT')".split(
                            ";"
                        ),
                        function (b, d) {
                            $(document).on("click", d, function () {
                                a = !0;
                                M(1);
                            });
                        }
                    );
                -1 < window.location.href.indexOf("cart") && $("form[action='/cart']").length && M(1);
                "/cart" == window.location.pathname &&
                    (0 == $("form[action*='cart']").length || $(".cart-empty:visible").length || $(".cart--empty-message:visible").length || $(".cart--empty:visible").length) &&
                    2 == V("is_opc") &&
                    M(30, "load cart empty data no opc");
            }
    })();
    "undefined" != typeof opcSettings && 1 == V("is_opc") && opcSettings.enabled && X() && ba();
    "undefined" == typeof opcSettings ||
        -1 == window.location.pathname.indexOf(opcSettings.checkoutUrl) ||
        (X() && opcSettings.enabled) ||
        (Y("discount") && " " != Y("discount") ? (window.location.href = "/checkout?discount=" + Y("discount")) : (window.location.href = "/checkout"));
})();
