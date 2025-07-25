const serverLink = 'https://discord.gg/my-link-here';

// 🎯 Entry point
window.onload = () => {
  setTimeout(() => {
    document.getElementById('introScreen').style.display = 'none';
    const main = document.getElementById('mainContent');
    main.classList.remove('hidden');
    main.classList.add('visible');
    renderQuestion('q1');
  }, 3000);
};

// 🌲 Tree structure
const questionTree = {
  q1: {
    text: '🧠 Bạn có biết đây là một server dark fantasy – combat sử dụng chỉ số và không sử dụng may rủi không?',
    buttons: [
      { label: '✅ Hehe, tui biết chứ!', next: 'q2a' },
      { label: '❌ Ủa, vậy hả?', next: 'q2b' }
    ]
  },
  q2a: {
    text: '⚔️ Bạn đã từng roleplay combat chỉ số bao giờ chưa?',
    buttons: [
      { label: '✅ Đã có kinh nghiệm.', next: 'q3a' },
      { label: '❌ Chưa thử bao giờ luôn.', next: 'q3b' }
    ]
  },
  q2b: {
    text: '📐 Server sử dụng chỉ số và logic thực tế (~70%) để combat, không dùng may rủi. Bạn thấy ổn với điều này chứ?',
    buttons: [
      { label: '✅ Ổn nhé', next: 'q2a' },
      { label: '❌ Không hợp lắm', next: 'end_reject_1' }
    ]
  },
  q3a: {
    text: '🧩 Trong chiến đấu, bạn sẽ phân tích logic các tình huống để role, admin luôn sẵn sàng hỗ trợ bạn chỉ cần bạn hỏi. Điều này có khiến bạn muốn trải nghiệm server của tụi mình không?',
    buttons: [
      { label: '✅ Có hứng thú!', next: 'q4' },
      { label: '❌ Không đâu', next: 'end_reject_2' }
    ]
  },
  q3b: {
    text: '📘 Bạn có sẵn sàng học cách sử dụng chỉ số để xử lý tình huống RP không? Admin luôn sẵn sàng hỗ trợ từ ví dụ đến hướng dẫn chi tiết.',
    buttons: [
      { label: '✅ Rất sẵn sàng', next: 'q4' },
      { label: '❌ Không muốn lắm', next: 'end_reject_3' }
    ]
  },
  q4: {
    text: '🛠️ Ở Blasphemous War, kỹ năng của nhân vật sẽ được xây dựng theo trí tưởng tượng của bạn miễn là nằm trong khuôn khổ và luật admin đã đề ra. Admin rất sẵn sàng hỗ trợ bạn trong việc xây dựng kỹ năng nếu bạn nhờ. Bạn có thấy ổn với điều này không?',
    buttons: [
      { label: '✅ Rất ổn luôn', next: 'q5' },
      { label: '❌ Không hợp với mình', next: 'end_reject_4' }
    ]
  },
  q5: {
    text: '📜 Cốt truyện của server sẽ dài, có khởi đầu, kết thúc và nhiều nhánh tùy lựa chọn. Bạn có sẵn sàng đồng hành không?',
    buttons: [
      { label: '✅ Có chứ!', next: () => endWithLink('🎉 Cảm ơn bạn đã sẵn sàng đồng hành!') },
      { label: '🤔 Cũng muốn thử', next: () => endWithLink('✨ Không sao cả, vào thử xem vibe có hợp không nha!') },
      { label: '❌ Không đâu', next: 'end_reject_5' }
    ]
  }
};

// 💬 Kết thúc các nhánh
const messages = {
  end_reject_1: '❌ Có vẻ server thiên về chỉ số và logic không hợp với bạn. Cảm ơn vì đã ghé qua!',
  end_reject_2: '🤔 Nếu không thích phân tích logic, có thể bạn sẽ không enjoy server này lắm. Cảm ơn bạn.',
  end_reject_3: '📚 Không sao cả! Nếu sau này bạn muốn học thử hệ thống chỉ số, cứ ghé lại nhé.',
  end_reject_4: '⚠️ Server thiên về sáng tạo kỹ năng cá nhân, nên nếu không hợp thì rất tiếc nha.',
  end_reject_5: '💬 Có vẻ bạn không muốn theo cốt truyện dài hạn. Tụi mình vẫn luôn chào đón nếu bạn đổi ý!'
};

// 🔧 Hiển thị câu hỏi với nút và hiệu ứng mượt
function renderQuestion(id) {
  const node = questionTree[id];
  if (!node) return;

  fadeOut(() => {
    const question = document.getElementById('question');
    const answers = document.getElementById('answers');
    const endDiv = document.getElementById('end');

    question.innerText = node.text;
    answers.innerHTML = '';
    endDiv.innerText = '';

    node.buttons.forEach(({ label, next }) => {
      const btn = createButton(label, () => {
        if (typeof next === 'function') next();
        else handleNext(next);
      });
      answers.appendChild(btn);
    });

    fadeIn();
  });
}

// 🎯 Xử lý điều hướng giữa các bước hoặc kết thúc
function handleNext(key) {
  if (typeof key === 'string' && key.startsWith('end')) {
    showEndMessage(key);
  } else {
    renderQuestion(key);
  }
}

// 📦 Tạo nút
function createButton(label, onClick) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.onclick = onClick;
  return btn;
}

// 📜 Kết thúc có link mời
function endWithLink(message) {
  fadeOut(() => {
    const question = document.getElementById('question');
    const answers = document.getElementById('answers');

    question.innerHTML = message;
    answers.innerHTML = `<a href="https://discord.gg/sAE9gFSXbK" target="_blank">
      <button><i class='fas fa-scroll'></i> Tham gia Server</button>
    </a>`;
    fadeIn();
  });
}

// ❌ Kết thúc không đạt yêu cầu
function showEndMessage(code) {
  fadeOut(() => {
    document.getElementById('question').innerText = '';
    document.getElementById('answers').innerHTML = '';
    document.getElementById('end').innerText = messages[code] || 'Cảm ơn bạn đã tham gia.';
    fadeIn();
  });
}

// 🎬 Hiệu ứng chuyển fade
function fadeOut(callback) {
  const container = document.querySelector('.container');
  container.classList.remove('visible');
  setTimeout(callback, 400);
}

function fadeIn() {
  const container = document.querySelector('.container');
  container.classList.add('visible');
}
