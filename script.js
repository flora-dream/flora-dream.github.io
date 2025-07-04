// 家庭教育语录数据（来自爱的思辨.txt）
const quotes = [
    "我们教育孩子的思想既应该积极的向世界学习，也应该积极地向这片土地的先哲学习，这两者，一个是发展、一个是内核。当然，任何方法论都不能离开当下的社会实际。",
    "一个从健康家庭中成长起来的孩子，学校要毁掉他没那么容易，而一个被不健康家庭造就出来的孩子，学校要帮助他，非常困难。",
    "不管我们多么爱孩子，都应该在心里和孩子之间保持一个‘观察距离‘！有了这个‘观察距离‘，你才不至于被这份爱‘困住‘，才能客观的看待孩子所经受的一切，才能度过自己心里这道坎。",
    "家长越是想赢过孩子，越是会输掉孩子。",
    "受委屈的孩子充满敌意，被感动的孩子充满智慧。",
    "对孩子来说，规则虽然是一种约束，但更是一种保护。清晰的规则会让孩子体会到踏实和自在。",
    "关于陪伴孩子，家长用10%的心，陪伴10小时，不如用100%的心，陪伴1小时。这就是为什么有的家长既能带好孩子，又能经营好自己。",
    "父母不好好过日子，是对孩子最不好的影响。"
];

// 陪伴小贴士
const tips = [
    "今天试着放下手机，专心陪伴孩子15分钟，感受彼此的温暖。",
    "孩子的成长不需要完美的父母，需要的是真实而温暖的陪伴。",
    "当孩子犯错时，先深呼吸，然后用温和的语气引导他们。",
    "每天睡前，和孩子分享今天最开心的一件事。",
    "孩子的情绪是他们内心的声音，试着倾听而不是立即纠正。",
    "给孩子选择的权利，即使是很小的事情，也能培养他们的自主性。",
    "用拥抱代替说教，有时候爱的表达比道理更有力量。",
    "和孩子一起做他们喜欢的事，走进他们的世界。",
    "当自己情绪不好时，诚实地告诉孩子，并展示如何处理负面情绪。",
    "记录孩子成长的美好瞬间，这些珍贵的回忆是最好的礼物。"
];

// 当前显示的语录索引
let currentQuoteIndex = 0;
let currentTipIndex = 0;

// DOM 元素
const elements = {
    currentDate: document.getElementById('currentDate'),
    dayCount: document.getElementById('dayCount'),
    dailyQuote: document.getElementById('dailyQuote'),
    dailyTip: document.getElementById('dailyTip'),
    newQuoteBtn: document.getElementById('newQuoteBtn'),
    shareBtn: document.getElementById('shareBtn'),
    shareModal: document.getElementById('shareModal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
    sharePreview: document.getElementById('sharePreview'),
    copyBtn: document.getElementById('copyBtn'),
    saveImageBtn: document.getElementById('saveImageBtn')
};

// 初始化应用
function initApp() {
    updateDate();
    updateDayCount();
    loadDailyContent();
    bindEvents();
    
    // 添加加载动画效果
    setTimeout(() => {
        document.querySelector('.quote-card').classList.remove('loading');
        document.querySelector('.tips-card').classList.remove('loading');
    }, 800);
}

// 更新日期显示
function updateDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    const dateString = now.toLocaleDateString('zh-CN', options);
    elements.currentDate.textContent = dateString;
}

// 更新天数计数（基于某个起始日期）
function updateDayCount() {
    const startDate = new Date('2024-01-01'); // 可以自定义起始日期
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    elements.dayCount.textContent = diffDays;
}

// 加载当日内容
function loadDailyContent() {
    // 基于日期生成固定的随机索引，确保同一天总是显示相同内容
    const today = new Date();
    const dateString = today.toDateString();
    const dateHash = hashCode(dateString);
    
    currentQuoteIndex = Math.abs(dateHash) % quotes.length;
    currentTipIndex = Math.abs(dateHash * 2) % tips.length;
    
    updateQuoteDisplay();
    updateTipDisplay();
}

// 简单的字符串哈希函数
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为32位整数
    }
    return hash;
}

// 更新语录显示
function updateQuoteDisplay() {
    const quoteElement = elements.dailyQuote;
    
    // 添加淡出效果
    quoteElement.classList.add('loading');
    
    setTimeout(() => {
        quoteElement.textContent = quotes[currentQuoteIndex];
        quoteElement.classList.remove('loading');
    }, 300);
}

// 更新小贴士显示
function updateTipDisplay() {
    const tipElement = elements.dailyTip;
    
    // 添加淡出效果
    tipElement.classList.add('loading');
    
    setTimeout(() => {
        tipElement.textContent = tips[currentTipIndex];
        tipElement.classList.remove('loading');
    }, 300);
}

// 获取新语录
function getNewQuote() {
    // 随机选择一个不同的语录
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === currentQuoteIndex && quotes.length > 1);
    
    currentQuoteIndex = newIndex;
    
    // 同时更新小贴士
    currentTipIndex = Math.floor(Math.random() * tips.length);
    
    updateQuoteDisplay();
    updateTipDisplay();
    
    // 添加按钮点击反馈
    elements.newQuoteBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elements.newQuoteBtn.style.transform = '';
    }, 150);
}

