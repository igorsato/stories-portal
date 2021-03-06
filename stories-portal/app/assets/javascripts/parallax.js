/********************************************
 * REVOLUTION 5.0 EXTENSION - PARALLAX
 * @version: 1.0.1 (17.08.2015)
 * @requires jquery.themepunch.revolution.js
 * @author ThemePunch
 *********************************************/
! function() {
    var e = jQuery.fn.revolution,
        a = e.is_mobile();
    jQuery.extend(!0, e, {
        checkForParallax: function(t, o) {
            var r = o.parallax;
            return a && "on" == r.disable_onmobile ? !1 : (o.li.each(function() {
                for (var e = jQuery(this), a = 1; 10 >= a; a++) e.find(".rs-parallaxlevel-" + a).each(function() {
                    var e = jQuery(this),
                        t = e.closest(".tp-parallax-wrap");
                    t.data("parallaxlevel", r.levels[a - 1]), t.addClass("tp-parallax-container")
                })
            }), ("mouse" == r.type || "scroll+mouse" == r.type || "mouse+scroll" == r.type) && (t.mouseenter(function(e) {
                var a = t.find(".active-revslide"),
                    o = t.offset().top,
                    r = t.offset().left,
                    l = e.pageX - r,
                    n = e.pageY - o;
                a.data("enterx", l), a.data("entery", n)
            }), t.on("mousemove.hoverdir, mouseleave.hoverdir", function(e) {
                var a = t.find(".active-revslide");
                switch (e.type) {
                    case "mousemove":
                        if ("enterpoint" == r.origo) {
                            var l = t.offset().top,
                                n = t.offset().left;
                            void 0 == a.data("enterx") && a.data("enterx", e.pageX - n), void 0 == a.data("entery") && a.data("entery", e.pageY - l);
                            var i = a.data("enterx"),
                                s = a.data("entery"),
                                c = i - (e.pageX - n),
                                p = s - (e.pageY - l),
                                u = r.speed / 1e3 || .4
                        } else var l = t.offset().top,
                            n = t.offset().left,
                            c = o.conw / 2 - (e.pageX - n),
                            p = o.conh / 2 - (e.pageY - l),
                            u = r.speed / 1e3 || 3;
                        a.find(".tp-parallax-container").each(function() {
                            var e = jQuery(this),
                                a = parseInt(e.data("parallaxlevel"), 0) / 100,
                                t = c * a,
                                o = p * a;
                            "scroll+mouse" == r.type || "mouse+scroll" == r.type ? punchgs.TweenLite.to(e, u, {
                                force3D: "auto",
                                x: t,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            }) : punchgs.TweenLite.to(e, u, {
                                force3D: "auto",
                                x: t,
                                y: o,
                                ease: punchgs.Power3.easeOut,
                                overwrite: "all"
                            })
                        });
                        break;
                    case "mouseleave":
                        a.find(".tp-parallax-container").each(function() {
                            var e = jQuery(this);
                            "scroll+mouse" == r.type || "mouse+scroll" == r.type ? punchgs.TweenLite.to(e, 1.5, {
                                force3D: "auto",
                                x: 0,
                                ease: punchgs.Power3.easeOut
                            }) : punchgs.TweenLite.to(e, 1.5, {
                                force3D: "auto",
                                x: 0,
                                y: 0,
                                ease: punchgs.Power3.easeOut
                            })
                        })
                }
            }), a && (window.ondeviceorientation = function(e) {
                var a = Math.round(e.beta || 0),
                    o = Math.round(e.gamma || 0),
                    r = t.find(".active-revslide");
                if (jQuery(window).width() > jQuery(window).height()) {
                    var l = o;
                    o = a, a = l
                }
                var n = 360 / t.width() * o,
                    i = 180 / t.height() * a;
                r.find(".tp-parallax-container").each(function() {
                    var e = jQuery(this),
                        a = parseInt(e.data("parallaxlevel"), 0) / 100,
                        t = n * a,
                        o = i * a;
                    punchgs.TweenLite.to(e, .2, {
                        force3D: "auto",
                        x: t,
                        y: o,
                        ease: punchgs.Power3.easeOut
                    })
                })
            })), void e.scrollTicker(o, t))
        },
        scrollTicker: function(a, t) {
            1 != a.scrollTicker && (a.scrollTicker = !0, punchgs.TweenLite.ticker.fps(150), punchgs.TweenLite.ticker.addEventListener("tick", function() {
                e.scrollHandling(a)
            }, t, !0, 1))
        },
        scrollHandling: function(t) {
            t.lastwindowheight = t.lastwindowheight || jQuery(window).height();
            var o = t.c.offset().top,
                r = jQuery(window).scrollTop(),
                l = new Object,
                n = t.viewPort,
                i = t.parallax;
            if (t.lastscrolltop == r) return !1;
            t.lastscrolltop = r, l.top = o - r, l.h = 0 == t.conh ? t.c.height() : t.conh, l.bottom = o - r + l.h;
            var s = l.top < 0 ? l.top / l.h : l.bottom > t.lastwindowheight ? (l.bottom - t.lastwindowheight) / l.h : 0;
            t.scrollproc = s, e.callBackHandling && e.callBackHandling(t, "parallax", "start");
            var c = 1 - Math.abs(s);
            if (c = 0 > c ? 0 : c, n.enable && (1 - n.visible_area <= c ? t.inviewport || (t.inviewport = !0, e.enterInViewPort(t)) : t.inviewport && (t.inviewport = !1, e.leaveViewPort(t))), a && "on" == t.parallax.disable_onmobile) return !1;
            var p = new punchgs.TimelineLite;
            p.pause(), ("scroll" == i.type || "scroll+mouse" == i.type || "mouse+scroll" == i.type) && t.c.find(".tp-parallax-container").each(function() {
                var e = jQuery(this),
                    a = parseInt(e.data("parallaxlevel"), 0) / 100,
                    o = s * -(a * t.conh);
                e.data("parallaxoffset", o), p.add(punchgs.TweenLite.set(e, {
                    force3D: "auto",
                    y: o
                }), 0)
            }), t.c.find(".tp-revslider-slidesli .slotholder, .tp-revslider-slidesli .rs-background-video-layer").each(function() {
                var e = jQuery(this),
                    a = e.data("bgparallax") || t.parallax.bgparallax;
                if (a = "on" == a ? 1 : a, void 0 !== a || "off" !== a) {
                    var o = t.parallax.levels[parseInt(a, 0) - 1] / 100,
                        r = s * -(o * t.conh);
                    jQuery.isNumeric(r) && p.add(punchgs.TweenLite.set(e, {
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        backfaceVisibility: "hidden",
                        force3D: "true",
                        y: r + "px",
                        overwrite: "auto"
                    }), 0)
                }
            }), e.callBackHandling && e.callBackHandling(t, "parallax", "end"), p.play(0)
        }
    })
}(jQuery);