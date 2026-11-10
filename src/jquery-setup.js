// react-owl-carousel reads jQuery from window, so it must be set before the carousel is imported.
import $ from "jquery";

window.$ = window.jQuery = $;