// 显示分享模态框
function showShareModal() {
    updateSharePreview();
    elements.shareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 添加按钮点击反馈
    elements.shareBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        elements.shareBtn.style.transform = '';
    }, 150);
}

// 隐藏分享模态框
function hideShareModal() {
    elements.shareModal.classList.remove('active');
    document.body.style.overflow = '';
}

// 更新分享预览
function updateSharePreview() {
    const currentQuote = quotes[currentQuoteIndex];
    const today = new Date();
    const dateString = today.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    elements.sharePreview.innerHTML = `
        <div style="margin-bottom: 15px;">
            <span style="font-size: 20px;">🌱</span>
            <span style="font-weight: 600; margin-left: 8px;">每日疗愈</span>
        </div>
        <div style="font-size: 14px; opacity: 0.8; margin-bottom: 15px;">${dateString}</div>
        <div style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">"${currentQuote}"</div>
        <div style="font-size: 12px; opacity: 0.7;">— 家庭教育智慧 · 用爱陪伴，用心成长</div>
    `;
}

// 复制文本到剪贴板
async function copyToClipboard() {
    const currentQuote = quotes[currentQuoteIndex];
    const today = new Date();
    const dateString = today.toLocaleDateString('zh-CN');
    
    const textToCopy = `${dateString} 每日疗愈

"${currentQuote}"

— 家庭教育智慧 · 用爱陪伴，用心成长`;

    try {
        await navigator.clipboard.writeText(textToCopy);
        showToast('已复制到剪贴板 📋');
    } catch (err) {
        // 备用方案
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('已复制到剪贴板 📋');
    }
}

// 保存为图片（简化版，实际使用可以考虑html2canvas等库）
function saveAsImage() {
    showToast('图片保存功能开发中... 📸');
}

// 显示提示信息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 10000;
        animation: toast-in 0.3s ease;
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toast-in {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes toast-out {
            from { opacity: 1; transform: translateX(-50%) translateY(0); }
            to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        toast.style.animation = 'toast-out 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// 绑定事件监听器
function bindEvents() {
    // 换一句按钮
    elements.newQuoteBtn.addEventListener('click', getNewQuote);
    
    // 分享按钮
    elements.shareBtn.addEventListener('click', showShareModal);
    
    // 关闭模态框
    elements.modalClose.addEventListener('click', hideShareModal);
    elements.modalOverlay.addEventListener('click', hideShareModal);
    
    // 复制按钮
    elements.copyBtn.addEventListener('click', copyToClipboard);
    
    // 保存图片按钮
    elements.saveImageBtn.addEventListener('click', saveAsImage);
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.shareModal.classList.contains('active')) {
            hideShareModal();
        }
    });
    
    // 防止模态框内容区域点击时关闭
    document.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // 添加长按换一句功能
    let pressTimer;
    elements.newQuoteBtn.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
            // 长按效果：连续换几句
            for (let i = 0; i < 3; i++) {
                setTimeout(() => getNewQuote(), i * 500);
            }
        }, 800);
    });
    
    elements.newQuoteBtn.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
    });
    
    elements.newQuoteBtn.addEventListener('touchcancel', () => {
        clearTimeout(pressTimer);
    });
}

// 添加一些有趣的交互效果
function addInteractiveEffects() {
    // 双击语录卡片收藏（模拟）
    elements.dailyQuote.parentElement.addEventListener('dblclick', () => {
        showToast('已收藏此语录 💖');
        
        // 添加心形动画
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.cssText = `
            position: absolute;
            font-size: 24px;
            pointer-events: none;
            animation: heart-float 2s ease-out forwards;
            z-index: 1000;
        `;
        
        const rect = elements.dailyQuote.getBoundingClientRect();
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        
        document.body.appendChild(heart);
        
        // 添加心形动画样式
        const heartStyle = document.createElement('style');
        heartStyle.textContent = `
            @keyframes heart-float {
                0% { transform: translateY(0) scale(1); opacity: 1; }
                100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
            }
        `;
        document.head.appendChild(heartStyle);
        
        setTimeout(() => {
            document.body.removeChild(heart);
            document.head.removeChild(heartStyle);
        }, 2000);
    });
    
    // 摇一摇换语录（如果支持设备motion事件）
    if (window.DeviceMotionEvent) {
        let lastTime = 0;
        let shakeThreshold = 15;
        
        window.addEventListener('devicemotion', (e) => {
            const now = Date.now();
            if (now - lastTime > 1000) { // 限制频率
                const acceleration = e.accelerationIncludingGravity;
                if (acceleration) {
                    const totalAcceleration = Math.abs(acceleration.x) + 
                                            Math.abs(acceleration.y) + 
                                            Math.abs(acceleration.z);
                    
                    if (totalAcceleration > shakeThreshold) {
                        getNewQuote();
                        showToast('摇一摇换语录 🎲');
                        lastTime = now;
                    }
                }
            }
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    addInteractiveEffects();
    
    // 添加一些延迟的动画效果
    setTimeout(() => {
        document.querySelector('.container').style.opacity = '1';
    }, 100);
});

// 页面可见性变化时更新内容
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        updateDate();
        updateDayCount();
    }
});

// 导出一些函数供外部使用（如果需要）
window.HealingApp = {
    getNewQuote,
    showShareModal,
    quotes,
    tips
}; 