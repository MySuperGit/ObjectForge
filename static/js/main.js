// 侧栏折叠/展开
document.addEventListener('DOMContentLoaded', () => {
const btn = document.getElementById('btnToggleSidebar');
const sidebar = document.getElementById('sidebar');
if (btn && sidebar){
btn.addEventListener('click', () => {
sidebar.classList.toggle('is-collapsed');
btn.textContent = sidebar.classList.contains('is-collapsed') ? '⟩⟩' : '⟨⟨';
});
}


// 对比滑块
const range = document.getElementById('compareRange');
const topLayer = document.getElementById('compareTop');
if (range && topLayer){
range.addEventListener('input', (e) => {
const v = Number(e.target.value);
topLayer.style.width = v + '%';
});
}


// 标签切换
const tabs = document.querySelectorAll('.of-tab');
if (tabs.length){
tabs.forEach(tab => {
tab.addEventListener('click', () => {
// nav状态
document.querySelectorAll('.of-tab').forEach(t => t.classList.remove('is-active'));
tab.classList.add('is-active');
// 面板状态
const id = tab.getAttribute('data-tab');
document.querySelectorAll('.of-tabs__panel').forEach(p => p.classList.remove('is-active'));
const panel = document.getElementById(id);
if (panel){ panel.classList.add('is-active'); }
});
});
}
});