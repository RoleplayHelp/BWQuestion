const serverLink = 'https://discord.gg/my-link-here';

const questionTree = {
  q1: {
    text: '🧠 Bạn có biết đây là một server dark fantasy – combat sử dụng chỉ số và không sử dụng may rủi không?',
    yes: 'q2a',
    no: 'q2b'
  },
  q2a: {
    text: '⚔️ Bạn đã từng roleplay combat chỉ số bao giờ chưa?',
    yes: 'q3a',
    no: 'q3b'
  },
  q2b: {
    text: '📐 Server sử dụng chỉ số và logic thực tế (~70%) để combat, không dùng may rủi. Bạn thấy ổn với điều này chứ?',
    yes: 'q2a',
    no: 'end_reject_1'
  },
  q3a: {
    text: '🧩 Trong chiến đấu, bạn sẽ phân tích logic các tình huống để role, admin luôn sẵn sàng hỗ trợ bạn chỉ cần bạn hỏi. Điều này có khiến bạn muốn trải nghiệm server của tụi mình không?',
    yes: 'q4',
    no: 'end_reject_2'
  },
  q3b: {
    text: '📘 Bạn có sẵn sàng học cách sử dụng chỉ số để xử lý tình huống RP không? Admin luôn sẵn sàng hỗ trợ từ ví dụ đến hướng dẫn chi tiết.',
    yes: 'q4',
    no: 'end_reject_3'
  },
  q4: {
    text: '🛠️ Ở Blasphemous War, kỹ năng của nhân vật sẽ được xây dựng theo trí tưởng tượng của bạn miễn là nằm trong khuôn khổ và luật admin đã đề ra. Admin rất sẵn sàng hỗ trợ bạn trong việc xây dựng kỹ năng nếu bạn nhờ. Bạn có thấy ổn với điều này không?',
    yes: 'q5',
    no: 'end_reject_4'
  },
  q5: {
    text: '📜 Cốt truyện của server sẽ dài, có khởi đầu, kết thúc và nhiều nhánh tùy lựa chọn. Bạn có sẵn sàng đồng hành không?',
    answers: {
      yes: () => endWithLink('🎉 Cảm ơn bạn đã sẵn sàng đồng hành!'),
      maybe: () => endWithLink('✨ Không sao cả, vào thử xem vibe có hợp không nha!'),
      no: 'end_reject_5'
    }
  }
};

const rejectionMessages = {
  end_reject_1: '❌ Có vẻ server thiên về chỉ số và logic không hợp với bạn. Cảm ơn vì đã ghé qua!',
  end_reject_2: '🤔 Nếu không thích phân tích logic, có thể bạn sẽ không enjoy server này lắm. Cảm ơn bạn.',
  end_reject_3: '📚 Không sao cả! Nếu sau này bạn muốn học thử hệ thống chỉ số, cứ ghé lại nhé.',
  end_reject_4: '⚠️ Server thiên về sáng tạo kỹ năng cá nhân, nên nếu không hợp thì rất tiếc nha.',
  end_reject_5: '💬 Có vẻ bạn không muốn theo cốt truyện dài. Tụi mình vẫn luôn chào đón nếu bạn đổi ý!'
};

function setFadeEffectBefore(callback) {
  const container = document.querySelector('.container');
  container.classList.remove('visible');

  setTimeout(callback, 400); // Delay để hoàn tất fade-out
}

function render(questionId) {
  setFadeEffectBefore(() => {
    const node = questionTree[questionId];
    if (!node) return;

    const question = document.getElementById('question');
    const answersDiv = document.getElementById('answers');
    const endDiv = document.getElementById('end');

    question.innerText = node.text;
    answersDiv.innerHTML = '';
    endDiv.innerText = '';

    if (node.answers) {
      renderMultiAnswers(node.answers);
    } else {
      renderBinaryAnswers(node.yes, node.no);
    }

    document.querySelector('.container').classList.add('visible');
  });
}

function renderBinaryAnswers(yesTarget, noTarget) {
  const answersDiv = document.getElementById('answers');

  const yesBtn = createButton('<i class="fas fa-check"></i> Yes', () => handleNext(yesTarget));
  const noBtn = createButton('<i class="fas fa-times"></i> No', () => handleNext(noTarget));

  answersDiv.appendChild(yesBtn);
  answersDiv.appendChild(noBtn);
}

function renderMultiAnswers(options) {
  const answersDiv = document.getElementById('answers');

  const yesBtn = createButton('✅ Có', () => handleNext(options.yes));
  const maybeBtn = createButton('🤔 Chưa chắc', () => handleNext(options.maybe));
  const noBtn = createButton('🚫 Không', () => handleNext(options.no));

  answersDiv.appendChild(yesBtn);
  answersDiv.appendChild(maybeBtn);
  answersDiv.appendChild(noBtn);
}

function createButton(label, onClick) {
  const btn = document.createElement('button');
  btn.innerHTML = label;
  btn.onclick = onClick;
  return btn;
}

function handleNext(target) {
  if (typeof target === 'function') {
    target();
  } else if (typeof target === 'string' && target.startsWith('end')) {
    showEndMessage(target);
  } else {
    render(target);
  }
}

function endWithLink(message) {
  setFadeEffectBefore(() => {
    const question = document.getElementById('question');
    const answers = document.getElementById('answers');
    const endDiv = document.getElementById('end');

    question.innerHTML = message;
    answers.innerHTML = `<a href="${serverLink}" target="_blank"><button><i class='fas fa-scroll'></i> Tham gia Server</button></a>`;
    endDiv.innerText = '';
    document.querySelector('.container').classList.add('visible');
  });
}

function showEndMessage(code) {
  setFadeEffectBefore(() => {
    document.getElementById('question').innerText = '';
    document.getElementById('answers').innerHTML = '';
    document.getElementById('end').innerText = rejectionMessages[code] || 'Cảm ơn bạn đã tham gia.';
    document.querySelector('.container').classList.add('visible');
  });
}

window.onload = () => {
  setTimeout(() => {
    document.getElementById('introScreen').style.display = 'none';
    const main = document.getElementById('mainContent');
    main.classList.remove('hidden');
    main.classList.add('visible');
    render('q1');
  }, 3000);
};
