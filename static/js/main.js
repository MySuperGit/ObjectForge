// 1) Header 显隐（Claude 风格）：滚过 hero 哨兵后，上滚显示、下滚隐藏
(() => {
const header = document.getElementById('siteHeader');
const sentinel = document.getElementById('headerSentinel');
if (!header || !sentinel) return;
let lastY = window.scrollY, showed = false;
const toggle = (wantShow) => {
if (wantShow === showed) return;
showed = wantShow;
header.classList.toggle('header--show', showed);
header.classList.toggle('header--hidden', !showed);
};
const io = new IntersectionObserver(entries => {
const past = !entries[0].isIntersecting; // 是否滚过触发点
const down = window.scrollY > lastY; lastY = window.scrollY;
if (!past) { toggle(false); return; }
toggle(!down); // 过线：上滚显示、下滚隐藏
}, {root:null, threshold:0});
io.observe(sentinel);
})();


// 2) 对比滑块（没有就静默退出）
(() => {
const range = document.getElementById('compareRange');
const topLayer = document.getElementById('compareTop');
if (!range || !topLayer) return;
range.addEventListener('input', (e) => topLayer.style.width = Number(e.target.value) + '%');
})();


// 3) Tabs 切换（模板/灵感/图形库）
(() => {
const tabs = document.querySelectorAll('.of-tab');
const panels = document.querySelectorAll('.of-tabs__panel');
if (!tabs.length || !panels.length) return;
tabs.forEach(t => t.addEventListener('click', () => {
tabs.forEach(x => x.classList.remove('is-active'));
t.classList.add('is-active');
panels.forEach(p => p.classList.remove('is-active'));
const panel = document.getElementById(t.dataset.tab);
if (panel) panel.classList.add('is-active');
}));
})();


// 4) CSS 成功后移除 no-css（弱网兜底）
window.addEventListener('load', () => document.body.classList.remove('no-css'));