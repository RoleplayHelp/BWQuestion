const serverLink = 'https://discord.gg/6ZyU2xHs'; // Thay bằng link thật

const tree = {
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
    text: '🧩 Bạn có cảm thấy thoải mái khi phân tích tình huống chiến đấu logic thay vì tung xúc xắc để quyết định?',
    yes: 'q4',
    no: 'end_reject_2'
  },
  q3b: {
    text: '📘 Bạn có sẵn sàng học cách sử dụng chỉ số để xử lý tình huống RP không? Admin luôn sẵn sàng hỗ trợ từ ví dụ đến hướng dẫn chi tiết.',
    yes: 'q4',
    no: 'end_reject_3'
  },
  q4: {
    text: '🛠️ Hệ thống kỹ năng sẽ do bạn tự xây dựng theo trí tưởng tượng của mình trong khuôn khổ admin cho phép. Admin sẽ gợi ý và giúp bạn hoàn thiện nếu cần.',
    yes: 'q5',
    no: 'end_reject_4'
  },
  q5: {
    text: '📜 Câu chuyện của server có khởi đầu, kết thúc và nhiều nhánh tùy lựa chọn. Bạn có sẵn sàng đồng hành không?',
    answers: {
      yes: () => endWithLink('🎉 Cảm ơn bạn đã sẵn sàng đồng hành!'),
      maybe: () => endWithLink('✨ Không sao cả, vào thử xem vibe có hợp không nha!'),
      no: 'end_reject_5'
    }
  }
};

const messages = {
  end_reject_1: '❌ Có vẻ server thiên về chỉ số và logic không hợp với bạn. Cảm ơn vì đã ghé qua!',
  end_reject_2: '🤔 Nếu không thích phân tích logic, có thể bạn sẽ không enjoy server này lắm. Cảm ơn bạn.',
  end_reject_3: '📚 Không sao cả! Nếu sau này bạn muốn học thử hệ thống chỉ số, cứ ghé lại nhé.',
  end_reject_4: '⚠️ Server thiên về sáng tạo kỹ năng cá nhân, nên nếu không hợp thì rất tiếc nha.',
  end_reject_5: '💬 Có vẻ bạn không muốn theo cốt truyện dài hạn. Tụi mình vẫn luôn chào đón nếu bạn đổi ý!'
};

function endWithLink(msg) {
  document.getElementById('question').innerHTML = msg;
  document.getElementById('answers').innerHTML = `<a href="${serverLink}" target="_blank"><button><i class='fas fa-scroll'></i> Tham gia Server</button></a>`;
}

function render(id) {
  const container = document.querySelector('.container');
  container.classList.remove('visible');

  setTimeout(() => {
    const node = tree[id];
    if (!node) return;

    document.getElementById('question').innerText = node.text;
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';

    if (node.answers) {
      const btns = [
        { label: '✅ Có', next: node.answers.yes },
        { label: '🤔 Chưa chắc', next: node.answers.maybe },
        { label: '🚫 Không', next: node.answers.no }
      ];
      btns.forEach(({ label, next }) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.onclick = () => {
          if (typeof next === 'function') next();
          else end(next);
        };
        answersDiv.appendChild(btn);
      });
    } else {
      const yesBtn = document.createElement('button');
      yesBtn.innerHTML = '<i class="fas fa-check"></i> Yes';
      yesBtn.onclick = () => render(node.yes);
      const noBtn = document.createElement('button');
      noBtn.innerHTML = '<i class="fas fa-times"></i> No';
      noBtn.onclick = () => {
        const next = node.no;
        if (typeof next === 'string' && next.startsWith('end')) end(next);
        else render(next);
      };
      answersDiv.appendChild(yesBtn);
      answersDiv.appendChild(noBtn);
    }

    container.classList.add('visible');
  }, 300);
}

function end(code) {
  document.getElementById('question').innerText = '';
  document.getElementById('answers').innerHTML = '';
  document.getElementById('end').innerText = messages[code] || 'Cảm ơn bạn đã tham gia.';
}

// Intro animation
window.onload = () => {
  setTimeout(() => {
    document.getElementById('introScreen').style.display = 'none';
    const main = document.getElementById('mainContent');
    main.classList.remove('hidden');
    main.classList.add('visible');
    render('q1');
  }, 3000);
};
