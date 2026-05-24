document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const chatMessages = document.getElementById('chat-messages');
    const messagesList = document.getElementById('messages-list');
    const welcomeScreen = document.getElementById('welcome-screen');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const modelSelect = document.getElementById('model-select');
    const themeToggle = document.getElementById('theme-toggle');
    const toggleDark = document.getElementById('toggle-dark');
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggle-sidebar');
    const openSidebarMobile = document.getElementById('open-sidebar-mobile');
    const newChatBtn = document.getElementById('new-chat-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const saveSettings = document.getElementById('save-settings');
    const voiceBtn = document.getElementById('voice-btn');
    const voiceWave = document.getElementById('voice-wave');
    const suggestionCards = document.querySelectorAll('.suggestion-card');
    const inputAura = document.getElementById('input-aura');

    let sessionId = Date.now().toString();
    let isFirstMessage = true;
    let isRecording = false;

    // --- Futuristic UI Handlers ---

    const updateTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark');
            toggleDark.checked = true;
        } else {
            document.body.classList.remove('dark');
            toggleDark.checked = false;
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    updateTheme(savedTheme === 'dark');

    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark');
        updateTheme(isDark);
    });

    toggleDark.addEventListener('change', (e) => {
        updateTheme(e.target.checked);
    });

    const closeSidebarBtn = document.getElementById('close-sidebar');

    // Sidebar toggle with futuristic animation
    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        localStorage.setItem('sidebarHidden', sidebar.classList.contains('-translate-x-full'));
    });

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            localStorage.setItem('sidebarHidden', 'true');
        });
    }

    if (localStorage.getItem('sidebarHidden') === 'false') {
        sidebar.classList.remove('-translate-x-full');
    }

    // Input Aura & Textarea Logic
    userInput.addEventListener('focus', () => {
        inputAura.style.opacity = '1';
    });

    userInput.addEventListener('blur', () => {
        if (!userInput.value.trim()) inputAura.style.opacity = '0';
    });

    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        const newHeight = Math.min(this.scrollHeight, 250);
        this.style.height = newHeight + 'px';
        
        const hasText = this.value.trim().length > 0;
        sendBtn.disabled = !hasText;
        
        if (hasText) {
            inputAura.style.opacity = '1';
            inputAura.style.background = 'rgba(66, 133, 244, 0.25)';
        } else {
            inputAura.style.background = 'rgba(66, 133, 244, 0.2)';
        }
    });

    // Voice Interaction Simulation
    voiceBtn.addEventListener('click', () => {
        isRecording = !isRecording;
        const icon = voiceBtn.querySelector('i');
        
        if (isRecording) {
            icon.classList.add('hidden');
            voiceWave.classList.remove('hidden');
            voiceWave.classList.add('flex');
            inputAura.style.background = 'rgba(234, 67, 53, 0.3)';
            inputAura.style.opacity = '1';
            userInput.placeholder = "Mendengarkan...";
        } else {
            icon.classList.remove('hidden');
            voiceWave.classList.add('hidden');
            voiceWave.classList.remove('flex');
            inputAura.style.background = 'rgba(66, 133, 244, 0.2)';
            userInput.placeholder = "Tanya apa saja...";
        }
    });

    // Suggestion Cards
    suggestionCards.forEach(card => {
        card.addEventListener('click', () => {
            const text = card.querySelector('p').textContent || card.querySelector('h3').textContent;
            userInput.value = text;
            userInput.dispatchEvent(new Event('input'));
            sendMessage();
        });
    });

    // New Chat
    newChatBtn.addEventListener('click', () => {
        messagesList.innerHTML = '';
        messagesList.classList.add('hidden');
        welcomeScreen.classList.remove('hidden');
        welcomeScreen.classList.add('animate-gradient-x');
        isFirstMessage = true;
        sessionId = Date.now().toString();
        userInput.value = '';
        userInput.style.height = 'auto';
        sendBtn.disabled = true;
        inputAura.style.opacity = '0';
    });

    // --- Advanced Chat Logic ---

    const createTypingIndicator = () => {
        const div = document.createElement('div');
        div.id = 'ai-typing';
        div.className = 'flex items-start gap-6 message-animate';
        div.innerHTML = `
            <div class="ai-icon-container w-10 h-10 rounded-2xl gemini-gradient flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                <i class="fas fa-sparkles text-white text-sm"></i>
            </div>
            <div class="flex-1 pt-4">
                <div class="typing-dots">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;
        return div;
    };

    const addMessage = (role, text) => {
        if (isFirstMessage) {
            welcomeScreen.classList.add('hidden');
            messagesList.classList.remove('hidden');
            isFirstMessage = false;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-start gap-6 message-animate group ${role === 'user' ? 'justify-end' : ''}`;

        if (role === 'ai') {
            messageDiv.innerHTML = `
                <div class="ai-icon-container w-10 h-10 rounded-2xl gemini-gradient flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                    <i class="fas fa-robot text-white text-sm"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="prose dark:prose-invert max-w-none text-gray-800 dark:text-gemini-text leading-relaxed">
                        ${marked.parse(text)}
                    </div>
                    <div class="flex items-center gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <button class="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors copy-btn" title="Salin">
                            <i class="far fa-copy text-xs"></i>
                        </button>
                        <button class="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors download-btn" title="Unduh Media">
                            <i class="fas fa-download text-xs"></i>
                        </button>
                        <button class="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors" title="Bagus">
                            <i class="far fa-thumbs-up text-xs"></i>
                        </button>
                        <button class="p-2.5 glass rounded-xl hover:bg-white/10 transition-colors" title="Bagikan">
                            <i class="fas fa-share-nodes text-xs"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="flex flex-col items-end max-w-[80%]">
                    <div class="glass px-6 py-4 rounded-[28px] text-gray-800 dark:text-white text-[15px] leading-relaxed break-words">
                        ${text}
                    </div>
                    <div class="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button class="p-2 text-gray-400 hover:text-blue-500 transition-colors edit-btn" title="Edit">
                            <i class="fas fa-pencil-alt text-[11px]"></i>
                        </button>
                        <button class="p-2 text-gray-400 hover:text-blue-500 transition-colors copy-btn-user" title="Salin">
                            <i class="far fa-copy text-[11px]"></i>
                        </button>
                    </div>
                </div>
                <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-xl">
                    <span class="text-xs font-bold text-white">U</span>
                </div>
            `;
        }

        messagesList.appendChild(messageDiv);

        // Events for buttons
        if (role === 'ai') {
            messageDiv.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
            
            const copyBtn = messageDiv.querySelector('.copy-btn');
            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(text);
                    copyBtn.innerHTML = '<i class="fas fa-check text-green-400 text-xs"></i>';
                    setTimeout(() => copyBtn.innerHTML = '<i class="far fa-copy text-xs"></i>', 2000);
                });
            }

            const downloadBtn = messageDiv.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.addEventListener('click', () => {
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Response.txt';
                    a.click();
                    window.URL.revokeObjectURL(url);
                });
            }
        } else {
            const editBtn = messageDiv.querySelector('.edit-btn');
            if (editBtn) {
                editBtn.addEventListener('click', () => {
                    userInput.value = text;
                    userInput.style.height = 'auto';
                    userInput.dispatchEvent(new Event('input'));
                    userInput.focus();
                });
            }

            const copyBtnUser = messageDiv.querySelector('.copy-btn-user');
            if (copyBtnUser) {
                copyBtnUser.addEventListener('click', () => {
                    navigator.clipboard.writeText(text);
                    copyBtnUser.innerHTML = '<i class="fas fa-check text-green-500 text-[11px]"></i>';
                    setTimeout(() => copyBtnUser.innerHTML = '<i class="far fa-copy text-[11px]"></i>', 2000);
                });
            }
        }

        // Smooth Scroll
        setTimeout(() => {
            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);
    };

    const sendMessage = async () => {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage('user', text);
        userInput.value = '';
        userInput.style.height = 'auto';
        sendBtn.disabled = true;
        
        const typingIndicator = createTypingIndicator();
        messagesList.appendChild(typingIndicator);
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    model: modelSelect.value,
                    sessionId: sessionId
                })
            });

            const data = await response.json();
            typingIndicator.remove();

            if (data.reply) {
                addMessage('ai', data.reply);
                updateHistory(text);
            } else {
                addMessage('ai', 'Maaf, sistem sedang mengalami beban tinggi. Silakan coba sesaat lagi.');
            }
        } catch (error) {
            typingIndicator.remove();
            addMessage('ai', 'Koneksi ke Neural Network terputus. Pastikan server tetap aktif.');
            console.error(error);
        }
    };

    const updateHistory = (text) => {
        const historyList = document.getElementById('chat-history-list');
        const item = document.createElement('div');
        item.className = 'flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-2xl cursor-pointer transition-all text-sm group';
        item.innerHTML = `
            <i class="far fa-message text-gray-500 group-hover:text-blue-400"></i>
            <span class="truncate flex-1 text-gray-400 group-hover:text-white">${text}</span>
            <i class="fas fa-ellipsis-v text-[10px] opacity-0 group-hover:opacity-40"></i>
        `;
        
        if (historyList.firstChild) {
            historyList.insertBefore(item, historyList.firstChild);
        } else {
            historyList.appendChild(item);
        }
    };

    // Events
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Close Settings
    saveSettings.addEventListener('click', () => settingsModal.classList.add('hidden'));
    closeSettings.addEventListener('click', () => settingsModal.classList.add('hidden'));
    settingsBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));

    // Mobile Sidebar
    openSidebarMobile.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && !sidebar.contains(e.target) && !openSidebarMobile.contains(e.target)) {
            sidebar.classList.add('-translate-x-full');
        }
    });
});
